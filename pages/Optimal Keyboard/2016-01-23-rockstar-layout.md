# Meet The Rockstar Keyboard Layout

Last time I wrote about the CarpalX project and their fully optimized
[keyboard layouts](http://mkweb.bcgsc.ca/carpalx/?full_optimization).
Their reasoning and calculations seem pretty solid to me and I wanted to
give it a go. But, those are rather esoteric and new layouts. They don't exist
anywhere but in some python scripts and linux configs. So, I thought I will
build it myself for OS X, and while I'm on it, I'll throw in some of programming
specific optimizations that I always wanted.

As the basis I took the QGMLWY layout out of the CarpalX project. Lets be honest,
it is a bit of a mediocre name. Besides, I want to build the ultimate programming
layout which will yield that `10x` performance boost. Which is kind of a silly
idea. So, I thought I should name the project somewhat foolish, and the
`Rockstar Layout` fits the bill in my mind.

Lets get through the details though. At the moment the layout looks somewhat like this:

![](https://github.com/MadRabbit/rockstar-layout/raw/master/screenshot.png)

I took the QGMLWY layout as the basis. Which I like for quite a few reasons.

Firstly, I really like that they kept the `ZXCV` at the same location where
the QWERTY has them. I tried to relearn them in [Workman](http://www.workmanlayout.com)
where they are shifted just one spot to the right. It is totally learnable in
terms of typing words, but a huge pain in the neck when you want to copypaste
something. Your muscles memory doesn't treat them as letters, so I keep hitting
the wrong thing. Then I also type in Russian and switching between two layouts
with different C/V location is impossible. And finally most of the web pages
that use `ctrl-c`/`ctrl-v` combinations don't care about actual letters either,
so nothing works there. Hence having `ZXCV` is a huge deal to me.

Secondly, QGMLWY has `S` and `Q` in the same place as QWERTY. So, for the same
exact reason, I really want them where they are. There is also a few letters
from Workman that are in the same place as well, `F`, `U`, `E`, `O`. I already
know them and they feel right. So, having them in the same place is a bonus.

Thirdly, one of the really great things about QGMLWY is that it moved all vowels
to the one side of keyboard and and consonants to the other. I was wondering before
why no one tried that, now I met someone who actually did it this way. And from
what I can tell from my initial trainings, it works brilliantly. It really does
help with hands alteration and reduces the typing effort quite a bit.

Fourthly (and ok, lastly), one of the things I really liked about
[Colemak](http://colemak.com) is the way it made my pinkies work. It actually
made them more useful, which made the whole feeling from a layout much more
balanced and controllable. Sadly Workman took a bit of an opposite approach
focusing on the three strongest fingers. I can see the point, but I like the
Colemak approach better. And QGMLWY goes back to giving pinkies more work by
placing the letters `D` and `H` under them. That makes me a bit happier.

So, on top of this already awesome promise, I've added a few modifications of
my own. Firstly, the no-brainer, I swapped the numbers and symbols, so that you
wouldn't have to press `shift` to reach symbols. The idea is that in programming,
we use symbols much more often than numbers.

Secondly, I swapped registers for `[]` and `{}`, so that you didn't have to press
shift for curly brackets. I don't know about you, but I work a lot in languages
that use curly brackets. JavaScript, CSS, Swift, Ruby. The `[]` brackets are
obviously important, but the curly ones are used much more frequently. So, I
swapped them.

Thirdly, I swapped `-` and `_`. Someone might disagree with this, but I personally
find that I use `_` way more than `-`, because of file names, variable names
and method names (especially in Ruby). So, I want it to be accessible without
`shift`. Besides, this puts `-` and `+` at the same register, which is more
consistent I think.

Finally, I swapped `|` and `\\`, this is one of the most questioned one, but it
makes sense to me as well. The idea is that logical operators `||` and `&&` will
be consistently accessible from the same register without `shift`. Besides, I
really don't like escaping quotes and stuff in strings. If I have a mix of single
and double quotes, I'd much prefer `Q{}` in ruby or a back-tick in ES6. So, making
me press `shift` to type a backslash will force me to write more readable code
with less escapes in the future.

Well, that's about it I think with the features. I think I will have more ideas
once I actually more or less master the layout. But, at the moment that is what
I have to say.

The layout itself is opensourced. I pushed it to
[this GitHub repo](https://github.com/MadRabbit/rockstar-layout), so if you have
feedback/comments/patches, you're welcome to send PRs.

And one more thing. If you decide to give it a go as well, you probably will
want to run some exercises to learn the layout. If you happened to have the
[Type Fu](http://type-fu.com) app on your computer. I had cooked a patch that
will add the `Rockstar` layout support for the app. You can find all the
instructions [over here](https://github.com/MadRabbit/typefu-rockstar-support).

And that's it. Happy typing!
