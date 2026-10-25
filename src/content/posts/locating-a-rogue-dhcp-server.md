---
title: "Locating a Rogue DHCP Server"
pubDatetime: 2017-04-20T00:34:47Z
description: "One of the more difficult situations I've been a part of the past few years is trying to figure out why a computer on a network starts randomly using a…"
tags: ["tech", "networking", "dhcp", "wireshark"]
archived: true
---
One of the more difficult situations I've been a part of the past few years is trying to figure out why a computer on a network starts randomly using a different set of network settings than what you know they are supposed to have. This usually results in the computer not being able to connect to other devices or access the internet itself.

In rare circumstances, the issue may be due to a rogue DHCP Server on your network. Remember that DHCP is the protocol used to automatically configure a device so it can talk to other devices that fall under the same network settings. At a simplified level, when a computer connects to a network (and doesn't already have network settings configured) it will 'yell' out on the network asking who can give it the network settings needed. A DHCP Server on said network will reply back with the required settings, at which point the computer should be able to properly connect.

However, what happens when a network has multiple DHCP Servers? How does the computer determine which network settings to use if multiple DHCP Servers respond? Simple: it will use the settings from the first one to respond. There is no easy way to tell computers to only trust certain DHCP Servers, without breaking the whole point of DHCP in the first place.

I have not had good luck at finding a tried and true quick fix, but the following steps have been rather successful for me. It uses Wireshark to look at raw network traffic, which can be REALLY daunting to look at, and I personally am VERY much a noob when it comes to Wireshark, but it is quite powerful.

1. Before anything else, install Wireshark on your computer from <https://www.wireshark.org>.
2. Connect whichever network interface is needed to the offending network (Ethernet, Wifi, etc).
3. Once connected, open Wireshark, locate the interface you are using, then double click it to start a new 'live capture session'. This will trigger Wireshark to start listening to ALL traffic on the network and will display each packet it can get its hands on.

![Wireshark Interface](@/assets/img/wireshark_interface.png)

4. Leave Wireshark running and renew the DHCP Lease on your computer.
5. Once the release has completed and you have a new (or same) IP address, go back to Wireshark and stop the capture.

![Wireshark Interface](@/assets/img/wireshark2.png)

6. Leave the capture open and type in 'bootp' in the Display Filter field, then hit Return. This will automatically filter the entire capture for packets related to DHCP.
7. What you now see is each packet the capture found that is related to DHCP listed in the top field. Highlighting a packet will show you the details of the packet in the middle field, and the raw packet data in the bottom field.

![Wireshark Interface](@/assets/img/wireshark3.png)

8. You need to look for a packet with a source of 0.0.0.0, a destination of 255.255.255.255, and a Info field showing 'DHCP Request'. This packet should be your computer yelling out to the network asking for network settings. You can confirm it is your computer by comparing your network interface MAC address with what is listed in the packet details.
9. Now that you have found your DHCP Request, look for packets afterwards that are 'DHCP ACK' packets. These are packets from the DHCP Servers ACKnowledging your request and replying with the actual network settings. If you feel like it, you can peruse the details of the packet in the middle field to see what the packet contains.
10. If you have a rogue DHCP Server on your network, you should be seeing MULTIPLE 'DHCP ACK' responses to your computer coming from different Sources. One of these sources is your rogue which you will need to track down.

Now that you know the IP address of your rogue DHCP Server, the only other issue is physically locating the computer which might be tougher in your environment, which is not NEARLY as easy. If you have access to the switching hardware or a network administrator, you can use the ARP Table(s) on your switches to locate the specific ethernet port a MAC address is sitting on, and trace back the ethernet cable to the offender. Talk to your network admin about accessing those.
