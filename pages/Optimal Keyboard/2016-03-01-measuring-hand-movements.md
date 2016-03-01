# Keyboard: Hand Movement Analysis

The last few days I've been busy trying to build an accurate model of hand movements
for my keyboard analysis program. The reason why I didn't use the existing ones
is that the results I see on Workman/Colemak/CorpalX project websites are a bit
conflicting. Not just between each other, but with my personal experience as
well. Hence, I decided to build my own model.

## The New Model

There are a few key moments that make my analyzer a bit different. Firstly, I'm
not just measuring the traveling distance and effort to hit every button. I also
measure overheads for using the same fingers, as well as overheads of changing a
hand's position. For example it detects when a finger reaches out for a hard
button and then you have to reposition your hand to hit the next button.

Secondly, it counts in the overhead caused by pressing the shift buttons. For
example, if you type `The` in QWERTY, first you press the right SHIFT and the `T`
letter with your left hand. But then, your right hand has to retract to the
original position and move to the left to reach out for the `h` letter. My model
accounts for those movements as well.

Thirdly, it counts in the SHIFT presses in the fingers and, as the result, hands
utilization mapping. Which, evidently, wasn't counted in properly by other
analysis algorithms.

And fourthly, there is a difference in how I compare the layouts. Instead of using
the travel distance as the main metric, I caped a user by a specific amount of
effort he can spend typing the same text on different layouts. Once they reach
the limit we compare how far they managed to type and what were the distances,
overheads, distributions and so on. This way of comparison makes more sense to
me personally, because it shows how far you can get with a specific layout on
a specific amount of effort and how much of that effort was wasted on overheads.

## Plain Text Results

In my tests I was comparing QWERTY, Dvorak, QGMLWY (Rockstar), Colemak and Workman.
I picked those because I know all of them aside from the Dvorak, and I can get
a sense whether the results align with my personal experiences in learning those
layouts. I can somewhat reality check my analyzer.

The first set of results is done on a bunch of markdown files from various
JavaScript libraries documentation. I find it a good set of data to represent
modern English with bits of code snippets embedded in them:

```
Running layout: QWERTY
Got to 1009018 symbol, distance traveled: 13034888
Fingers:  13% - 7% - 15% - 17% - 13% - 7% - 12% - 16%
Hands:                     52% | 48%
Overhead: effort = 1619945 , distance = 814451

Running layout: Dvorak
Got to 1111366 symbol, distance traveled: 11317186
Fingers:  15% - 7% - 12% - 11% - 12% - 11% - 11% - 21%
Hands:                     45% | 55%
Overhead: effort = 1353295 , distance = 620304

Running layout: QGMLWY
Got to 1118777 symbol, distance traveled: 11287751
Fingers:  10% - 7% - 13% - 15% - 16% - 12% - 10% - 16%
Hands:                     46% | 54%
Overhead: effort = 1402289 , distance = 673229

Running layout: Colemak
Got to 1134743 symbol, distance traveled: 10778221
Fingers:  13% - 6% - 11% - 15% - 14% - 12% - 9% - 19%
Hands:                     46% | 54%
Overhead: effort = 1166549 , distance = 552988

Running layout: Workman
Got to 1143534 symbol, distance traveled: 11240967
Fingers:  14% - 8% - 10% - 14% - 12% - 12% - 11% - 18%
Hands:                     47% | 53%
Overhead: effort = 1130738 , distance = 564065
```

As you can see Workman is roughly `14%` more efficient in this model that QWERTY.
It also has a nearly `50%` lesser effort overhead than QWERTY. And it also shows
that Workman is, in fact, a slight overall improvement over Colemak. It makes
sense to me and correlates with my personal experiences.

What also interesting is the fingers utilization of Dvorak. It has an almost
perfect distribution of load between fingers, with a slight deep on the left
side; as it has punctuation symbols in the top left corner of the keyboard. I'm
wondering if that was the reason that Dvorak was used to set the world record
in typing speed? It would certainly make sense.

## Most Frequently Used Trigrams and Bigrams

As another set of tests I had generated a text that consisted of the most frequently
used trigrams, weighted by the frequency of their appearance in English, obviously.
And here is where it becomes interesting:

```
Running layout: QWERTY
Got to 1190869 symbol, distance traveled: 15805693
Fingers:  11% - 4% - 16% - 24% - 22% - 7% - 5% - 10%
Hands:                     55% | 45%
Overhead: effort = 1787971 , distance = 794957

Running layout: Dvorak
Got to 1584255 symbol, distance traveled: 10066526
Fingers:  16% - 4% - 13% - 9% - 20% - 16% - 14% - 9%
Hands:                     42% | 58%
Overhead: effort = 211464 , distance = 115344

Running layout: QGMLWY
Got to 1568215 symbol, distance traveled: 10061689
Fingers:  11% - 4% - 14% - 17% - 16% - 14% - 4% - 20%
Hands:                     46% | 54%
Overhead: effort = 418660 , distance = 194106

Running layout: Colemak
Got to 1515749 symbol, distance traveled: 11660945
Fingers:  12% - 7% - 3% - 20% - 22% - 14% - 8% - 12%
Hands:                     43% | 57%
Overhead: effort = 1254726 , distance = 513297

Running layout: Workman
Got to 1673070 symbol, distance traveled: 10901207
Fingers:  11% - 5% - 19% - 19% - 11% - 14% - 4% - 18%
Hands:                     54% | 46%
Overhead: effort = 0 , distance = 0
```

It is not a surprise that QWERTY turned out to be quite horrible in this test.
But, look at Workman! Not only it got nearly `50%` further than QWERTY, it actually
has literally zero overhead in this test. And that is the brilliance of the
Workman layout. Combos is where it really shines!

Also take a look at Colemak. Because it has the letters `t` and `h`, where `f`
and `h` are in QWERTY, it has the same problem as QWERTY with hands lateral
movements, and, as the result, almost identical overhead. That is exactly what
many ex Colemak users described in their experience. It is a very efficient
layout in overall tests, but it is a pain in the neck when it comes to typing
the most frequently used bits of words.

Also, interestingly enough, Dvorak has very low overheads in this test as well.

I also generated a test that consists of the most frequently used bigrams.
Just for the kicks. And, Workman holds its superiority in this test as well:

```
Running layout: QWERTY
Got to 1233986 symbol, distance traveled: 16752518
Fingers:  16% - 2% - 17% - 17% - 25% - 6% - 6% - 10%
Hands:                     52% | 48%
Overhead: effort = 1986068 , distance = 928631

Running layout: Dvorak
Got to 1605972 symbol, distance traveled: 12006749
Fingers:  15% - 6% - 14% - 8% - 17% - 9% - 18% - 13%
Hands:                     43% | 57%
Overhead: effort = 475783 , distance = 227082

Running layout: QGMLWY
Got to 1626356 symbol, distance traveled: 10412427
Fingers:  18% - 4% - 9% - 18% - 12% - 15% - 6% - 18%
Hands:                     48% | 52%
Overhead: effort = 391534 , distance = 213564

Running layout: Colemak
Got to 1558099 symbol, distance traveled: 11200374
Fingers:  19% - 6% - 2% - 14% - 24% - 15% - 6% - 12%
Hands:                     42% | 58%
Overhead: effort = 1038708 , distance = 472140

Running layout: Workman
Got to 1713395 symbol, distance traveled: 11581386
Fingers:  16% - 6% - 18% - 11% - 12% - 15% - 6% - 16%
Hands:                     51% | 49%
Overhead: effort = 95172 , distance = 51912
```

## Conclusions

Well, I'm actually happy about the model I've built. It makes sense to me and
the results correlate with my personal experiences.

It also made it hurt a bit as I have to acknowledge that despite of my personal
attachment to the `QGMLWY` layout, which I picked as the start for my personal
layout, showed inferior results compared to Workman. It is still a very good
layout, but Workman beats it by a large margin every time. Which is great!
Because now we have a good benchmark to beat! :)

The next step will be to build the actual mutation factory for layouts and see
if we can come up with something more efficient than Workman!

As per usual, all the code is shared on GitHub
[MadRabbit/rockstar-genetics](https://github.com/MadRabbit/rockstar-genetics).
Thoughts and ideas are more than welcomed!

PS: Interestingly enough, I'm hitting the limits of NodeJS capabilities here.
My tests can't go further than ~10 average blog posts. Which is good enough as
far as I'm concern. But, I'm thinking, maybe it's time to finally learn Rust?
