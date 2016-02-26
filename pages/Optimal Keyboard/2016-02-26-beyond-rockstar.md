# Keyboard: Beyond the Rockstar Layout

So, I've spent a few weeks training with my new rockstar keyboard layout. I'm
still not good enough in it to go cold turkey. But, out of the three ones I
tried so far, I find it the best one. The question is though: is there life beyond
that?

Plenty of people smarter than me spent endless hours on this problem. And I find
it weirdly stimulating. From what I've learned so far, there is not that much of
a difference between layouts in terms of pure typing speed. There might be a slight improvement, but it is practically impossible to measure as there is no control
sample. It depends a lot on how tired you are, how much time you've spent
practicing the layout, and so on.

But, I can definitely say that there is a different feeling to every layout. It
is, indeed, a very subjective substance, but it is much more pronounced than
a pure typing speed metrics to me. Every layout makes your fingers "confused"
in a different way. QWERTY for example confuses the hell out of my fingers, which
causes strain in hands and a feeling of tiredness. Then, every layout has a
different distribution of where the most frequently used keys are. Workman is
pretty neat, but a bit skewed to the right top, and QGMLWY, which is the basis
for my rockstar layout definitely has a lot of meddling in the middle.

There are plenty of things like that. Hands alterations, optimizations for the
most frequently appearing duplets and triplets. How your hands work with the
SHIFT buttons, etc. I have a whole bunch of ideas on what I want from a layout.
But, the question is: can I push it a little bit further and make a better layout
than I have? Can I improve on what I know and build something new?

Well, that is a taffy one. I only have a bunch of half formulated requirements
and I have really no idea how to actually design a keyboard layout. But, I think
I can teach a computer how to figure that for me.

The idea I currently have is to design a track — as a bunch of text (source code
actually). And then use some genetic algorithm voodoo to make the computer to use
a bunch of mutations and find the best match for my requirements.

That is what I've been busy with in the last few days; trying to build an engine
that will simulate a user with all his fingers and palm movements. And one of
the first things I started with is a detailed keyboard parameters analysis.

I think that the author of the Workman layout had a really bright thought about
grading all the keys in terms of the effort required to press every one of them.
The problem though, it was a quite arbitrary and naive map that had a grid type
keyboard in mind. I decided to push the idea bit futher.

I basically measured all distances that a finger needs to move in order to hit
every button. I measured the lateral and dorsal (horizontal and vertical) movements
required to press every button. I counted in the length and strength of every
finger. Also the skewness of a standard keyboard, as well as the bend of the
wrists. And then I generated an efforts map that looks somewhat like this:

![](images/2016/02/efforts-map.png)

As you can see it is quite a bit different from the
[workman efforts map](http://www.workmanlayout.com/blog/wp-content/uploads/2010/10/keyboard_graded1.png)
but the principle is very similar. I'd argue that due to a more granular nature
of my table, and its source based in actual measurements, we should be able to
generate a layout that is closer to reality than Workman.

The second step of the project is to build a detailed model of a keyboard user,
which counts in handling the shift button and a compound effect of the same finger
movements. Once we have that we can start taking measurements and code in the
actual requirements for a layout, like symmetry, travel distance, combos and so on.

If you're interested in following the project, it's all on GitHub in
[this repository](https://github.com/MadRabbit/rockstar-genetics). Ideas and thoughts
are more than welcome!
