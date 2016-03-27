# Keyboard: Two Pillars Of A Good Layout

For the last week, I've been busy fine tuning my
[keyboard layouts searching AI](https://github.com/MadRabbit/keyboard-genetics)
project and watching hundreds of layouts being designed in real time. I guess
the whole point of this experiment was to get me to this point where I can see
how it's made, over and over again. And I think I now see the pattern.

As I described it in my last article, the layouts efficiency reaches a local
maximum. Eventually big leaps of improvements dry out and what happens is that
the AI fine tunes the results based on various additional conditions I require,
like: even hands/fingers utilization, or specific placements of letters to the
same hand.

The interesting thing is though, there is a pattern to all those results. Two pillars
of a good layout design as I call them. Sometimes an algorithm follows them exactly,
sometimes it is a variation, sometimes it's bits and pieces. In it's pure form
the pattern looks somewhat like so (i placed digits to show the boundaries of a
layout in the picture)

```
~ 1 2 3 4 5 6 7 8 9 0 - =
  . . r . . . . u . . . . .
  h s n t . . a e o i . .
   . . . . . . . . . .
```

Most of good layouts have two parts an `HSNT+R` section on the left and an
`AEOI+U` section on the right. They morph though. Sometimes it is `NSHT+R`,
sometimes it's `RSNT+H` and so on. Sometimes other letters get in, sometimes
the top row placement shifts left or right one position. But, it is always those
two sections.

It makes sense if you think of it. Those are the most frequently used letters in
English language, and, hence, their correct placement has the biggest impact on
the overall layout performance. Then, if you encourage hands alteration—which we
should—then you inevitably end up with consonants on one side, and vowels on the
other. The CarpalX project actually did exactly that. And I really liked it.
Although they didn't place them well enough.

Speaking of CorpalX. Let's take a look at the layout picture:

![](http://mkweb.bcgsc.ca/carpalx/images/qgmlwy.png)

See that it has the `STN+R` letters on the one side and `AEO+U` on the other?
That is not an accident. Those are partials of the two high performance blocks
I have identified earlier.

Let's look at the Workman layout as well:

![](http://i0.wp.com/www.workmanlayout.com/blog/wp-content/uploads/2010/10/workman_layout.png)

See anything familiar? That's right! The `SHT+R` and `EOI+U` sections are right
there!

And the same thing goes for Colemak:

![](http://colemak.com/wiki/images/8/80/Colemak_layout_2.png)

The `RST` on the one side and `EIO+U` section on the other.

Let's look at Dvorak as well!

![](http://www.dvorak-keyboard.com/wp-content/uploads/dvorak.gif)

See the `AOEU+I` and `HTNS+R` section on the other? It is exactly the same
thing, just flipped over.

All those layouts have the same roots. The difference is that in my case I have
an option to watch a wide range of layouts being designed to the maximum of
possible performance and then run fine grained comparisons between different
variations.

After I locked in those two sections, the rest was just a matter of time before
the AI zeroed down on a few most fitting variations of the rest of the letters
around them. I'm still running the final tests and verifying my results, but one
of the candidates looks somewhat like this:

```
` 1 2 3 4 5 6 7 8 9 0 - =
  w l r m k q g u d ; [ ] \
  n s h t f y a e o i ' \n
   z x c v j p b , . /
```

It features the `zxcv` and `s` letters in their original place, the two high
performance sections in their best form and various micro optimizations for most
frequently used trigrams. Overall, it is as performant as it gets. I hits 6% above
Workman in my scale and roughly 30% over QWERTY. And on top of that it has a
practically ideal 50/50 hands alteration balance.

PS: I was reading the other day that it took nearly 12 years to design the
Dvorak layout. It took me roughly 12 days of my time to teach computer to solve
the problem in 12 minutes. Yeah, I'm stretching it, but it is stunning, and
somehow humbling, how much was changed in the last 100 years in terms of access
to tools to solve problems like that. I'm wondering what kinds of things people
will be able to solve in 12 days a 100 years from now.
