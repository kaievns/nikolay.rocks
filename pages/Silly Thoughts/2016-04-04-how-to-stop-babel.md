# How To Stop Babeling And Start Enjoying NodeJS

Like many of you, I had also been bitten by the [babeljs](https://babeljs.io)
bug. The promise is actually pretty neat: have all the futuristic twinky dinkies
right now and deploy them anywhere. Just jack in a `postinstall` hook and it
will be all magic and unicorns from there. Destructurning, async/await, default
parameters all the really nice things will be just waiting to be used for good
and awesome.

The truth is, I kind of grew cold to it. Babel is great and a really impressive
piece of work, but, I feel like it robs me of what I really like about #nodejs;
its simplicity and nimbleness. I always loved how fast node is. How easy it
is to prototype with. You just `npm init`, throw couple of packages together
and you have a thing.

## The Problem

Babel touches pretty much every step of a development process in node. And being
in this position it adds overhead to pretty much everything you do. Have source
code? Now you have to compile it and add an extra thing to worry about in production.
Have tests? Yeah, you need to figure how to stitch it together with your babel
build pipes. Use eslint? You need the `babel-eslint`, etc, etc.

And the problem grows like a snow ball. Now you have an extra thing attached
to everything you do. And there are several ways to setup every one of them. Do
we call it `npm run build` or `npm run compile`? Do we precompile things in dev
or we use `babel-node`? The list is goes on and on.

It got me thinking. What do I actually want from babel? Can I survive without
those features? Which ones can I have without babel, like maybe with `--harmony`
flags? Turned out the answer was: "not that many", "yes", "most of them".

Allow me to walk you through the cases.

## Block Scope Variables

I really, really like the new `const` and `let` markers in #javascript #es6 edition.
It is such a nice way to give yourself a hint what supposed to change and what's
not. Plus, being a block scope variable (or a constant) it allows the javascript
engine to perform various optimizations on your code, and, potentially, save
you from wicked bugs from var names leaking out of a scope.

Turned out, you can have it in NodeJS right now. Just add `"use strict";` on
top of your file and it will handle block scope variables really nicely and
efficiently. Or, if you're too lazy for touching every file, just run your node
like this `node --use_strict blah.js` and it will force strict mode to all your
files in the runtime. Which is the way I prefer to do it.

Interestingly enough, if you were sloppy and just jacked `es2015` preset into
your babel config, it will pretty much convert all your carefully marked consts
and lets into good ol' `var`. In which case you will just delude yourself into
thinking that you're doing the right thing.

## Destructuring

Destructuring in ES6 is awesome. It has pretty much the same effect on your
programming as pattern matching, but without you feeling smug about it. I would
still prefer to have a real pattern matching engine in JavaScript some day, but
right now it's just about destructuring objects and arrays.

Turns out that node already has the `--harmony_destructuring` flag available,
which turns on the native support for destructuring operators. And if you think
of it for a second, it is actually a much better option than doing it with
babel. Because babel does it manually through javascript and harmony does it
natively in C. So, it is much faster in node than in babel.

## Default & Rest Params

Being someone who flips between ruby and javascript all the time, I really find
the default and rest params syntax useful. I liked it very much that babel allows
me to be in a similar mindset between languages.

Well, actually, there are `--harmony_default_parameters` and `--harmony_rest_parameters`
options in node right now that flip native support for those features. There
is also `--harmony_spreadcalls` to spread arrays into args when you call functions.

And the same argument goes for this as for the destructuring feature. Native
support is much faster and more likely being carried over in its current
implementation to the future versions than what is in babel.

## Spread Operators

I really like spreads. Actually, recently, I become somewhat of an amateur
artisan peanut butter maker. I freshly roast my peanuts, then use raw unprocessed
honey and himalayan salt. So, good... (see what i did there?)

Either way, you can turn on native array spreads with the `--harmony_spread_arrays`
flag. As the name implies, at the moment, it only does arrays. But, you know what?
I really don't mind `Object.assign`. More of that, I kind of like it, because unlike
the spread operator, it doesn't explode when one of the arguments is a `null` or
`undefined`.

Plus, there are the harmony `rest_parameters` and `spreadcalls` that accompany
the spreadness of the experience. So, you mostly can have native spreads right
now.

## Async/Await and Stuff

This was one of the primary driving forces behind me really wanting to jack
babel in pretty much every project i've been working on. It makes it so much
easier to deal with async control flow. It makes all your code more maintainable
as well. And the best thing, you can mix it with pretty much anything that talks
promises!

But, guess what. Babel, when set up properly, just converts all your async awaits
into `function *() { yield }`. You can have exactly all the same results right
now with generators and `yields`. It is mind bogglingly fast and production
ready.

You can use generators with expresjs by pluging in the
[express-yields](https://www.npmjs.com/package/express-yields) package:

```js
app.get("/users/:id", function *(req, res) {
  const user = yield User.find(req.params.id); // <- some Promise from an ORM
  res.json(user);
});
```

And mochajs can be used with generators directly when combined with the excellent
[co-mocha](https://github.com/blakeembrey/co-mocha) package:

```js
it("allows to access a user's data", function *() {
  const response = yield server.get("/users/123");

  expect(response.status).to.eql(200);
  expect(response.body).to.eql({id: 123, username: "nikolay"});
});
```

Moreover, yields are actually so much betterer than promises when things
come to errors handling. Raise your hand if you were in a situation where
someone forgot to add a `.catch` section to a promise and all errors went unnoticed?
Yeah, I think we've all been there. Doesn't happen with generators.

And yet more of that, generators unlock other features that are a total pain in
the butt with Promises. For example when you need to process a bunch of async tasks
sequentially. Or, for example, try to write an async `while` block in Promises.
It is a lot of fun.

Just open your heart to generators, it will worth your while. After all Promises
don't go anywhere, you can mix and match them with generators too and have best
of both worlds. But, you don't need async/await to get there.

## ES6 Module Imports/Exports

You can't have them in node at the moment. I know, a bummer. But, you know what?
I'm okay with that. Destructuring gives me almost all the same thing:

```js
const { blah, blah } = require("./blahs");
```

This is not that far from

```js
import { blah, blah } from "./blahs";
```

Totally survivable and a good exchange for lack of overheads babel adds everywhere.

## Final Thoughts

Recently I have converted several of my medium sized nodejs projects from babel
to node+harmony. Surprisingly, the transition went really smoothly. Well, I had
a good tests coverage in all of them to back me up. But, I was surprised how
trivial it was and how much faster and more pleasant the projects become after
the transition.

I know I'm off the hook now and I'm not doing back. I can have practically all the
same things I have with babel in a fast native form directly in node. My
dependencies list shrunk several times. Deployment become trivial — it's just
the good old `npm start` now.

One thing though. All those harmonly flags is a bit of a drag to carry around. I
really wish node had some sort of a `.noderc` file where I could specify all those
flags in one place and then just call plain `node blah.js`. But, still it is
a small price to pay for the returned agility and nimbleness of a pure nodejs
project.

And that is pretty much all I have to say on the subject.

Love & kisses. Nikolay

PS: I'm really stocked about Node 6. Apparently a good half of the features that
I need will graduate to be production ready. Plus thar be Proxies!
