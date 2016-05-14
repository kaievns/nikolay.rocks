# Technical Debt vs. Technical Disappointment

For the last 6 month, a friend of mine and I were working on a project that
focuses on measuring efficiency of software development teams. We've spent
endless number of days contemplating about the principles that make a great dev
team. We also talked to a good number of people about those ideas.

Interestingly enough, practically in every discussion, sooner or later, someone
would bring up the concept of a technical debt. And it is a painful topic, so
there is a lot of thought floating around. But, the interesting thing is, that
many people see the idea of technical debt differently. It is like agile methodology,
everyone has a slightly different way of conceptualizing it.

There problem here is that many development teams have this bucket they name
"technical debt" and they throw there pretty much everything that causes a
slight discomfort or friction. They basically say: _"yeah, we need to keep moving
and we deal with it later"_ and keep tossing everything into that bucket.

This seems sensible at the time. But, pretty quickly that bucket becomes a trash
bin. Raise your hand if you have a label named _Technical debt_ in your JIRA
project, and it serves as a place where tickets go to die. Don't be shy, you
know you have it!

If you are not careful and don't invest time to understand the nature of technical
debt, pretty soon it will become a form of therapy in your team. It will become
a place where developers come to complain about life and then return to their
daily routines doing the same thing over and over again. In a sense, it turns into
a coping mechanism, a label for everything bad that happens to the developers.

Allow me to offer you a slightly different point of view on the problem.

We are using the word "debt" for a reason. Technical debt is the same as a financial
form of debt. Like, for example, you borrow some money from a bank to buy a car.
The key principle here is that you're getting _a car_ to commute or for whatever
practical reasons you might have; and you pay your credit off later.

Imagine now that you're borrowing a lot of money from a bank to buy a car to
get you somewhere. But, instead of getting a good practical car, you spend the
money to buy a trashed clunker that dies on you every 5 kilometers. Yes, technically
you still owe the bank, and it is a form of debt. But, instead of having a proper
vehicle to get where you need to be, you bought a source of constant disappointment.

We can extrapolate this problem to technology. You can cut a corner to get where
you need to be faster, but there are different ways of doing this. Some of those
ways will get you into a position where you can repay the debt later, others will
lead you to the place which we call "technical disappointment".

For example. Using a less sophisticated authentication system at the beginning
of a project development is a good type of technical debt. You don't really
need to have anything fancy at the start line, you just borrow this time and spend
it on useful features. Later when your project generates revenue, you can come
back to the problem and reimplement the authentication process in a proper way.

On the other hand, if you say something like _oh, i'm not gonna write tests
for my code because it slows me down_, this is an equivalent of borrowing money
from a bank to buy a rusty clunker that will fall a part before you ship your
alpha. You are borrowing time (and money) to buy a constant source of disappointment.

The difference between technical debt and technical disappointment is the
practicality and the final efficiency of a team. If you successfully made a
senior developer to stare at a really bad piece of code for 2 hours before he
decides to touch it, you have a huge problem on your hands.

Technical disappointment is by far the most costly form of technical debt. No
one will want to work with it. Developers velocity will fall to the ground, but
those still will be billable hours and you will have to pay them with real money.
Developers will leave, because they have better things to do with their lives,
and you will have to hire new ones. Which means you will pay HR and pay to retrain
the new people to work with your code. Meanwhile your delivery schedule will suffer,
your clients will get displeased and your investors will get tense. I think you get
the picture.

So, to summarize the idea. Technical debt is part of the nature of running a
software project. There is no way around it, and it can be a very practical choice.
But, you need to be smart about what you're borrowing the time for. It is okay
to borrow by building less complex features or use less maintenance heavy technology,
so you could focus on the core value of your product. It is never okay to borrow
by cutting on good practices, code quality and testing. Because updating and
extending a well built existing solution is a vastly more efficient process than
trying to patch and salvage a substandard one.
