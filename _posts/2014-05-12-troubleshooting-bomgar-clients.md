---
title: Troubleshooting Bomgar clients
date: Mon, 12 May 2014 18:40:02 +0000
author: Mike Muir
categories: Tech
layout: post
---
*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

We use a Bomgar Appliance for remote access for our contract customers.  Its a very nice piece of hardware, supplying some nice security for remote access and management that you dont get in many other systems.  Its expensive, but pretty damn nice in my opinion.

You can enable logging on the OS X client agents by doing the following:

1. Open a new plain text file and add the following:

```
[blog/debug]
output = /tmp/$COMPANY-$APP_NAME.log
category.All=All
flush_interval=0
file_size_limit=75M
file_size_limit_retain=5F
enabled=1
```

2. Save the file as blog.ini.
3. Copy the blog.ini file to the Bomgar agent package located at `/Users/Shared/bomgar-scc-[installdate]-[jumpclientid].app/Contents/Resources/`
4. Restart the client with the following:

```
sudo launchctl unload com.bomgar.bomgar-ps-xxxxxxxxxx-xxxxxxxxxx; sudo launchctl load <full path>/com.bomgar.bomgar-ps-xxxxxxxxxx-xxxxxxxxxx.plist
```

5. Retrieve the log files by grabbing the .log file located in `/tmp`.
6. Delete blog.ini.