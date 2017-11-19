# Debunking Mono-repos

There's been a lot of noise lately about mono-repos on the internets. And it's
fine, we need to try new approaches to progress as engineers. But, funnily
enough, I also spend the last 6 months reworking an inherited mono-repo project
into a set of separate repos micro-services. And now I'd like to share my own
experiences and thinking around the decision to go away from a mono-repo
structure.

Before pulling the trigger, I've watched mono-repo presentations and actually
talked to some mono-repo advocates. If I had to distill their points I'd end
up with a list that looks somewhat like this:

1. the "management" is out there to get you. you should fight back
2. mono-repos are easier to navigate and maintain
3. mono-repos are easier to deploy
4. Google does it and so can you

So, let me voice out some of my opinions on those selling points.

## The Bad Management

The idea here is that apparently the reason why we have micro-services and small
repos is because non-coding management heard too many buzz words and are now pressing
down engineers to adopt those practices.

Let me state a simple fact of life here. If you create and re-enforce this barrier
between engineers and management, you're doing a very bad thing to your company.
You're demonizing people based on their skill set. Which makes your relationship
with co-workers impersonal and volatile.

A company's management and leadership often spend an enormous amount of energy
trying to break down silos and make communication possible. If you're being
dismissive to a co-worker's input because of their skill set, you're undoing
their, very important to company's health, work.

I understand this, no one like to be told how to do their job. But, this is how
growth happens, you embrace new ideas regardless of where they came from.
If you cannot pull this off, you're doing poorly as a knowledge worker.

Management is there to help you. And you need to learn how to work with them,
not to teach others how to fight "the man".

## Easer To Navigate And Maintain

This kind of makes sense. When you have a structure that looks like this:

```
mono-repo/
  project1/
  project2/
  project3/
  ...
```

You can go into each project codebase right there and see what's inside of it.
But, so does this:

```
company/
  project1-repo/
  project2-repo/
  project3-repo/
  ....
```

It's essentially the same structure. Except it's not. Every mono-repo project
i saw ended up pushing their cross-project resources into library folders. In
the end a project looks like a bizarre mix of cross-project requires, sym-links
and ad-hock grown libraries.

Yes, you have all your codebase on a display and immediately accessible. But,
when an engineer dives into the codebase there is no way to be sure about a
specific project's surface area. Unless you're intimately familiar with the
specific project code base there is no way of telling how and where it's
wired to. Every project is like a snowflake. This makes finding an answer to the
age old question "why my shit doesn't work" into almost inhumane exercise.

Compare this to the separate repos structure, where all dependencies are described
in `package.json` and `docker-compose.yml` files. Exactly in the places where
you'd expect to see them.

After the transition, pretty much every engineer on my team said that everything
became way simpler to understand and work on. Because there is just what is in
front of you.

### Bonus round: Maintenance

Now let's say you have a structure that looks like this:

```
mono-repo/
  project1/
  project2/
  project3/
  library/
```

All those projects depend on that one cross-concern library. Lets assume that
engineers also did the simplest thing and just required this library directly
into each of the projects.

Now, one day an engineer comes to you and says: _"i can make this library 60%
better, but it will need a bit of API change"_. You get excited, 60% - is very
good. But, the thing is: project1 is touched almost every day, project2 is touched
once a month, and project3 is written a year ago and was working fine ever since.

Now you find yourself in a bit of a pickle. Now you have to touch all the
three projects in order to update the library. Quite a bit of work. Also, what
if it's not going to work out? What if you'll have to roll back the changes?
You'll have to roll back all the three projects. This also includes deployment and
re-testing.

Now compare this to small repo projects, where your library is a standard package
behind a semver release cycle. You could push a beta version of the library and
try it on one of the projects. If it works out you graduate the library to a proper
release and will have flexibility around upgrading the other services. Like for
example schedule it for later for those projects that have less churn. If it
doesn't work out,  you just scrap it completely and two other projects don't even
need to know that anything happened. Easy, right?

### Bonus round: Analytics

That's one of my favorite. I like code analytics. I like them a lot. Long story
short, I believe that improvements based on objective measurements are way better
than those made based on the gut feelings. Like many others, I fanatically run
test coverage, cyclomactic complexity and potential vulnerabilities counters
on most of my production projects.

Unfortunately, mono-repos complicate this process to the degree where it becomes
almost impossible to use. The reason being is that services like codacy, code
climate and such are focused on a single repo stats. Making a mono-repo to stitch
with those services requires quite a lot of workarounds and custom scripting
to report data. And, if got forbid, you've tried a different language in one of
the projects, it will be impossible to get some of the analytics in isolation.

Meanwhile in the single repo land, it's just plug and play. Most of the CI tools
are easy to integrate out of the box, no custom scriptery necessary.

## It's Easier to Deploy

Well, yes and no. Yes, mono-repos are easier to deploy if you're deploying via
ssh like it's still 2010 out there. If you're using custom scripts and run the
deployments from you machine "in one go" then yes it easier.

Meanwhile, if you're living in 2017 with the rest of us, and you deploy your
micro-services with CI/CD tools, mono-repos will make you flip the tables until
every one of your snowflake deployment scripts will have at least half a dozen
`../` strings in them.

When it comes to deployment, mono-repos push you into the mindset where you need
to see the entire repo as a single app, and deploy all those bits and pieces
at the same time. This is unsustainable if not damaging in a micro-servicers
environment. Because you see the app in it's entirety the boundaries between
individual services are blurred and you end up trying to keep all the pieces
in the air during the deployment, bound to land with everything in its place
every time. Which, depending on the complexity of an app, can be a lot of drag.

On the other hand, if each of your services live in an individual service, all
you need to care about is shipping this specific small piece. This allows for
simplicity and standardization. 90% of services in my current project have a
`Dockerfile` that looks like this:

```
FROM company-name/node:latest

COPY ./package.json /app
RUN npm install

ADD . /app
```

Simple, clear, no external wires attached. In fact the deployment setups become
so simple and standardized that we have removed them all together and just generate
the configs directly with buildkite when needed.

No scripts no cry.

### Bonus round: Tasks Breakdown

One of the caveats of having the "deploying the entire app" mindset is that it
makes you sloppy with your planning and execution. Because it's so easy to update
several services in one commit, you're not pressed into thinking about delivering
those changes separately.

On the one hand this makes sense and allows for combined changes. On the other,
this creates bottlenecks and situations where "i'll do all those things in one task"
a norm. As the result, developers don't collaborate and deliver bits and pieces
of features in parallel. Instead of that they go on epic journeys that deliver
massive amounts of cross-system changes in several days. This not just blocks
everyone else who waits on the epic journey to complete, it also makes it next to
impossible to have an effective peer review strategy.

If you ended up with a 2 meters tall PR that touches 5 services, there is no way
of telling what the outcomes of merging this thing will be. Which means no
continuous delivery, hello staging servers and manual QA. Just like in 2010.

I'm not even talking about effects of this behavior on the business and delivery
planning.

## Google Does It

I'm not going to even start on the whole "you're not Google" thing here.

But, I have a theory. What if Google started not with GIT, but with CVS. What
if they started using version control systems 20 years ago. And they didn't know
how to do it well, because the modern best practices weren't there yet. So, they
did the simplest thing and placed everything in one repo.

Over the years this repo grew. The company grew as well; and not just locally, but
also across multiple countries. And as they grew, this decision to have a single
repo became such a huge technical debt that it became impossible to rectify
without too much loss and pain.

What if the mono-repo at Google is just a glorified technical debt that they have
no capacity to deal with, and they simply decided to call a feature instead?

In this case, what your following the Google decision makes you then? Aren't
you just cargo culting yourself into the oblivion while calling it a win based
on random scraps of benefits?

## Conclusion

You can call me biased here, because i've made the transition from a mono-repo
into a multi-repo structure. But, you also could say that I've seen the both
sides personally, and i can compare the two.

You're free to disagree. My opinion is that you can make mono-repos work if you
want to. But, you will do this at the expense of everyone else who will have to
build workarounds and custom scaffolding to support your decision. And there are
basically two situations in which this could be possible: either other affected
people didn't know better and let you roll with it. Or, they were vocal, but you
gave them enough shit so that they'd shut up and do what you want.

To me, mono-repos are very dev-centered approach. Like "i want this because google
does it, and i don't care about everyone else building workarounds". I'm always
up for trying new things, but at the same time, I think there are way more
interesting problems to solve than folders structure. This part needs to be as
standard and boring as it can physically be. And, if you're creating a point of
friction out of this, that's a sub-optimal solution.

Piece. I'm out.
