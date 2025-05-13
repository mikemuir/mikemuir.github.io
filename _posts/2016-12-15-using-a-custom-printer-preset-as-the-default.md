---
title: Using a Custom Printer Preset as the Default
date: Thu, 15 Dec 2016 22:26:37 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple printers CUPS
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

Ran across a customer who was asking about wanting to use a custom printer preset as the default preset.  Normally, OS X doesn't have any setting that you can use to do so, but I ran across a little trick that I still can't find any official documentation on, and yet seems to work.

Start printing a document, edit your settings and save it as a preset if you haven't already (I recommend for all printers, but its your call).

While keeping the dialog box open, hold the Option key and select your Preset, then print.

By holding the Option key, it should adjust your settings to use your preset as the default for future jobs.

It seems to play well with my system, but I dont have any real guarantee that this works consistently.  The alternative would be to enable the CUPS interface (navigate to http://localhost:631/printers/ and follow the instructions) to change settings that way, but most end users probably dont want to go down that rabbit hole...