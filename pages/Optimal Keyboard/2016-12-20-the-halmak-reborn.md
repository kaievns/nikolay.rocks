# The Halmak Reborn

I've been holding back on finally releasing the new #Halmak layout. The
reason being that I wanted to learn it myself first. I wanted to make sure that
what I'm releasing is not just theoretically sound, but also doesn't fold when
it faces the reality. And now it is ready to be presented to the world!

![](https://github.com/MadRabbit/halmak/blob/2bbd381b7bebf1820635742ecbedaf6f830d5196/screenshot.png?raw=true)

You can download and install it [from here](https://github.com/MadRabbit/halmak).
OS X only at the moment.

## The Work

When I started to use the new, real world based, data sets for the calculations,
a peculiar thing happened. The AI practically didn't need any other constrains
but the data itself to come up with perfectly balanced layout options. Because
the efforts data was very precise and granular, the algorithm was narrowing down
on the most fitting option in no time.

At some point I ended up throwing away all other criteria but the raw data. All
other thought experiment measurements like efforts distribution symmetry, or
hands utilization balance, or even traveling distance, auto-magically just fell
off. I used them as post-factum sanity checks, but the algorithm itself didn't
need them at all to come up with really, really good solutions.

In the end I went through three variations that were very close to the maximally
possible efficiency. And, I basically picked the one that made my fingers _feel_
most happy. The one you see in the picture above.

# The Measurements

Here are some numbers though. In terms of pure efficiency, meaning how far one
can type on the same amount of effort, I've got the following results:

* `QWERTY` - `0%` (base line)
* `Dvorak` - `+77%`
* `Colemak` - `+84%`
* `Workman` - `+101%`
* `Halmak` - `+134%`

The overall fingers movement distance. I didn't focus on this metric at all, and
I am probably doing it wrong, so I run this by a third party
[keyboard analyzer](http://patorjk.com/keyboard-layout-analyzer) to get the
results

* `QWERTY` - `2213631`
* `Dvorak` - `1350995`
* `Workman` - `1273033`
* `Colemak` - `1258100`
* `Halmak` - `1242136`

So, we're just a tiny bit better than Colemak in this area too.

There is also a whole bunch of other metrics that has to do with penalties and
overheads. For example `Halmak` has `56%` less same hand usage overheads than
`Colemak` (which is notoriously bad at this). Or, `Halmak` has `27%` less same
finger usage overheads than `QWERTY`. But those metrics are not that simple and
can be pretty confusing.

For example, the same hand usage overheads. They are generally bad. But, if you
used the same hand to type a rapid combo, they are actually pretty awesome. Or
say `Halmak` has a pretty low same hand utilization, but it also practically
eliminates hand movements towards the center of the keyboard, hence reducing the
costs of hands repositioning. Which, consequently reduces the cost of the same
hand utilization overheads in general.

The point I'm trying to make is that there is no good solid model to compare
layouts based on the overheads. They are definitely indicators that can outline
the flavour of a layout, but they don't provide a way to compare them directly.

Maybe some day someone will figure this out.

## The Finale

So, this is actually the end of the story. Funnily enough, I've just realized
that it's been a year since the first post in this project. And, I guess in a
way it symbolizes the full circle being complete.

I started this project with a goal of making something `1%` better than the
best thing we had. I didn't know what I was doing, and I still pretty much
don't. But, it was a great adventure for me personally and I'm happy to see
where I landed. Making something that's `~30%` better than the best thing and
`~130%` better than what everyone's actually using is way way way more than I
expected.

There will be some spin offs. The programming punctuation is still an unsolved
mystery. And promoting the layout will be a fun adventure. But, as a principle,
my work here is done.

And thank you everyone who's been following the project this year. I know this
is not the most exciting area, well it's pretty darn nerdy to be honest. And, I
really do appreciate your interest in it.

And yeah, Merry Christmas everyone! Ho ho ho...
