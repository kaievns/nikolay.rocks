# The CarpalX Project

While I was digging around on the Internets about the new developments in the
keyboard layouts optimization area, I inevitably run into the
[carpalx project](http://mkweb.bcgsc.ca/carpalx/?home), which is one of the
most solid projects in the field at the moment. They invented a set of metics to,
well, measure performance of different layouts and stuff. So, I thought I should
write it down.

Now, carpalx obviously not the first project that tried to do analysis of
typing effort. The problem though, there are plenty of ways to go about it. In
most cases layout analyzers are focused on overall travel distance and rows
utilization. If you need an example check [this](http://patorjk.com/keyboard-layout-analyzer).

The problem with those projects is that they measure mechanical things. It is
in a way like measuring a car drivability by measuring it's speed. Traveling
distance is obviously important, and equal hands utilization important too,
but those are just flat metrics. They don't make the necessary effort to walk
the final step and draw the actual conclusions out a jumble of numbers.

And, the carporalx project is exactly about that. They took a whole bunch of
similar measurements and devised a system to judge the typing effort of different
keyboard layouts. Check out [this page](http://mkweb.bcgsc.ca/carpalx/?popular_alternatives)
where they had posted analysis of the most popular keyboard layouts.

They split typing effort in three categories "traveling distance", "penalties"
and "stroke path". And it makes total sense. We obviously can improve upon QWERTY
in terms of traveling distance, because it is horrible at that. But, that doesn't
make such layout automatically good. The example is Dvorak, which was optimized
for traveling distance, and yet it has as much penalties as QWERTY. I think
that is the reason why many don't feel Dvorak to be an overall improvement over
QWERTY.

After they done the analysis, they obviously tried to create a new layout.
Which is what it is all about right? After some trials they created a set of
[fully optimized layouts](http://mkweb.bcgsc.ca/carpalx/?full_optimization),
which seem to greatly improve on top of both colemak and workman.

I particularly like their QGMLWY layout. Just like Colemak it keeps the ZXCV
keys in place, but it also has the S and Q where they are on QWERTY. That's great!
Also, I find it interesting that they had moved all the vows to one side and
syllables to the other. I bet it helps alot with hands alteration.

![](http://mkweb.bcgsc.ca/carpalx/images/qgmlwy.png)

So, my thinking is that if I take that as a basis and apply the
[programmer layout](/2015-12-28-programmers-layout) optimizations to it, the
end result might be very interesting. Also, I'm quite keen on swapping `[]`
and `{}`, so I didn't have to press `shift` in javascript all the time :)

The funny thing is that the deeper I fall into this rabbit hole, the more I'm
becoming okay with having a fully custom keyboard layout on a computer. I kind
of started with Colemak because it seemed fairly standard. Then Workman, is not
so much, but still useable. Now I'm starting to think that popularity of a layout
doesn't really matter. You won't find your layout on someone else's machine
anyways. The edgier the thing the better, because in the end what matters is
the quality of an idea.
