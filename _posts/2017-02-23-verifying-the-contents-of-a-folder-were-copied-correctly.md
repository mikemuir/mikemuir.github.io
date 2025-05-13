---
title: Verifying the contents of a folder were copied correctly
date: Thu, 23 Feb 2017 18:37:25 +0000
author: Mike Muir
categories: Tech
layout: post
tags: md5 hash
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

One of the commands built into OS X is md5, a way to create a simple 'fingerprint' of the contents of the file.  The idea is you can verify whether a copy of a file is the same, by making sure the two md5 'fingerprints' are the same.  Execution of the command is simple:

```
md5 [filepath]
```

...which will then output the resulting fingerprint, or hash.

However, how do you do this for verifying an entire folder?  Use the following, which takes each file inside a directory, creates a hash for each, then re-hashes all of them together again to get a final fingerprint, which you can verify on the copy.

```
find DIRECTORY -type f -exec md5 {} + | awk '{print $1}' | sort | md5
```

Im still somewhat of a newbie when it comes to these sorts of things, but if others have recommendations when it comes to this sort of thing, by all means let me know.