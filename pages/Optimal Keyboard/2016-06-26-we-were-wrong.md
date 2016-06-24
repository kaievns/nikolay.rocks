# Keyboard: We've Been Doing It Wrong

Remember that time when I've built [Halmak](/2016-04-02-meet-halmak) - the most
efficient English keyboard layout on this planet? Also, remember I said I'm done
with the thing? Well. Turned out being done and staying done are two different
things. The story has a continuation.

I've learned the layout. It was actually a pretty easy task. The layout makes
a lot of sense to my fingers and it just sticked to the brains quickly. Using it
for realz turned out to be another story. And it is not the layout itself but
command combinations that are the problem.

I can't count the number of times I closed a browser window because under the
letter 'R' there is now 'W'. And, the number of times I've opened a new tab when
tried to search because there is 'T' under 'F' now? Doh... This made me thinking
about the whole thing. A lot.

Here is an interesting thing: I'm Russian. Being from a non Latin background
has quite a few advantages in life. You get to see different things. One of those
things is Cyrillic keyboard layouts.

There is very little overlap between Latin and Cyrillic letters. Yet, in 21-st
century you need to work with all the software built overseas. Which brings
questions like: "well, there is no letter 'v' in Russian, how do I copy paste
things?", or "there is no 'f', how do I initiate search?".

They could come up with some standard and reassign those combinations to the
letters 'ф' and 'п', or whatevers. But then, just like in case of custom English
layouts, those combinations will be in different places than in QWERTY. But, the
nature of using Cyrillic in modern computers environment is that you flip between
the layouts all the time. Like for example enter an URL in Latin and then post
something on facebook in Cyrillic. It would be a nightmare to use.

So, they've come up with an ingenious solution. They've added an extra QWERTY
layout underneath the Russian one, which initializes when you press `Cmd` or
`Ctrl`. This way one can use Russian layout normally to type in Russian, and when
they need to say save a file, you just press `ctrl+s`. The QWERTY layout will kick
in and all your standard combinations will keep working normally in any software.
You don't need any special reconfiguration for that!

And here were it dawned on me. All those layout optimizations projects. We all
been doing it wrong. From the very beginning we tried to save as many standard
control combinations letters in original places as possible. But the truth is,
our brains don't think of the control combos as _letters_. Those are just muscle
memory things. _do this and file will be saved_, _press that and you paste from the
memory_. And we can move those into a separate layer, like the Russian layout does.

Turned out, this balance between making a layout more efficient and not too much
painful to relearn all the command combos, it doesn't exist.

![](images/2016/06/spoon.jpg)

## Enter Halmak 2.0

So, with that limit being out of the way, I started to rethink the optimization
in a new light. If the sky is the limit, what can we do? I asked this question
that keyboards AI I've built way too many times. And the first thing it always
suggested is to move the punctuation into the middle of the keyboard. Something
like this:
```
1 2 3 4 5 6 7 8 9 0 - =
x x x x x ; x x x x [ ] \
x x x x , . x x x x ' Enter
 x x x x / x x x x x
```
If you think of it, it makes a lot of sense. The two middle rows were always the
most painful section of the keyboard, and moving punctuation, which is used way
less than normal letters, makes perfect sense. Not only it is more efficient, but
it also will allow less flow interruptions in the middle of a word.

Moreover, this allows to nicely spread all the English alphabet letters in two
equal blocks on the left and right, that will require minimal, all so expensive,
dorsal hand movements. Also it will allow to better utilize the bottom row, which
was always neglected in previous optimization attempts.

With this idea in mind, I started to iterate over a new layout design. I used
slightly altered versions of the most efficient cruxes for left and right hands
that I had discovered earlier this year. I also tweaked the AI a lot this and
that way. And, finally I've ended up with the following layout:
```
1 2 3 4 5 6 7 8 9 0 - =
q l r w z ; g u d j [ ] \
s h n t , . a e o i ' Enter
 f m c v / k p y b x
```
After all the work that went into the original Halmak layout, there is very little
room left for performance optimizations. The new version is only `~1%` more
efficient than the original in terms of effort. But, there is plenty of space
for comfort and symmetry improvements.

Now that the punctuation is out of the way, and letters are spread evenly between
the hands. I managed to improve the symmetry of the fingers utilization by `4%`
and evenness of the load distribution by `6%`. And the best thing is that the
layout shifted from being a bit top row heavy to have roughly equal top and bottom
rows utilization. Now this is a truly balanced layout at the very top of possible
performance optimizations.

Also, I managed to squeeze in a few small micro optimizations to improve the
overall comfort of typing in this layout. `sh` and `ck` combos are much less
confusing now. The letter `f` is in an easier to reach place now as well. If
you have to type `for` and `function` all day long, you will understand. Also,
the letter `q` went to its original place, because many console software use
it without a `ctrl` or `cmd` modifier. And, as a bonus, letters `c` and `v` were
left in their original places. But that is not me, apparently they are in their
most efficient place in this configuration.

This is exciting. The missing bottom row optimization was bugging me a lot. Now
without the limit, I can give the whole thing my best and drive it to the very
maximum that I can see there is.

## One More Step

I've been trying to modify and extend this new layout for the past couple of weeks.
I tried to modify the AI criteria, reviewed configs, tried dozens of different
approaches. This one is still on the top of everything else I've tried. So, I'm
keeping it and turning it into an actual layout that I want to learn.

But, there is one more step to take. The very top digits row. That is the final
frontier in this whole story. I want to optimize it for programming. There were
some attempts to balance brackets in there for more efficiency. And there is a
huge room for improvements in there. We are talking 10% improvements over the
existing layout in case of C-like languages. I can't neglect that.

Once I've sorted that out, I hope I will be able to put this story to rest. And,
finally, stay done for a bit.
