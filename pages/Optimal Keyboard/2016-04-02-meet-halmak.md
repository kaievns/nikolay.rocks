# Keyboard: Meet the Halmak

Ladies and gentlemen, we officially have a winner! Please meet
[Halmak](https://github.com/MadRabbit/halmak) — the most efficient keyboard
layout on this planet:

![](https://github.com/MadRabbit/halmak/raw/master/screenshot.png)

I guess there is no point in repeating all the whys and whats in here. So, I'll
just jump directly to the final results and comparisons.

## Plain Test Results

To have a fair and diverse representation of modern written English, I used a
collection of articles from various high profile online medias as the test data.
It is a pretty solid 1.4MB chunk of text written by different authors.

Then, in terms of measurements I was using the following metrics to make comparisons:

1. `efficiency` - an elaborate system that quantifies the amount of effort necessary
   for typing a certain pice of text.
2. `distance` - is your standard finger traveling distance measurement
3. `symmetry` - is how symmetrical the fingers usage map looks like (left to right)
4. `evenness` - is how evenly the load is spread between fingers. this accounts
   for individual strength of each finger and puts less work on weaker fingers.

And the results look like this. The typing efficiency:

* `QWERTY` - 19.99 effort/symbol (base line)
* `Colemak` - 16.08 effort/symbol (`-24.3%`)
* `Dvorak` - 16.05 effort/sybmol (`-24.5%`)
* `Workman` - 15.66 effort/sybmol (`-27.6%`)
* `Halmak` - 14.86 effort/sybmol (`-34.5%`)

In terms of typing distance, the result are the following:

* `QWERTY` - 7.337 dist/symbol (base line)
* `Dvorak` - 4.193 dist/symbol (`-75.0%`)
* `Workman` - 3.904 dist/symbol (`-87.9%`)
* `Colemak` - 3.826 dist/symbol (`-91.8%`)
* `Halmak` - 3.808 dist/symbol (`-92.7%`)

And finally evenness and symmetry:

* `QWERTY` - symmetry: `64%`, evenness: `68%`
* `Colemak` - symmetry: `85%`, evenness: `73%`
* `Dvorak` - symmetry: `83%`, evenness: `84%`
* `Workman` - symmetry: `90%`, evenness: `78%`
* `Halmak` - symmetry: `91%`, evenness: `79%`

## Most Frequently Used Trigrams

Another very good test that is used to analyze layouts efficiency is a test that
uses a collection of the most frequently used trigrams in English. This is a good
test to measure a layout's optimization for various combos:

 * `QWERTY` - 20.97 effort/symbol (base line)
 * `Colemak` - 16.90 effort/symbol (`-24.1%`)
 * `Dvorak` - 15.65 effort/symbol (`-34.0%`)
 * `Workman` - 15.31 effort/symbol (`-37.0%`)
 * `Halmak` - 14.68 effort/symbol (`-%42.8`)

## JavaScript Coding Test

As an extra test I run the comparisons against the `node_modules` folder and all
the community created `JavaScript` files. It had `babel` in with all the dependencies
so it is a fairly huge chunk of code written by hundreds of developers.

Also, I used programmer's versions of `Workman` and `Halmak` layouts:

* `QWERTY` - 24.97 effort/symbol (base line)
* `Dvorak` - 21.75 effort/symbol (`-14.8%`)
* `Colemak` - 21.55 effort/symbol (`-15.9%`)
* `Workman-P` - 21.31 effort/symbol (`-17.2%`)
* `Halmak-P` - 20.53 effort/symbol (`-21.6%`)

## Final Analysis

There were very few criteria I specified to the AI that I wanted from the result:

1. It must be as efficient as it is physically possible
2. It must have the letters `ZXCV` and `S` in their original place
3. It must keep the punctuation in their original places (+move `;` same as Workman/Colemak)
3. The layout must be mostly symmetrical and spread the load evenly between fingers

All the rest of results are really just a side effect of those criteria.

During the research I've discovered the maximal possible layout efficiency, and
this final result is very close to that maximum. In fact, if we would drop the
symmetry requirement, the difference would be around a half of a percent of
extra efficiency. More of that, if we drop all constrains what so ever, the
additional gain will be around 1-2%. Considering that `Dvorak` didn't really have
additional constrains for specific letters placement, I'm very happy that we
managed to get past that.

What I'm trying to stress here is that this is, by all means, is one of the most
efficient layout that is possible to design. Ever. We can only hope for some very
marginal improvements from this point.

## Third Party Verification

To be completely honest, I was a bit surprised by the results. So, I went and
verified them with a third party
[keyboard layout analyzer](http://patorjk.com/keyboard-layout-analyzer/#/main)
and have very close outcomes from them as well:

![](images/2016/04/halmak-results.png)

They obviously have a different model. They focused on the old distance + same
finger/hand usage overheads system, so the scale is a bit different. But, never
the less, `Halmak` showed on top in there as well.

__NOTE__: if you decide to give it a go as well, please use some more serious data
source than they provide. A bunch of articles from NYT would be a good start.

## The Bottom Line

This was a pretty cool project to me, and I'm very excited about the results.
There is still a long road ahead in terms of mastering the layout. But, now
I'm 94% sure that I'm learning the right thing.

In a few days I've already learned most of it, and so far it goes really well.
It throws me back a lot to Workman in terms how it feels, but, somehow it feels
even faster and less confusing. I have a very good impression from it.
