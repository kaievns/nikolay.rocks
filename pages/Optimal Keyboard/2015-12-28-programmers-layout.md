# Programmer's Layout

So, while I am still going through the learning curve of the
[workman keyboard layout](http://www.workmanlayout.com), I thought I should
write a bit about a thing I found while was researching #keyboard layouts.
This thing is called "programmer's layout".

It is kind of an interesting topic. Most of the keyboard layout optimizations
are done around typing texts in English. Meanwhile gazillions of other people
use a keyboard for something more advanced than a mere text typing: typing
software. Which means an excessive use of various symbols.

Obviously some brave and smart people thought about it and they experimented
with keyboard layouts in order to optimize them for programming. For example
there is [programmer dvorak](http://www.kaufmann.no/roland/dvorak/) which looks
kind of like this:

![](http://www.kaufmann.no/roland/dvorak/images/dvp1.png)

They have reorganized the symbols location and reordered the numbers having
even ones on one side and odds on the other. That sounds great in theory, but
seems like a massive overkill in a practical sense.

Thankfully there is another, much simpler way one could do a "programmer"
oriented keyboard layout. Someone figured that you can flip the digits and
symbols in the top keys row and get a similar result.

The idea here is that as a programmer you much more often use the symbols than
numbers. So, if you won't have to press `shift+` all the time you will type
code more efficiently. Which makes total sense and doesn't seem like a massive
learning curve to get used to.

So, I ran the entire [ruby-on-rails](http://rubyonrails.org) codebase through
a keyboard layout analyzer for both programmer dvorak and programmer tweaked
colemak/workman. And the result was similar. Comparing to a non-programmer
optimized versions of the layouts there was a marginal decrease in the overall
travel length for fingers. And the percentage is quite close between the entirely
optimized programmer dvorak and "flipped" version of workman.

But, although the difference is really marginal, I'm trying to look at it the
same way we look at the difference between colemak and workman. It is not entirely
about how much your fingers have to move, but how much your hands have to move
horizontally. See, if we get rid of the `shift+`, then your hands won't have to
jump every time you need to write a symbol. Although you might not save that
much on overall fingers travel length, you might save a lot on your hands
moving and repositioning. So, the whole concept of flipping digits and symbols
makes a total sense to me.

One thought though. I recon I should flip `"` and `'` as well. Because I prefer
double quotes as the default string guards in my code. At the moment I'm torn
between doing extra work with pressing the `shift+` or being sloppy and just using
single quotes. Sloppiness usually wins. So, my theory is that if I would flip
them, then I'd be much more consistent in my code. Either way, worth a try.
