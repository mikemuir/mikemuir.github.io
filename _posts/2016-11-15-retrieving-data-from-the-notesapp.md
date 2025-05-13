---
title: Retrieving data from the Notes.app
date: Tue, 15 Nov 2016 21:24:51 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple notes
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

Recently dealt with an issue where a user had notes stored in Notes.app, but randomly lost them all!  The problem came up that they were stored 'On My Mac' and not synchronizing with a service at all.  As it turns out the data was there, but Apple Notes was not seeing the data behind the scenes.  All the data behind the scenes is stored in a .sqlite database, which does not make it easy to view the data, but there is a fix to retrieve it.

- Navigate to the working directory of the Notes: `~/Library/Containers/com.apple.Notes.`
- Once there, navigate further into `…/Data/Library/Notes`, and notice the `NotesVx.storedata` file.  That is everything Notes.
- Grab a copy just in case, then open a terminal window.  Navigate to the .storedata file with the `cd` command, then run the following: `sqlite3`
- You will have a new command prompt `sqlite>`
- Type `.open NotesV6.storedata` (nothing will happen)
- At the next prompt, type `select ZHTMLSTRING from ZNOTEBODY;` then hit return
- Copy and paste the resulting text into a text editor, then save it as a `.html` file.
- Open said file in your web browser of choice, which will have the text all nicely formatted to have the notes re-created.