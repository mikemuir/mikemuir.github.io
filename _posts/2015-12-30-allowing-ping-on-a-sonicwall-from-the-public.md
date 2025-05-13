---
title: Allowing Ping on a Sonicwall From the Public
date: Wed, 30 Dec 2015 17:42:28 +0000
author: Mike Muir
categories: Tech
layout: post
tags: networking ping sonicwall
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

In case you are using an uptime monitor such as uptimerobot.com, you may want to monitor your primary firewall, in our case a Sonicwall.  However, its a good practice to not allow the whole of the internet to be able to ping your box.

As such, we are able to edit firewall rules to only allow ping connections from specific IP addresses:

- Determine the public IP addresses your uptime monitor uses.
- Login to your Sonicwall to create all of the necessary WAN address objects, then create a Address Object Group from the define objects.
- Navigate to Network>Interfaces, then edit the X1 Interface and enable the Ping checkbox.  This creates a firewall rule for WAN>WAN:

  - Source Port: Any
  - Service: Ping
  - Source: Any
  - Destination: All X1 Management IP

- You will want to edit 'Source' to the Address Object Group you previously created, save, and you're done.