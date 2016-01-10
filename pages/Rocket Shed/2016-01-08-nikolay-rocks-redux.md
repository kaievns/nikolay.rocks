# Rebuilding Nikolay.Rocks with Redux

As [you might now](/2015-07-24-how-i-blog-now), this project, `nikolay.rocks`
is built as a fully static #react app. It doesn't really have any backend. It
is just a bunch of static files in markdown and a #javascript app that renders
everything on the front-end. And today I've shipped a major update of the app.

When initially I've built the thing roughly a year ago. It was my first experience
building a more or less large scale React app, so it was a bit of a trial and
error. I liked the concept of building a fully static blogging engine that will
fit into the way I like to write my texts. And the idea itself was that what
mattered most.

So, eventually it worked. I'm actually really happy the way it turned out. But
implementation was mostly revolving around React itself. The model part of the
app was a pretty much adhock bunch of callbacks and react state mutations. I
was obviously aware of #flux, but, at the time it didn't make sense to bring
in a more serious architecture as the logic seemed quite simplistic at the
beginning.

Time passed, I started to use the engine on some other projects. Bugs were
found here and there. Features were added as well. And slowly but surely the
model side started to become hard to maintain. The app begged for a major
refactoring. But, the thing is, I still didn't entirely like flux.

I mean, conceptually it makes total sense. And I fully agree that models are
hard and the way we normally do them with callbacks and stuff is a mess. I don't
particularly like class based approaches like Ember does either. So, flux seemed
like it was on the right path, but it still felt like a marginal upgrade over my
naive implementation. So here were the #redux appeared.

It kind of does the same thing as flux. But it is a functional, actor style
approach, which sounded perfect. So, I gave it a shot and rebuilt my engine
fully(-ish) in redux. And this post is a bit of a reference on my experience.

First, I must admit, it does scale very well. It is not a silver bullet, far
from it, but it does certain things very very well. And those certain things
are decoupling the app model from the views and breaking it down into small,
digestible pieces.

The really cool thing about flux is that you can sort of easily model your app
inner state and transitions without actually having any UIs, routers or anything
like that. You can completely focus on the state and transitions, and make them
do the right thing through and through in a minimal testing environment.

It feels a bit weird and quite a lot boilerplate-ish at the beginning, but it
really shines when it comes to bolting the actual UI on top of it. It really
gives you an opportunity to design your future app's model at the bird's eye
view level, and then simply bolt whatevers on top it with just a few mapping
functions.

The other cool thing is that the state becomes just an object that is pushed
through a bunch of mostly pure functions. This approach allows it really easy
to record and recreate any sequence of actions or state changes. As far as the
state consumer concern it is just a bunch of things in a plain object. Which
consequently leads to loosely coupled and easily testable modules.

The other great side-effect of redux is how async processing is happening. One
can easily wrap all the callbacks and async functions handling inside of actions.
And those actions will mutate the state through the same pipeline as everything
else. This way UI or any other consumer of the state doesn't have to know anything
about asynchronous stuff in the background. It truly does decouple actions from
UI delivering on what flux was aiming for.

As for negative parts, the reducers composition thing doesn't look as pretty
in real life as it does in the todo app demo. More often than not, parts of
your domain logic will depend on the other parts of the state tree. So, you will
have to build custom compositions for your reducers. Composite data handling,
like for example you want a value that is composed of two other values, is a bit
awkward at the moment as well. It can be dealt with in several ways, but it doesn't
feel as solid as the rest of the concept.

And relationships between redux and react are somewhat passive-aggressive as well.
In a sense redux kind of a thing of its own and it basically pushes you towards
not using react components state at all. It's great, but it doesn't make much
sense in case of really tiny things, like binary flags that are used only within
a certain component. Another is the redux-react connector is kind of a hack and
comes with an overhead. I would actually prefer redux to be some sort of a
replacement for the `state` property on react components instead of it being
an external system that you have to bolt on top components. But, maybe that's
just me clinging on an old habit.

Overall I like it. I like it a lot, and I would most definitely use it for real
life applications. It makes things a lot more simpler and maintainable and
testable through and through. Don't mind the boilerplaty feel of it at the
beginning, it will pay off later when things start to get more complicated.
