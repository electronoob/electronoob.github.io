---
layout: post
title:  "Experimenting with OAUTH, Google V3 API, VLC and YouTube."
date:   2015-02-23 13:15:00
categories: cross-platform
---

Hmm, Hello!

So as you can no-doubt tell it has been a long time since a post here...
I really should try to blog more.

I'm currently irritated with how poor I believe the youtube experience to be,
let's first talk about the many amazing content providers who find themselves
being forced to produce new content regularly to fight for ad-revenue.

That's fine by me because I consume a lot of youtube content, what I find
frustating is that there are so many amazing videos locked away in an
unreachable archive. By locked away I mean very difficult to browse with
the current youtube interface; of course you can always go to each of your
channel subscriptions manually and browse their old uploads but who has time
for all that?

I have over 800 channels that I subscribe to, for one reason or another at
some point in time, I decided were worth subscribing to; I'm willing to bet
that there is a vast collection of videos which I have missed out on.

YouTube for me is a platform for learning, I do enjoy some entertainment
content but for the majority of the time I find that I can sink many hours
a day on youtube on interesting-to-me subjects.

With all of that in mind, let me give a summary of what I am going to try.

A web interface that allows me to authorize access to my youtube data,
collect a list of my subscribers and generate a collection of playlist urls.
Each playlist URL will be pointing at the youtube channel's uploads which
will provide me with 800+ playlists.

Enter VLC, vlc is great because it has been able to for quite some time play
youtube videos, enter the url and off it goes to get the video data for you.
Which is great, but it doesn't handle playlists!

Phew, there's an addon here:
http://addons.videolan.org/content/show.php/+Youtube+playlist+importer?content=149909

Once installed I did a quick playlist test and sure enough VLC downloads and
populates it's own internal playlist with entries from the provided youtube
playlist.

Next up I enabled the remote web interface in VLC, set a password and
navigated to:
localhost:8080/requests/status.json?command=in_enqueue&input=electronoob

Awesome the VLC playlist window now has an entry 'electronoob', sweet!

I've gone off and done some reading about the OAUTH and Google API for web
applications in JavaScript and will hopefully be able to do something interesting.

My only concern right now is the cross-domain policy crap that I'm likely
to encounter... Wish me luck :)

