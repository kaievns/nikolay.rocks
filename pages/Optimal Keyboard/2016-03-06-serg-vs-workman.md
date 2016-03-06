# Keyboard: Genetic Mutations and The Serg

After getting the keyboard model and hands movement analytics somewhat working,
I started to work on the genetic algorithm part of the project. And interestingly
enough it started to yield some results straight away.

Genetic algorithms are kind of fun actually. In a sense it is a way to brute
force a problem when you don't know how to tackle it. It works kind of like that:

Firstly, make a way to sequence a solution. Kind of like DNA. For keyboard
layouts I, obviously, just used a string that has all the keys in it in the
right order. Like `qwertyuiop[]...`.

Secondly, an algorithm generates a set of random solutions, or keyboard layouts
in this case. This set is called a `population`. There are books written on how
to seed the first population the right way, but I just randomized things.

Thirdly, you grade your population by their fitness to a certain criteria. Again,
there are books written about doing it the right way. But, at the moment, I just
measured how far a user can type the same text on a given cap of effort.

Fourthly, you pick two champions out of the list based on their performance. Yeah,
there are books written on how do it the right way. I used the simplest algorithm
that picks two best out of a random half. That is known as `tournament selection`.

Thirdly, you mate those two to produce an two offsprings. Like say you have a
parent `AAAA` and `BBBB`, then you end up with `AABB` and `BBAA`. But, it is not
that simple, and yes, you guessed it, there are books written on this subject.

Finally, you create a bunch of random mutations of those two children to fill
up a new population and take it to the step three.

So, in a sense a genetic algorithm is kind of like a guided evolution. You take
the best, you mutate them and try to find a better match to your fitness criteria.
It requires a bit of fiddling with mutation levels, matching and mating algorithms,
but it works!


## The First Results

My first implementation is built in JavaScript, obviously. It is a good language
for prototyping and it is decently fast. And although it is a bit outclassed in
terms of raw performance, this first solution started to spit out results. More
of that, those results outperform the `Workman` layout every time!

In the last couple of days I saw a whole dozen of those. For example, meet the
*ZERG* layout! I call it zerg, because it has the letters `serg` in the home row,
and it is kind of funny. Because [zergs](https://www.google.com.au/search?q=serg&client=safari&rls=en&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjbmsG7tqvLAhUGJpQKHbEmCiQQ_AUIBygB&biw=1280&bih=735#tbm=isch&q=zerg).
Anyways:

```
` 1 2 3 4 5 6 7 8 9 0 - =
   y h p d k q f i u w [ ] \
    l s e r g ; t a o n ' \n
     z x c v j b m , . /
```

In a plain text test it beats the `Workman` layout by a significant margin

```
Running layout: QWERTY
Got to 1009018 symbol, distance traveled: 13034888
Fingers:  9% - 7% - 16% - 19% - 14% - 7% - 13% - 15%
Hands:                    51% | 49%
Overhead: effort = 1619945 , distance = 814451

Running layout: Workman
Got to 1143534 symbol, distance traveled: 11240967
Fingers:  9% - 9% - 11% - 16% - 13% - 13% - 12% - 17%
Hands:                    45% | 55%
Overhead: effort = 1130738 , distance = 564065

Running layout: SERG
Got to 1171142 symbol, distance traveled: 10982540
Fingers:  7% - 9% - 16% - 12% - 14% - 13% - 11% - 17%
Hands:                    44% | 56%
Overhead: effort = 1101567 , distance = 529761
```

And it holds its grounds in the most popular trigrams test as well:

```
Running layout: QWERTY
Got to 1190869 symbol, distance traveled: 15805693
Fingers:  8% - 4% - 19% - 28% - 26% - 9% - 6% - 0%
Hands:                    59% | 41%
Overhead: effort = 1787971 , distance = 794957

Running layout: Workman
Got to 1673070 symbol, distance traveled: 10901207
Fingers:  8% - 6% - 22% - 22% - 13% - 17% - 4% - 9%
Hands:                    58% | 42%
Overhead: effort = 0 , distance = 0

Running layout: SERG
Got to 1654773 symbol, distance traveled: 10910465
Fingers:  3% - 18% - 16% - 14% - 18% - 17% - 5% - 10%
Hands:                     50% | 50%
Overhead: effort = 0 , distance = 0
```

The fun thing though, this algorithm spits out different layouts like *ZERG* on
almost every run. Some of them are alike, some of them different. Some go further
some don't. But it manages to find a layout that jumps over the `Workman` score
every time, which proves the principle I think.

## Further Steps

Well, the algorithm is far from being finished. It only optimizes for efficiency
at the moment. I also need to teach it to account for more equal hands utilization,
perform better at the most popular trigrams test, figure more efficient ways
to produce mutations and so on.

But, the real bottleneck at the moment is raw performance. In order for the program
to run in an acceptable time frame, I had to significantly limit the size of the
text samples. I had to use a relatively small `20` items population sizes. And
I can't get past couple of hundreds of generations.

In this environment I just can't feel the bottom of it. The program keeps spitting
out different layouts every time. Although they are good and start to show some
similarities, there is no way to tell how far we can push it. Plus, I need to
be able to process much larger pieces of text in order to accommodate for a
wider range of use cases.

Long story short, I'm reworking the grading part of the project in Rust now. I
always wanted to learn the language and I think now is the good opportunity to
do that. As it is a relatively new thing to me, that might take a bit of time
I think.

I guess that is it for now. I'll keep you posted.

Oh, and if all this nerdiness sparks something within you, you can follow the
project on GitHub [keyboard-genetics](https://github.com/MadRabbit/keyboard-genetics).
Give it some stars too!
