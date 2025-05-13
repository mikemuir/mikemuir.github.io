---
title: Testing Large Scale Storage
date: Wed, 02 Aug 2017 19:21:03 +0000
author: Mike Muir
categories: Tech
layout: post
tags: storage filesystems
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

I've recently had the pleasure of testing a few large scale storage systems and my co-worker and I needed to come up with a number of tests to determine their overall performance when it comes to Macs.  These tests I've used in the past give a very good overall idea of any platform you are testing:

(Hint) Use a high performing system with an SSD in order to avoid local performance bottlenecks.

**#1 Test Read/Write Speed to the Volume**

Determine the various file share protocols the platform can host, then attempt read/write tests across each protocol.  Protocols may include:

- AFP
- SMB
- SMB with Packet Signing Disabled (Packet Signing is great for security, but does degrade SMB performance.  See this Apple Support Article: https://support.apple.com/en-us/HT205926)
- CIFS
- NFS

I use the BlackMagic Disk Speed Test available from the Mac App Store: https://itunes.apple.com/us/app/blackmagic-disk-speed-test/id425264550?mt=12

...then document the results for each protocol in turn.

**#2 RSYNC Speed Tests.**

We use this test in order to determine the real world performance of transferring data, between individual LARGE files or thousands of SMALL files, as write performance degrades when having to transfer many small files.

- First, from your test system, create a folder, 'cd' to said folder, then generate 10,000 1MB files via the command:

```
for i in {1..10000}; do dd if=/dev/urandom bs=10000 count=100 of=file$i; done
```

- Secondly, create a separate folder, 'cd' to said folder, then create one large 10Gb file via:

```
mkfile -n 10g /Folder_Path/10gFile
```

- Once these files are created, use RSYNC to transfer the data once for the small files, and once for the large file to the destination:

```
rsync -a --progress --stats --human-readable [source] [dest]
```

Once transferred, document the results of the RSYNC to get real world speeds.  You can try this off of the various protocols as well if need be.

**#3 Finder Display Performance**

What most people don't know is that before you actually see items in a folder, the Mac filesystem first iterates every item in it so it knows WHAT to display, as well as HOW.  Finder will seem like its is unresponsive when trying to iterate those items, and you can test the Platform to see how fast Finder can access it to iterate all of the items.

- Simply get a timer on your phone, navigate to the parent folder of the Folder that has the thousands of small files.
- Change your Finder view to Icon view.
- When ready, open the thousands of files folder while simultaneously starting the timer.
- Eyeball when Finder actually displays the items, and stop the timer.  Record the time it took.
- Repeat the process for the List view, as well as the Column View, as the views will respond differently.

**#4 Trailing Whitespace Management**

One of the biggest pain in my ass is the difference between OS X/macOS and Windows in how they deal with spaces at the end of filenames.  A lot of times, file transfer protocols deal with unique characters differently, which can really cause problems depending on which OS access the file.

- Create a new text file with a whitespace at the end in windows on the file share (SMB) called "Testfilewithwhitespace .txt", then mount the share via AFP on the Mac, and rename the file to "Testfilewithwhitespace ".  A lot of times you will see that Windows completely renames the file to garbled text due to an old feature called Name Mangling.  http://www.oreilly.com/openbook/samba/book/ch05_04.html.
- You will want to test yourself to see now the platform filesystem deals with trailing whitespaces to learn how it will handle them.

**#5 Hidden Files**

OS X/macOS can hide files if they are named with a . at the beginning of the filename, eg ".HiddenFile.txt". You will want to determine how the Platform Filesystem tracks these files.

**#6 Authentication Support**

Larger organizations are most likely using a Directory system of some type, either Active Directory, Open Directory, OpenLDAP or others.  You will want to determine whether the platform you are testing supports your Directory of choice.

**#7 Permissioning Tests**

Once you know the support of Directory Authentication, look and see how the Platform deals with permissioning.  Check whether it supports POSIX and/or ACL's as well as HOW to adjust them.  Test your file share protocols to make sure that permissions are properly followed by the test system.

**#8 Microsoft Office Files**

Office is notorious for file saving errors related to creating lock files when files are edited directly on the share.  Officially, Microsoft says to copy the file locally, edit it, then copy it back to the file share when done, but you can test this by looking for the ~... temporary lock file that gets created when in the middle of being edited.  Once done editing, the lock file is removed, but there can be errors where the lock file stays after the fact.  Look on your platform to determine how best to remove those files after the fact.  Separately, look for whether the /.TemporaryItems folder gets created at the root of the share.  See this MS forum thread for more info https://social.technet.microsoft.com/Forums/en-US/f0ab739a-a649-45df-b14c-13aacf5b9192/issues-saving-office-2016-for-mac-files-to-a-shared-volume?forum=Office2016forMac.

**#9 Test Your Own Business Workflows**

Where I work, Adobe files are prevalent, so it behooves us to test various Adobe related workflows like the time it takes to transfer hundreds of JPEG's, or the time it takes to open multi-gig banner .PSB files directly from the share.

You will know what custom business workflows you might run into, and it would help to test those.

**#10 Ultimately, record your own Thoughts and Opinions**

Sure, we are dealing with lots of hard data, but it does also help to record your own opinions of the system, so others can get info.  How does this compare to previous platforms you've already tested?  How do you feel when working with its admin console?  Are you comfortable with it, or do you feel like there will be a steep learning curve when it comes to its administration?  ...etc.

Hopefully these bulletpoints help if/when you ever need them...