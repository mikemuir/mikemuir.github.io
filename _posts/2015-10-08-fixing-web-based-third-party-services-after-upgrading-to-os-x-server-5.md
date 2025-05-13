---
title: Fixing web based third party services after upgrading to OS X Server 5
date: Thu, 08 Oct 2015 17:24:16 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple osxserver 
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

For the most part, Server 5 has been a pleasant upgrade, but there was one rather major change that caused some headaches, especially when third-party web services are hosted on it, such as WebHelpDesk, JAMF Casper Suite, anything tomcat, etc...

Previously, all web services hosted by OS X Server were being leveraged by an Apache backend.  As such, you normally had to disable apache altogether with the following command:

```
sudo apachectl stop
```

Unfortunately, this no longer works.  After much researching online I stumbled across this article from krypted.com: http://krypted.com/mac-security/troubleshooting-apache-proxies-and-tomcat-in-os-x-server-5/

Essentially, apache in OS X Server 5 is now acting as a proxy, so all web traffic goes through it first, not just HTTP(s) but other popular web ports as well: 80, 443, 8008, 8800, 8443, and 8843. As such, the trick is to tell Apache to not listen on the ports you need.

Simply edit the following file with your text editor of choice (vi, nano, etc):

```
/Library/Server/Web/Config/Proxy/apache_serverproxy.conf
```

Navigate down about 10 lines to where you see the various 'listen [port]' lines.  Comment out those lines by adding a # in front of them.  For example, if you want to pass 8443 on to your Casper JSS, edit 'listen 8443' to show '#listen 8443'.  Once done, save the edit, restart the server and you should be good to go!