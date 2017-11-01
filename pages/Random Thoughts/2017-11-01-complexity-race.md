# Software Complexity Arms Race

I suppose I don't need to explain what software complexity is. It's a daily
reality for most of software engineers, one way or another. Interestingly enough
though, most of us perceive complexity as a purely negative aspect of life;
like an endless uphill struggle. It probably is, but there is another aspect to
it, which I'd like to talk about.

> Excuse me sir, do you have a moment to talk about our lord and savior complexity?

Form the evolutionary stand point there are two types of arms races: symmetrical
and asymmetrical ones.

Symmetrical arms race is when individual members of a unformed group compete for
the same resources. Eventually, the members of the group reach some sort of
equilibrium between each other. For example this is the reason why trees in a
forest have more or less the same height. Or why #javascript frameworks require
roughly the same amount of engineer's frustration to build the same result.

Asymmetrical arms race is an escalation between rivaling groups. For example
between predators and their prey. For example with time passing by, cheetahs
were evolving to run faster so they could catch more antelopes. But, at the
same time antelopes were evolving to run faster away from cheetahs.

What's interesting in this second sort of arms race and escalated confrontation
is what's called [the red queen hypothesis](https://en.wikipedia.org/wiki/Red_Queen_hypothesis).
Although both cheetahs and antelopes evolve with time, and get better and faster,
the relative number of antelopes being caught doesn't really change.

> Now, here, you see, it takes all the running you can do, to keep in the same place.

Now lets jump back to our software engineering realities.

20 years ago, an engineer would most likely build a web site in perl + apache +
mysql by editing files directly on a physical web server over a FTP connection.
Gross right?

Those days we have all the fancy delivery pipelines and source control systems.
A good engineer would be building a web site with javascript + docker + CI/CD.
We've walked a long way away from our ancestors when it comes to tooling.

Now the funny thing is, 20 years ago it used to take roughly a week for an engineer
to roll something more or less decent out. And it still is.

We have advanced massively in frameworks, and readily available libraries. Our
CI/CD pipes are almost sentient. Surely, with all those advancements, we should
be light years ahead of our predecessors. But, just as with cheetahs vs antelopes,
the relative amount of "shit being done" stays the same.

Why?

If we walk down the red queen hypothesis path, this will imply that we have
some sort of an asymmetric arms race going on within our profession. And my
guess is that introduced software complexity is on one side of it.

My theory is that, as an institution, we're coping badly with complexity
management. Every time when more complexity introduced into a system, instead
of addressing the root of the problem, we're trying to mitigate it by advancing
our tooling. Which in turn allows room for more complexity to creep in.

Did you notice that most productive software engineers often build simply;
often times they're actually borderline scrappy. If you think of it for a second,
it seems like a workable strategy to sidestep the complexity vs. tooling arms race.

I've been trying to use this though as a yard stick for my technical decisions
lately. And the more I try the more it starting to make sense. We all love new
tech and always try to advance our skills and knowledge. But a fair amount of
this comes at a price. Surprisingly many new frameworks and libraries actually
come with the need for countermeasures to mitigate the introduced complexity.

I'm not going to name the names as to not sidetrack the thought I'm trying to
convey. And the thought is that not all complexity is equally bad, and therefor
shouldn't be seen as a uniformly negative aspect of our work. The real problem
starts when the introduced complexity triggers an arms race with tooling to maintain
the effectiveness. Because in this situation, despite of all the efforts, the net
result will probably stay the same, due to your capacity for frustration being
a constant.
