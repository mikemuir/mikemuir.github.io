---
title: "Creating a PKG from a drag-and-drop DMG"
date: "2016-12-21T20:13:37+00:00"
category: "Tech"
tags: ["apple", "terminal", "packages"]
---
Quick Terminal command for those one off applications that need to be deployed via a .pkg installer:

```
sudo pkgbuild --install-location [Destination_Path] --component [Actual_Application_Path] [Save_Location].pkg
```

For example, if you have EazyDraw 8 currently installed in your /Applications folder:

```
sudo pkgbuild --install-location /Applications/ --component /Applications/EazyDraw\ 8.app/ ~/Desktop/EasyDraw8.pkg
```
