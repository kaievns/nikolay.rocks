# Keyboard: Hands Are Weird

So, I didn't have any updates in this project for three months. I guess life
was pretty busy lately. But, no update doesn't mean there wasn't anything
happening. I actually have some new exciting developments to write about.

## A Quick Recap And Halmak 2

If you don't remember all the details, a quick recap. Basically I've figured a
new way of making #keyboard layouts, where all symbols are kind of split between
two sides of a keyboard and the middle rows are taken by punctuation. Here is one
of the final solutions I have with this approach:

```
` 1 2 3 4 5 6 7 8 9 0 - =
  v l r p z ; g u d q [ ] \
  h s n t , . a e o i ' \n
   m f c w ? k y x b j
```

As you can see, now all the letters are neatly divided between the two hands.
This means you will have way less horizontal movements with your hands. It also
means that we can fully utilize all three rows of the keyboard and balance work
between the hands and fingers even further.

Some numbers to prove the theory. The original #halmak layout was roughly `38%`
percent more efficient than `QWERTY`, but the new halmak (lets call it halmak 2)
is roughly `43%` more efficient than QWERTY. Which means we've gained roughly
`5%` additional efficiency comparing to the previous generation.

But the more important thing is the balance. In my measurements QWERTY has the
following attributes:

```
Left/Right hands 56% | 44%
Symmetry: 64% (left to right)
Evenness: 69% (per finger)
```

The original halmak looks somewhat like this:

```
Balance: 48% | 52%
Symmetry: 91%
Evenness: 79%
```

And the all new halmak 2 looks like so:

```
Balance: 50% | 50%
Symmetry: 97%
Evenness: 83%
```

In other words it is almost ideally balanced in every way. At least according
to the existing model. Which proves that we can push the engine to optimize
layouts very close to the theoretical limits.

## Programmer's Layout Optimization

I also spend a bit of time trying to build a programming optimized version of the
layout, which looks somewhat like this at the moment:

```
% ! < { [ & @ | ] } > _ =
  v l r p z ; g u d q ` * \
  h s n t , . a e o i ' \n
   m f c w ? k y x b j
```

the idea is to symmetrically balance brackets between the hands. It is far from
being finished, but the result are quite promising. When I run tests on a whole
bunch of open-source JavaScript code (with docs), the results look like so:

```
QWERTY vs. Halmak 1 -> +18% improvement
QWERTY vs. Halmak 2 -> +31% improvement
```

Which means we have a massive `13%` improvement over the previous generation.
But, again, it's not finished, I need to heavily rework the engine to make a
properly optimized layout.

## Hands Are Weird Though

I know what you're thinking: all those numbers and ideas sound great, but what
about the real life? Well, to find out an answer to this question, I've spend
the last month retraining in this new layout. And, here are my findings.

It feels definitely unusual. Not needing to stretch to the middle row makes
typing so much more pleasant and quick. It just flows very well. But, now hands
are utilized in a bit different way. A normal keyboard uses pretty much the
middle and the top rows — you relatively rarely touch the bottom row. But, now
with the new layout you do, and it feels great and strange at the same time.

Here is the interesting part though, the efforts model that i've built originally,
doesn't scale that well to the bottom row. Because hands are weird, it's not
just the fingers strength and length. Palms are curved and fingers have different
trajectory arcs in which they feel most natural. And to make maters worse, the
standard keyboard all skewed and uneven.

I've tried to tweak my efforts model this way and that, and I didn't quite find
any solution that I would trust 100%. And that is the corner stone of this whole
story. The AI algorithm takes the efforts model for granted. If the model is not
accurate, then the result won't be 100% effective either.

## The New Beginning

Now that I'd understood that I need a more solid hand movements model, that's
where I was spending a bulk of my time, trying to figure how to solve this problem.
And I think I've figured a way.

The new plan is to use WebRTC and color markers on hands to track hands and
finger movements in real time as I type on a keyboard. And for that I've started
a new project

[https://github.com/MadRabbit/keyboard-analytics](https://github.com/MadRabbit/keyboard-analytics)

So, the plan is to collect real life data, aggregate it, and then use statistical
analysis to create a rock solid, facts based model of efforts it takes to reach
every key on the keyboard in different orders.

Once we have that new model, we can come back and feed that model into the
existing AI processor and finally get the answer to this whole story.

Yeah, so here it is. I'm really excited to see where it will get us!
