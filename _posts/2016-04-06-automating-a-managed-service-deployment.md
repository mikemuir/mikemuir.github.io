---
title: Automating a Managed Service Deployment
date: Wed, 06 Apr 2016 16:46:13 +0000
author: Mike Muir
categories: Tech
layout: post
tags: deployment apple watchmanmonitoring
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

Beware: long winded tech post coming up...

Working for a company that deals in managed services makes life interesting when a new customer comes calling.  Naturally, we want to do the best we can for whoever asks us for help, but that usually involves juggling multiple specialized services that all focus on specific tasks.  Services such as Watchman Monitoring, Gruntwork from Mac-MSP(now part of MAX Remote Management), and MDM management from any number of companies have become indispensable, and we want to get them on every computer we can.  The problem comes from how to get all of those individualized services onto a 'new' computer that has come under our purview.

For a new computer, we normally want to add (at a minimum) the following to every computer we manage:

- A local 'CR Administrator' admin account
- Access via Remote Management and SSH
- Watchman Monitoring
- Gruntwork

Optional pieces include:

- Bomgar (for secure Remote Access)
- MDM management of choice: Right now we are starting to use FileWave.

We've seen if we try to install all of this on a single computer, it can take ~5-10 minutes per computer.  Then add time for making sure you have all the correct installers.  Then add time to juggle kicking the user off the computer for that time.  Then add time to make sure all the installers properly installed.  Then multiply for all computers you need to touch....it adds up.  All the more reason to automate this process.

We ended up going the route of using both shell scripting and then remote installation after the fact w/ FileWave.  So, we scripted the installation of the cradmin account, ARD and SSH access, and the installation of the FileWave client.  Afterwards, FileWave automatically installs the Watchman Monitoring agent, the Gruntwork agent, and the Bomgar agent after we move the respective computer into their assigned Client Group in FileWave.

**Pre-Work:  Create a public web server for hosting flat files for download**

We needed a central repository to download all of these various installers, and ended up deciding on Amazon Web Services' S3 service.  It is able to store all of our necessary packages and dmg's needed for install (on the cheap), so we store everything there.

**Part 1: Creating the necessary 'CR Administrator' local admin account**

Easily done by using CreateUserPkg, an application that will generate a pkg installer for creation of any local user account you specify.   We specify admin rights, our company's logo, and a UID less than 500, to keep it hidden from the login window for most of our customers.

**Part 2: Scripting installation of cradmin, access to ARD and SSH, and FileWave installation**

Once the cradmin installer is generated and uploaded to your public web server, do the same for the FileWave installer.  Afterwards, we wrote a script that downloads the cradmin installer to a hidden directory, installed, then removed.  Once installed, some commands are run to give cradmin Apple Remote Management and SSH access.  Finally, the FileWave installer (which has been customized for our specific settings) is taken care of the same way as cradmin: download the FileWave installer to a hidden directory, installed, and the remove it.

{% highlight bash %}
#!/bin/bash
# Deploy cradmin, ARD and SSH access for cradmin, and the FileWave client.

# CRADMIN
###Install CR Administrator account
# Part 1: Download cradmin installer from AWS instance to /tmp.
/usr/bin/curl [CRADMIN URL TO DOWNLOAD FROM] > /tmp/create_cradmin_kala-1.1.pkg
# Part 2: Install then remove package
/usr/sbin/installer -target / -pkg /tmp/create_cradmin_kala-1.1.pkg
/bin/rm /tmp/create_cradmin_kala-1.1.pkg

###Enable ARD and SSH for CRADMIN user
#Enable ARD for Specific Users
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -configure -allowAccessFor -specifiedUsers
#Enable ARD Agent for CRADMIN
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -on -users cradmin -privs -all -restart -agent -menu
#Enable SSH
systemsetup -setremotelogin on
#Create SSH Group
dseditgroup -o create -q com.apple.access_ssh
#Add CRADMIN to SSH Group
dseditgroup -o edit -a cradmin -t user com.apple.access_ssh

###Install FileWave Custom Installer
# Part 1: Download FW installer from AWS instance to /tmp.
/usr/bin/curl [FILEWAVE URL TO DOWNLOAD FROM] > /tmp/FileWaveClient10.1.1_fw.crtg.io.pkg
# Part 2: Install then remove package.
/usr/sbin/installer -target / -pkg /tmp/FileWaveClient10.1.1_fw.crtg.io.pkg
/bin/rm /tmp/FileWaveClient10.1.1_fw.crtg.io.pkg
{% endhighlight %}

**Part 3: Use FileWave to install Watchman Monitoring, Gruntwork and Bomgar**

Now that we have the custom FileWave client installed, its already been enrolled into our system, so we can have it do the rest of the work for us.  In FileWave, we created a Client Group for all of the computers we are enrolling, so we can mass deploy instead of individually.  We also created Fileset of all the necessary installers, in this case, the individual pkgs uploaded to the FileWave server for install, customized for our clients preferences/name.

Once the FileSet is complete, we then associate the Client Group to the Fileset.  This way, when the client checks in to the FileWave server, they will see they have applications that need install, download the 3 installers, and install them, all without needing the extra hands on massaging.

Sure, we could script absolutely everything into a single installer to get it all taken care of, but we split it up this way for a few reasons:

- Ease of quick installation.  The initial installation of cradmin/ARD/SSH/FileWave is done by building the shell script into a single pkg installer that anyone can trigger if they have the existing admin rights.  This way, we don't even need to be hands on with the computer!  We could just email the installer or a download link to a new customer, and they can install it themselves.  All thats needed on our part is to move the client into the respective Client Group in FileWave after the fact.
- Make sure that there aren't any hiccups w/ the FileWave Client not being able to talk to our FileWave server.  If we notice that the client hasn't enrolled in the server after a few minutes, we know there is probably some networking issue we need to tackle.
- Im not a master at writing scripts, so using FileWave makes it easy, especially when juggling multiple hundreds of computers.  Time is a luxury :)

Naturally, we've tweaked this to make it work for us, but I would love to hear of different processes that others might have put to use (if anyone reads this :D )