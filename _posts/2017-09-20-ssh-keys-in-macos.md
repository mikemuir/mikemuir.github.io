---
title: SSH Keys in macOS
date: Wed, 20 Sep 2017 18:30:58 +0000
author: Mike Muir
categories: Tech
layout: post
tags: apple ssh macos
---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

For security, a number of services may use SSH keys for authentication rather than a standard username/password.  Some services include:

- SSH
- GitHub
- GitLab

Keys add a level of security that standard username/passwords don't provide.  When a key is generated, two files are created, a private key, and a public key.  Those two files are mathematically/cryptographically tied together in a way where a separate key would not be able to unlock it, hence the term 'keypair'.

Prior to being able to authenticate, you need to give the public key to what you are intending to authenticate to.  Therefore, when you do authenticate, your private key (that is never given out, EVER), is used to encrypt/decrypt data that only the public key can subsequently encrypt/decrypt.  Only that unique keypair will be able to work together.

**Creating a new KeyPair**

In macOS, by default, SSH keys are stored per user in their hidden folder `~/.ssh`.  To create a new keypair:

1. Open Terminal.
2. Run the following command:

   ```
   ssh-keygen –t rsa
   ```

Once executed, you will be prompted with a number of questions:

- Where to save the key.  Press Enter here, as its default (`~/.ssh/id_rsa`) is sufficient.
- Enter Passphrase.  It is a good idea to pick a password to use instead of leaving empty.  The security of a key, no matter how encrypted, is still dependent on the fact that it is not visible to anyone else.  Should your private key fall into someone else's hands, they will potentially have access to all services that use said key, UNLESS you have password protected said key.  The caveat is that you will need to type in the passphrase each time you use the key.

Once generated, both files (`id_rsa` and `id_rsa.pub`) will exist in your `~/.ssh` directory.  In order to properly use the keypair, you will need to distribute the `id_rsa.pub` file to each server you intend to authenticate to.  This will vary depending on the server.

**Changing the Keypair Passphrase**

To change the passphrase of an existing keypair:

1. Open Terminal
2. Run the following command:

   ```
   ssh-keygen –p –f ~/.ssh/id_rsa
   ```

…then supply your old and new passphrase (twice) at the prompts.