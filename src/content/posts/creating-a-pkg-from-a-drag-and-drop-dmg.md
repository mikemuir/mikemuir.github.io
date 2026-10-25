---
title: "Creating a PKG from a drag-and-drop DMG"
pubDatetime: 2016-12-21T20:13:37Z
description: "Quick Terminal command for those one off applications that need to be deployed via a .pkg installer: For example, if you have EazyDraw 8 currently…"
tags: ["tech", "apple", "terminal", "packages"]
archived: true
---
Quick Terminal command for those one off applications that need to be deployed via a .pkg installer:

```
sudo pkgbuild --install-location [Destination_Path] --component [Actual_Application_Path] [Save_Location].pkg
```

For example, if you have EazyDraw 8 currently installed in your /Applications folder:

```
sudo pkgbuild --install-location /Applications/ --component /Applications/EazyDraw\ 8.app/ ~/Desktop/EasyDraw8.pkg
```
