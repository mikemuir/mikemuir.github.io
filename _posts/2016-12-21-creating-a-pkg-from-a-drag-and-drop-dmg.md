---
title: Creating a PKG from a drag-and-drop DMG
date: Wed, 21 Dec 2016 20:13:37 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple terminal packages
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

Quick Terminal command for those one off applications that need to be deployed via a .pkg installer:

```
sudo pkgbuild --install-location [Destination_Path] --component [Actual_Application_Path] [Save_Location].pkg
```

For example, if you have EazyDraw 8 currently installed in your /Applications folder:

```
sudo pkgbuild --install-location /Applications/ --component /Applications/EazyDraw\ 8.app/ ~/Desktop/EasyDraw8.pkg
```