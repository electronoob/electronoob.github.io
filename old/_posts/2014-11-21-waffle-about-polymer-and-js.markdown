---
layout: post
title:  "Polymer and JS waffles."
date:   2014-11-21 10:30:00
categories: cross-platform
---

I sit down to begin writing a blog post, I don’t really know what I will be writing about but I suspect it will be about my recent research into HTML5 and “stuff”.

Focus writer is a nice tool for writing out documents because it offers a full-screen blank page, no icons, no toolbars, no distractions - just a flashing cursor and my thoughts. It even hides the mouse pointer from sight too!

So recently I have been catching up with modern web technologies which I had been ignoring for far too long, even some research into bleeding-edge web development. Most notably Polymer which I am becoming a fan of at a rapid 
pace.

I’m also thinking about Desktop GUI Applications with cross-platform support and native appearance. This brings me to a fork in the road, if you can pardon the pun, with either node-webkit or the chromium embeddable 
framework; both look like they will do what I want but since Adobe is using CEF3 for Brackets I’m inclined to go with that. 

One of my projects require me to create an administrative web panel, with the usual sections down one side and a main settings panel on the other, I don’t want to use bootstrap or much else really but I do really like Polymer 
so I’m thinking of going with that for this project. I can’t help but hate PHP, which is funny because this same project was written in PHP and I just can’t stand to write any interface for it unless I use another 
language. Let’s have a drum-roll for node.js.

I’m very tempted to port my IRC services program from PHP to JavaScript but I do tend to subscribe to the idea that if something isn’t broken don’t fix it. The code is stable and has been running for about 2 years so 
far without significant issues, which is certainly fortunate but alas I really hate PHP now. I did recently do some updates so that the daemon can run 24/7 and still receive code changes by reloading modules on the fly but 
it’s clunky due to the way PHP is designed.

I recently started writing a project which I can ‘asc’, essentially it’s a JavaScript program which parses a source-code file, generates the abstract syntax tree and prints out the original source-code by rebuilding 
it from the AST. I have needed to pause development there while I focus on this research but it’s nice to know that it’s possible these days to use one programming language for all aspects of the development process. 
I’m tired of jumping around languages. Granted HTML, CSS, JS, Polymer etcetera.. all complicate the situation anyway but at least we can use one less programming language to add dynamic content.

In addition it’s nice that web, desktop and mobile software can all be produced using html5, JavaScript, CSS and whatever fancy web library or framework; Finally it feels like focusing on one area doesn’t somehow hinder 
me from progressing in another, now I can write once and truly run it anywhere. Amazing!


