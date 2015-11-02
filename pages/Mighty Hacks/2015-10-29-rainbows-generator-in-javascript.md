# Rainbows Generator In JavaScript

A few days ago I wrote an article about
[generating a rainbow colors sequence in ruby](/2015-10-24-waves-rainbows-and-flux).
And, I bet you want to know how to do the same in #javascript! So,
today we are making more rainbows. For science! Because, you know,
rainbows are basically 100% made of science.

## The Problem

Just in case you have just landed here and don't wanna read about
some code in ruby. The problem is kind of simple: _how do you
generate a sequence of rainbow colors of a given length?_

If it was just about the basic 7 colors, then it would be easy. But,
making a proper sequence of colors in a #rainbow gradient, might be
a bit tricky.

## The Waves

Remember at your science class in hi-school, the teach used to talk
about how everything, including light is a wave?

![](/images/2015/10/wayne-dream-segue.gif)

Turns out it's like totally true and rainbows are made of waves as
well! So, the first step, we need to learn how to build us some waves!
Which is kind of easy in #javascript. Just use the built in `Math.sin`
function!

```js
var size    = 12;
var rainbow = new Array(size);

for (var i=0; i < size; i++) {
  rainbow[i] = Math.sin(Math.PI / size * 2 * i);
}
```

This will build us a sine function values sequence that looks somewhat
like this:

![](/images/2015/10/sine-chart.png)

## The Shades of Gray

It might sound a bit weird, but on our way to rainbows, we need to
do some grayscaling. You see, having the raw sine values that go
from `1` to `-1` is kind of no use to us. We need to normalize those
values to the standard RGB colors `0..255` range and then convert
those numbers to hex `00..FF` values

```js
var size    = 12;
var rainbow = new Array(size);

for (var i=0; i < size; i++) {
  var sin = Math.sin(Math.PI / size * 2 * i);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  hex.length === 1 && (hex = "0"+hex); // adding a leading `0`

  rainbow[i] = "#"+hex+hex+hex; // a proper hex #0011ff color
}
```

Now if we would go and make a bunch of DIVs with backgrounds of
those colors, we would have a grayscale brightness distribution
that looks kind of like that:

<div class="rainbow-test">
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>

<style>
  .rainbow-test {
    height: 1.5em;
  }
  .rainbow-test div {
    display: inline-block;
    height: 1.2em;
    width: 1em;
    float: left;
  }
</style>

## Phase Shift and The Other Flux

And the last piece of science that we need to learn (a scout's honor)
before we can make rainbows is the phase shift. Phase shift is a fancy
term for shifting a wave left or right, so that it would start not
from `0` but say from `1` or any other value.

As you remember from your trigonometry class, the sine function is
basically a circular thing. You start from the `x:1, y:0` position
and go around in circles. In this coordinate system, a phase shift will
mean that you start not from `0` degree, but somewhere else on that circle.
And the angle at which you start is called the **phase**.

So, lets start three waves that are shifted 120 degrees apart from each
other. Kind of like in a flux capacitor:

![](/images/2015/10/flux-capacitor.gif)

In terms of programming code it means that you need to add a `120deg`
or `Math.PI * 2/3` to the angle values when we iterate through our sequence.
Also, as we will have three waves now, lets refactor the code a bit
and add some function to handle the math:

```js
var size = 12;
var sequence1 = new Array(size);
var sequence2 = new Array(size);
var sequence3 = new Array(size);

for (var i=0; i < size; i++) {
  sequence1[i] = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  sequence2[i] = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  sequence3[i] = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase); // <- phase shift
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? "0"+hex : hex;
}
```

This will build us three sequences each 120 deg from another. If we
represent that on a bunch of grayscales, they will look like this:

<div class="rainbow-test">
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>
<div class="rainbow-test">
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(127, 127, 127)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
</div>
<div class="rainbow-test">
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(127, 127, 127)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>

## The Magic Trick

And the magic trick to the whole thing is to treat all those three
phase shifted waves as the `red`, `green` and `blue` colors:

```js
var size    = 12;
var rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = "#"+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? "0"+hex : hex;
}
```

And that will produce a rainbow colors sequence that looks kind
of like that:

<div class="rainbow-test">
  <div style="background:rgb(128, 18, 237)"></div>
  <div style="background:rgb(191, 1, 191)"></div>
  <div style="background:rgb(237, 18, 128)"></div>
  <div style="background:rgb(255, 64, 64)"></div>
  <div style="background:rgb(237, 127, 18)"></div>
  <div style="background:rgb(191, 191, 1)"></div>
  <div style="background:rgb(128, 237, 18)"></div>
  <div style="background:rgb(64, 255, 64)"></div>
  <div style="background:rgb(18, 237, 127)"></div>
  <div style="background:rgb(1, 191, 191)"></div>
  <div style="background:rgb(18, 128, 237)"></div>
  <div style="background:rgb(64, 64, 255)"></div>
</div>

And that how it works folks. Take three waves, jack them into a
flux capacitor and it will spit out rainbows! Consider yourself
scienced!
