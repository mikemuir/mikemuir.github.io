---
title: Watchman Monitoring
date: Tue, 13 May 2014 16:15:21 +0000
author: Mike Muir
categories: Tech
layout: post
tags: watchmanmonitoring
---
*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

So anyone who supports Apple or Unix computers REALLY needs to look at using Watchman Monitoring.  Its just a tiny client that runs in the background and periodically phones home to report on the status of *many* services: CrashPlan, Time Machine, HD Failure, RAID status, etc, as well as server services such as OS X Server, Kerio Connect, Daylite Server and more.

Its such a great service, and designed from the ground up for the Apple platform.  Last time I checked, we have it installed on close to 300 systems, and it is rock solid.  Everytime we've done a server/master image deployment, we have been able to easily install the agent behind the scenes using a simple ARD Unix command and it automatically phones home.

Seriously, its really helped us be proactive.  People need to check it out.

Oh yeah, and Allen Hancock made it really generous in its pricing.  Totally worth it.