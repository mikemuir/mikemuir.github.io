---
title: Creating DNS records in OS X Server for top level domains
date: Fri, 11 Sep 2015 15:21:51 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple osxserver dns
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

It is not very common to see this, but if in a rare circumstance you are hosting a zone file in house for your DNS, but it is sharing the same domain as your website, you or your employees might be stuck not being able to access your website.  Unfortunately, OS X Server does not have a way in the GUI to create a top level DNS record (sometimes seen as an @ record).  However, this can still be done via commandline...

```
cd /Library/Server/named

sudo nano db.domain.com
```

Add your A record for your [domain.com]:

```
domain.com. 10800 IN A target_IP_Address
```

Once done, restart DNS in Server.app, clear your DNS cache and you should be good to go...