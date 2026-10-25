---
title: "Installing MDM Profiles Remotely"
pubDatetime: 2014-08-04T17:39:25Z
description: "More tech stuff. Say you are managing tens or hundreds of OS X computers, and have a new MDM server in place, but don't want to have to go to each machine…"
tags: ["tech", "apple", "mdm", "profiles"]
archived: true
---
More tech stuff.

Say you are managing tens or hundreds of OS X computers, and have a new MDM server in place, but don't want to have to go to each machine and install the enrollment profiles by hand.

Sure, you could email the enrollment profile to each user, but they would still need admin rights to install it, not forgetting how you will convince them to install it in the first place...

Luckily, Apple created a binary called profiles that can take care of it all via command line:

```
profiles -I -F [.mobileconfig filepath]
```

It makes it even easier to remotely install profiles with Apple Remote Desktop, as you can copy the necessary .mobileconfig profiles to each machine in a standard place (like /Users/Shared), then install the trust profile (if needed), then the enrollment profile without issue.

If you need to uninstall all profiles from a system, you can use the -D command to delete all config profiles on a system, but it will ask an 'are you sure?' question, so if you are doing it remotely via ARD, make sure to echo the answer beforehand:

```
echo "yes" | profiles -D
```
