---
title: "Were you affected by the CloudFlare HTTPS Traffic Leak?  You should change your password..."
pubDatetime: 2017-02-24T21:24:53Z
description: "CloudFlare is a rather well known web services and security company that MANY public companies use for hosting and website reliability. Unfortunately, it…"
tags: ["tech", "cloudflare", "dns"]
archived: true
---
CloudFlare is a rather well known web services and security company that MANY public companies use for hosting and website reliability. Unfortunately, it came to light a day or two ago that a bug existed in their system that allowed private passwords, messages, API keys and other sensitive data to be leaked to random requesters.

This means that any of that data was cached by search engines and other random systems. It sounds scary, but the scope of the leak is immense. Over 4.2 million domains were affected, and so it is probably a good idea to change your passwords, but how do you know which accounts were compromised?

A user on GitHub put together an ongoing list of domains that use CloudFlare, which is accessible here: https://github.com/pirate/sites-using-cloudflare

To check, download the full list, unzip it, then open a command line prompt and run

```
grep -f domaintocheck.com sorted_unique_cf.txt
```

to see if the domaintocheck.com is present.

If you want to check a bunch of domains at once, create a .txt file with all potential domains one per line, then run the following:

```
grep -xF -f [.txt file] sorted_unique_cf.txt
```

...which will output each domain affected.
