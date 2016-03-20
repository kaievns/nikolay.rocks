# Keyboard: The QWERTY Theorem

I've got some updates on my progress about my search for an optimal keyboard
layout by using genetic algorithms. Last time I thought I had to rewrite a
significant part of the system in Rust for some performance gains. I wasn't
particularly successful in that. But, I optimized my JavaScript based implementation
by adding some look-up maps and magic and ended up with similar results.

I'm still a bit away from really performant tests, but I have a good enough
solution I think and I start to see patterns. My new JavaScript based benchmark
script goes though a standard 300 pages book in roughly a second and gives me
enough space for the experiments.

The second major update is that instead of using nodejs libraries documentation
as a source of text, I used NYT articles this time to run my tests. I simply
copied ~20 top articles from NYT website, cleaned them up and then run in my
tests in a loop. As this is a much better representation of modern written
English, I think I have much more accurate measurements now.

Now, when I have a more performant benchmark algorithm and better text samples,
I started to run the tests with a more serious face. And, I start to see patterns
in results:

## The QWERTY Theorem

The first pattern is kind of funny, I can postulate the following:

> Any list of 15 randomly generated keyboard layouts, contains at least one
> layout that is more efficient than QWERTY.

I knew that QWERTY is suboptimal, but the tests results make me chuckle a bit.
This happens every time. On every run — and I had hundreds so far — in the first
random population of layouts, there is at least one that is more performant
than QWERTY. Sometimes by a little, sometimes by a lot. But it happens every time.

Go figure.

## The Local Maximum

Another pattern that emerged in my research is that it appears that with every
generation, the rate of improvements seems to slow down. I still end up with
some degree of variations between the results, but it seems that they reach
a maximum over time.

The actual maximum depends on conditions obviously. For example how many keys I
allow to move around, and what kinds of texts I use as samples. But never the
less, the algorithm reaches the same levels of optimizations every time. Which is
good. This means we are getting to the bottom of it.

Some numbers. If I lock the numbers row, punctuation, the `ZXCV` and `S` letters
in their standard positions, and then I move the `;` one row higher, like `Workman`
and `Colemak` do, I end up with the following results:

* Plain text tests: `~ 32%` improvement over `QWERTY` and `~ 4.5%` improvement over `Workman`
* Text + Trigrams: `~ 36%` over `QWERTY` and `~ 6.5%` improvement over `Workman`

The actual end layouts have same resemblance to each other and practically identical
in terms of performance.

In either case, regarding of all my fiddling with the mutation parameters, the
improvements show a logarithmic growth curvature and stop evolving by roughly
300th generation.

This is a completely expected behavior, and I think this demonstrates that we are
very close to the maximum possible optimizations in this area.

## The Beauty

As I have mentioned, although we are reaching the local maximum in terms of
optimizations, the result layouts still vary a bit here and there. At this point
I'm just collecting those results and trying to spot an actually good one among
them.

A few days ago I caught this beauty:

```
` 1 2 3 4 5 6 7 8 9 0 - =
  w h l d k q f u m ; [ ] \
   r s n t b y i e a o ' \n
    z x c v j g p , . /
```

It scored +4.393% improvement over Workman, and +31.281% over QWERTY. This is the
top of the line score in my system. But, even more interesting, it has an almost
perfectly balanced fingers utilization ratio:

```
Fingers:

8% 11% 14% 16% | 15% 15% 13% 8%

Hands:  L: 49% | R: 51%
```

In all those months of research, i have never seen anything this close to an ideal
fingers utilization balance!

Of other interesting features, I must note that the algorithm ended up placing
the vowels in one row, similarly how the CarpalX project did. Which, I really
liked; and I think it is a brilliant idea. Also, unlike `Workman`, I managed to
keep the `ZXCV` keys intact, as well as `S`, which is supper important to me. And
finally, unlike `Workman`, it didn't move the letter `R` off the home row, which
was skewing the keyboard feel for me.

This is just one of the results, but so far I'm really excited about it. By the
looks of it, this is a clear win over `Workman`, and it's done on Workman's own
conditions. Plus, we achieved this without breaking `ZXCV` in pieces.

That's about it for now. I'll keep working and see what else we can squeeze out
of this. Meanwhile, if you're interested in the guts of the project, you can find
it on GitHub: [keyboard-genetics](https://github.com/MadRabbit/keyboard-genetics)
