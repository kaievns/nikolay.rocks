# Why Lovely.IO Failed

[Lovely.IO](http://lovely.io) was a project of mine in 2010-2012. It is
kind of a mix of a modular #javascript framework, a CDN and a package
management system for the front-end modules. Although it was heavily
pushing the boundaries of possible in the area at the time, the project
didn't pick up much of momentum and was eventually scrapped.

In open source world, we don't usually do a #failure analysis of projects.
Things are just quietly swept under the carpet; projects are marked as
unmaintained and we move on. But, for the future reference, I wanted
to do an actual post mortem on lovely.io. So, here it is.

## Prehistory and RightJS

A bit of prehistory. In late 2008, when #rails 2x was blowing people's
minds and IE6 was still a real thing, the [PrototypeJS](http://prototypejs.org)
javascript framework reached its peak and started to flicker out of
the existence.

As many others at that time, I wasn't particularly thrilled by the
upcoming herds of jQuery plugins. It is fine, but to me, it was like coding
PHP only in JavaScript. I wanted something more structured, something
that better fits a ruby dev brains. So, I set up to build a new
javascript framework; like PrototypeJS, only better.

Eventually the good people of the internets and I, we built this
project called [RightJS](http://rightjs.org) (if you are going to
build something new, it is better to build it right, right?)

RightJS took quite a bit from PrototypeJS and MooTools. But, instead of
polluting the native prototypes, it used this new tech I called
"DOM wrappers". In a sense it's a components system that abstracts
DOM elements in classes, kind of like [ReactJS](http://reactjs.com)
only without the JSX part. And it also had jQuery like `$` thing.

The result was pretty cool. RightJS could do all the same as jQuery
or PrototypeJS, but in a robust components based manner. It also weighted
half of the jQuery size and worked 6-9x times faster with DOM.
Pretty impressive numbers back in the day.

So, the project received some good following — especially for an unknown
Russian guy with broken English. People loved it, started to build
stuff with it. The god of javascript and creator of jQuery
[John Resig](https://en.wikipedia.org/wiki/John_Resig) okayed it,
[Zed Shaw](https://en.wikipedia.org/wiki/Zed_Shaw) used it on a few
projects. Things were looking bright for RightJS.

And that is where I decided to fork it.

## Enter Lovely.IO

I loved RightJS. All my stuff was built with it. But, I didn't really
want to make it big. I didn't want to end up signing books and kissing
babies in front of cameras. I mean, don't get me wrong, it wouldn't hurt
employment wise, but it was not my goal per say. I just wanted to push
the tech as far as I can and have fun in the process.

So, RightJS started to gain popularity. People would come and ask me to
build all sorts of plugins for it. And then there was the marketing
effort. Support. All this started to keep me away from the actual
tech. I kept getting new ideas, but wouldn't have space and time
to build them within the RightJS realm.

And then the new RightJS components system proved itself to be quite
robust, plugins started to pail up. The whole thing was just begging
to be modularized. The problem was though, that at that time (early 2010),
there was no proper modules system. People were still trying to figure
what AMD is. [RequireJS](http://requirejs.org) just appeared and some
were wondering if it's cool or not.

That's where it occurred to me that we could build something bigger
than this. A centralized space and environment for the front end
modules. Something like rubygems, only for the front-end. 100% CDN
based, with unique packages that are shared across the internet.

The train of thought was something like that:

* We split the monolithic RightJS framework into a set of modules.
  Things like `dom`, `ajax`, `utils`, etc. will be independent modules
  loaded up on demand.
* We create an automated CDN hosting, kind of like Rubygems, where one
  could push their packages and extensions and it will handle all the
  delivery, caching, headers, etc. automatically.
* We build an AMD based piece of code that will resolve and load up all
  the dependencies automatically. So that when a dev needs a certain
  widget, he'd just say "i need __diz__" and __diz__, with all the
  dependencies, will magically pop up in the browser.

Thanks to DHH though, the consensus back then was that a single 1MB
javascript file is better than a modular framework with 5 smaller files.
Given that, I didn't really want to push RightJS head first in that
direction. Instead, I decided to fork RightJS into a new project which I
called `Lovely.IO`.

I called it "lovely", because I got a bit tired of calling everything
"right". I mean it's fun, but it kinda puts you in a rather dickhead-ish
mindset. And I didn't want to be yet another white male dickhead with
a framework on the internet. So, I called it "lovely"; thought that
if I deliver great stuff and be nice to people it will attract good folks.


## The Product

Lovely.IO took me roughly a year of my free time to build. It was
quite massive and provided a full development environment for building
the packages.

It had an awesome, fully automated packages hosting platform. Aside
from just javascript, it also would host your component stylesheets
and assets, like images and fonts. It used Cloudfront as a
supercharged delivery mechanism. It would deliver my new modular
framework several times faster than it took to deliver jQuery from
google's CDN.

![](/images/2015/07/landing-loading.png)

It had a completely rewritten, modular javascript framework based
on the RightJS DOM wrappers tech that yielded some awesome DOM
manipulation performance:

![](/images/2015/07/landing-benchmark.png)

And it had a CLI client for the packages host server. As well a
set of dev tools, like a dev server, packager, and so on.

![](/images/2015/07/console.png)

I also launched a small [screen cast](http://lovely.io/show/) about
the framework, which featured episodes about building new packages,
integrating the new platform with ruby on rails, and so on.

It was ready to take new people on and lead us to the brighter
future. But, despite of all my efforts in marketing the thing and
some good interest from devs, the adaptation level was really low.

Early 2013, I finally gave up on it, and called it a failure.

## The Failure

Well, it is not everyday you spend a year building new awesome
open source tech and then come out saying "it failed". I mean, in
most cases, we just push things in there, and if it didn't work
out, we just move on. What is a failure in open source anyways?

So, I thought about it for a while (aka "i have learned a lot"),
and I think I have identified a few major problems which didn't
feel particularly relevant at the time, but were slowly moving the
project towards the inevitable.

### Don't turn your back on people

We had a good thing going with RightJS. It was quite foolish to
wrap it up half way through and say "see you on the other side".
Open source is weird, you give people a thing for free and then
you owe them love and dedication.

I don't kid myself thinking that I invented something special with
RightJS. It became what it was largely due to people's feedback
to the project. People gave me the credit of trust and that was
awesome. But, by any means that credit did extend to a fork.

I shouldn't rename it and start over, I should use the existing
momentum and build the lovely.io within the RightJS infrastructure.
The ideas were good, loosing the momentum was bad.

### Don't try to build everything

With lovely.io I had a vision. I had an idea how to build a new,
large scale, high performant thing that could grow a community
around it. The huge problem with the project was though that
it was basically an `rm -rf` of everything.

Lovely.IO had everything, but it had everything new. There was
practically nothing that new developers could integrate with straight
away. A complete new tool set and environment, even though new and
shiny, were worthless due to their isolation from the rest of the world.

It took me a while to figure, but the best projects (and products)
are the ones that integrate with the existing tools and ways of
dealing with problems. That is a big "F" I had to learn the hard way.

I should bring the new ideas I had implemented in Lovely.IO, piece
by piece into the existing RightJS environment. More of that I
should had welcomed everyone else onboard, including jQuery and pals.
It would be much harder to bring to life, but that would be a much
wiser solution.

### Product market fit is everything

It is easy to play a snarky programmer who thinks that he's above
marketing. Especially in open source. You are just chasing a
dream and marketing feels irrelevant. But, that is where most
programmers are wrong.

Marketing is a deep and clever discipline, and everyone who wishes
to deliver something meaningful in life should grow an appreciation
for its principles.

The hard truth about lovely.io is that, also being technologically
relevant, there was no real market for it. Lets face it, it was
just a cool concept which was interesting to just a few developers.
The real life commercial development, even now, compiles everything
in local files and ships the product in a single file. It is blunt
simple and it works.

Well, I had no idea back then what's PMF or MVP or how to do a market
analysis. No wonder I ended up in a classical dead end with a shiny
new thing that no one wanted.

### Being nice doesn't sell

With RightJS I took quite a bit of an aggressive stance in terms of
positioning the project. I was young and stupid and needed to prove
myself. In a way it worked, but it left quite a few burns on my karma.
So, with Lovely.IO I had decided to take the other extreme, to be as
nice and helpful as possible.

And it didn't work that stellar as I hoped. Being a self-righteous
jerk on the internet attracts people quite well. But, try to be nice
to people and you will be largely ignored.

The simple truth to it, people need a super stimulus. We need role
models, we need to see that there is someone unusual behind a project,
someone who makes things feel exciting.

You can contemplate about it one way or another, but, when it comes
to promoting new tech, being nice and helpful is a mediocrity. You
are just being avoidant, that's all there is to it really. The
message that people will receive is that you don't care about your
project. And they won't care about it either.

You don't have to be a jerk to get people's attention. But you need
to be an ass-kicking ball of awesomeness to make something successful.
That how it works.

## Conclusion

Well, there is no real conclusion. I tried, I failed and I'm proud
of it. Tomorrow there will be new projects and new shinies to build!
The good part is that I learned a lot. And I hope you did too.
