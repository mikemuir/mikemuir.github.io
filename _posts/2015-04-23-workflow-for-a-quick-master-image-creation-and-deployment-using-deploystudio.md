---
title: Workflow for a quick master image creation and deployment using DeployStudio
date: Thu, 23 Apr 2015 19:17:08 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple deploystudio
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

DeployStudio has become far and beyond one of the most indispensable tools in my tech arsenal for multiple Macintosh deployments.  It makes it incredibly easy to take a master image you've created for your office or a customer, and deploy it out to multiple systems over your network all while automating Computer Names, extra package installations, partitioning, Boot Camp, and many others...

However, there was one hiccup that made the whole process a little slower with the advent of OS X 10.7 Lion: hdiutil.  When Lion was released, Apple changed how hdiutil works behind the scenes (as far as I know) which drastically increased how long it takes when going through DeployStudio image creation.  I've given the image creation task about two hours for something as small as 20GB.  If you are attempting a deployment in one day, two hours can easily ruin your plans.  For some reason though, there are no slowdowns by using Disk Utility and saving the .dmg locally...

In the past, I usually just accepted it and figured out how to work around the slowdown, but we recently found a nice workaround using the free and open source Create-Recovery-Partition-Installer, available on GitHub at https://github.com/MagerValp/Create-Recovery-Partition-Installer.  By using this tool with the same copy of your OS X Installer, you can quickly make a small .pkg installer that will automatically create the Recovery Partition on the system you are working on.

This way, by using Disk Utility to create the .dmg locally and Create-Recovery-Partition-Installer, we can take the resulting .dmg and .pkg, move them to the DeployStudio Repository, and create a quick workflow in close to half the time it takes to use DeployStudio to do the same thing.

Here is final workflow I use in order:

- Hostname Form- Preemptively enter in the computer name to be imaged immediately on start of the workflow.
- Partition- Re-partition the first available physical hard drive (dont leave ext. HD's plugged in).
- Restore- Restore the master image .dmg to the previous partition.
- Configure- Apply the computer name and other info that was entered in during 'Hostname Form'.
- (optional) Open/Active Directory Binding- pretty straight forward, it will bind itself to the directory of your choice.
- (optional) Automatic Enrollment- Enroll the computer in your MDM Server of choice.
- Package Install- Use the .pkg created with Create-Recovery-Partiton-Installer, postponed to be installed on first boot.
- Generic Script- Specific for us at CRTG that runs a .sh script to enroll the client system into our monitoring Service we use through Watchman Monitoring.