---
layout: post
title: On Certificates
date: Sun, 11 May 2014 21:37:14 +0000
author: Mike Muir
categories: Tech
tags: certificates SSL

---

*This post originally appeared on my Squarespace blog. Reformatted for clarity.*

So I wrote this for CR as a piece to explain the basics of Certificates.  Obviously, if you've ever attempted to create and embed a certificate into a web service, its not the easiest thing in the world...

---

Just about everyone has at least heard about the recent Heartbleed bug that was scouring the internet a month ago.  By this time, there is probably a good chance that all of the major internet services that you have been using have already patched themselves to avoid any attacks by the OpenSSL vector.  However, how much do you really know about what is happening behind the scenes when you have a secure connection to your favorite webmail or social networking site?  That little lock icon you see in your web browser is more than just an icon, it is a notification that the site you are using is secured by an SSL Certificate.  But what are those certificates good for?

SSL Certificates were developed to create secure connections between computers.  Those connections are used to transfer data back and forth in an encrypted state, to avoid prying eyes from being able to view the data that you are working with.  However, it is also used to establish trust between who you are talking to.  Would you feel comfortable writing down your banking info on a sticky note and handing it off to a random person on the street and asking them to bring it to your coworker across town? Probably not.

This is one of the benefits of a proper SSL Certificate.  Not only does it create that necessary encrypted state, but it also establishes a chain of trust, so you know that the remote computer/server you are working with is the correct one you are intending to talk to.

A certificate is a small file that gets transferred along with the data you are sending to the remote server.  It has information embedded in it that verifies certain details in regards to the identity of the sender.  To make sure that the certificate is valid, it is signed by an independent third party, called a Certificate Authority.  To get a valid, signed certificate, a company submits a file they created (a Certificate Signing Request) along with valid information about their business that the CA verifies.  Once verified, the CA replies back to the CSR with a valid certificate that the company embeds into their server.

Naturally, how can you trust the Certificate Authority?  Luckily, the manufacturer of your operating system (Apple, Microsoft, etc) has already installed a number of root certificates on your computer that pre-validated hundreds of various Certificate Authorities across the world.

So how do you know you have connected securely with Bank of America, or Facebook?  Look in your web browser and you should see a lock icon near the URL.  That means it is connected via an encrypted connection called SSL, and if you click the icon, it would come up with information about the embedded certificate, showing you the valid information that the Certificate Authority already vetted for you.  Alternatively, check that the website's URL has an https appended to the front of it: 

```
https://www.facebook.com
```

So how does the actual SSL Encryption work?  Actually, its somewhat related to the idea of having a physical key to unlock the door to your house.  Behind the scenes, when a server sends you data (or vice versa), they are also sending you  a 'public' key.  The 'public' key is linked with a 'private' key that only the server has access to.  The data sent is encrypted using the private key, but only the recipient with the valid 'public' key can decrypt the data.  If a 'man in the middle' were to receive the data being sent without having the key, they would only be able to see gibberish.  Vice versa, if you sent data to the server, that data is encrypted with your 'public' key, which can only be decrypted with the server's 'private' key.

These days, with just about everything being internet connected (including your fridge), its becoming more and more prudent to be safe online.  If you are intending to build a server, create a website, or even just check email, make sure that SSL Certificates are being utilized.  Trust is an invaluable commodity online, and it makes all the difference with your customers and your business.