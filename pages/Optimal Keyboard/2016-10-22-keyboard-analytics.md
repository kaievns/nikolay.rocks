# Keyboard: The Reality Check

So, the last few weeks were actually fun and I've made some good progress on the
project:

![](/images/2016/10/hanger.jpg)

## What Happened Here?

Well, I took an old light stand, duct-taped a coat hanger to it, then i duct-typed
a $12 cheap web camera to the hanger, and then i duct-typed a piece of javascript
to the camera that uses some WebRTC and colors recognition magic to track how hands
actually move across the keyboard when one types stuff on it.

![](/images/2016/10/hands.jpg)

Although the camera resolution was less than stellar, I've managed to collect
several datasets, which amount to ~50-60 measurement points for each finger/key.
And weirdly enough, the data turned out to be pretty good.

As the result I've managed to build the following hand movements model. All the
numbers are normalized to a 1/10th of a key size.

```js
17 14 08 08 13 16 23 19 09 08 07 15 17
   06 02 01 06 11 14 09 01 01 07 09 13 18
   00 00 00 00 07 07 00 00 00 00 05 11
     07 08 10 06 10 04 02 05 05 03
05               00                 11
```

All the code and data sets are published on github
[MadRabbit/keyboard-analytics](https://github.com/jinjingbo/keyboard-analytics)
if you want to play with it. Bear in mind though, you will need an external USB
web camera to re-run the whole process. If you don't have one, there are several
datasets in that repo from my own measurements.

## Where We At

I think having this new efforts model is significant. Keyboard itself is weirdly
skewed, your hands are made of meat, and English is made of cats and rainbows.
All those are highly volatile substances when it comes to formulating a generic
solution.

Projects like Workman, tried to assign effort weights to different keys based on
some thought experiments. My own early Halmak attempts used a similar approach,
then I tried to measure horizontal and vertical hand movements with a ruler, and
mix that model with thought up finger strength settings.

Those are all good approaches. But, they all fall flat down in terms of accuracy
and reliability of the measurements. For example look at my own model that I
used till this experiment:

```js
78 54 40 33 43 38 67 44 33 40 58 49 63
   24 16 14 20 31 42 20 14 16 26 35 56 66
   13 11 10 11 22 22 11 10 11 13 25 50
   23 20 18 20 39 20 20 18 20 23
23              10               44
```

There are certain resemblance in the efforts distribution. But, the scale is quite
off, comparing to the real life measurements. Which is pretty much the difference
between a theory and a practical experiment.

More importantly, I can tell from my personal experience that the real-live
measurements model is more realistic than the synthetic one. For example I know
for a fact that hitting the bottom row with your left hand middle finger is a
quite hard and awkward movement. The real life model clearly indicates this, where
the synthetic model doesn't.

That is why this is so important. We could let it slide when we were building
QWERTY-ish layouts that are primarily focused on the top two rows. But, now when
we have refocused on making hands work most efficiently with all three rows, we
need a good realistic model to make it work.

Now I can pretty much abandon all the synthetic models and calculations i've done
in the original project algorithm and replace them with one flat measurements
array. Because the distance your hands move when you type automatically encompass
all the inconsistencies between the physical keyboard shape and one's hands
unpredictable biological nature. Our hand movements automatically accommodate for
finger strengths, and lengths, and movement trajectories. And it is all measured
in real life with a very statistically trustworthy level of accuracy.

## What Is Next?

Well, for one, I feel very excited about finally having a model that I can trust
99%. This means that I can finally focus on the actual layout design and the AI
algorithm. I need to throw away quite a few nuts and bolts from the current AI
implementation. But, it shouldn't be that hard.

I also need to rework the selection algorithm a bit to favor layouts with
symmetrical heat maps. This turned out to be very important when I started to
utilize all three rows of the keyboard for typing. I'm not 100% sure how to do
it at the moment, but I'll figure something out.

There is still a bit of a road ahead of me. But I'm starting to feel that we're
getting very close to finally finishing this for good.
