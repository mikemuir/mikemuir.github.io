---
title: "Resetting OS X/macOS Network Settings..."
date: "2016-11-22T18:35:17+00:00"
category: "Tech"
tags: ["apple", "networking"]
---
Ever get stuck with a system where all the various network interfaces don't seem to work or act right?  Wifi just doesn't seem to find any networks, or Ethernet is acting like its a Bluetooth module?  Your system's network settings are probably corrupt, but its an easy fix.

- Navigate to /Library/Preferences/SystemConfiguration/ and remove the preferences.plist file.
- Reboot and you should be good to go.
