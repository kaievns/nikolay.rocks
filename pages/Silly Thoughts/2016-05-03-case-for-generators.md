# A Case For ES6 Generators

For the last couple of months I was slowly converting all my #nodejs projects
from babeljs to pure #javascript. I also [was advocating](/2016-04-04-how-to-stop-babel)
other humans to do the same thing. What's interesting is that
[ES6 generators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*)
kept coming back into discussions. So, I thought I'd write about it and present a
case in defense of generators.

I find it fascinating how JavaScript community works. The real difference between
a JavaScript developer and everyone else is that everyone else thinks: "JavaScript
sucks, I'll use something else", and a JavaScript developer thinks: "JavaScript
sucks, lets write a library to make it better".

We have been doing this for a long long time. Starting with [dojo](http://dojotoolkit.org)
and [PrototypeJS](http://prototypejs.org) and finishing with the modern
JSX/BabelJS environment, we always had this "fuck the language" attitude towards
JavaScript. In fact we become so good at this, that we began to skip on anything
that seems remotely confusing in the language. Like prototypes delegation or ES6
generators.

The thing is though, Dorothy is not in Kansas anymore.

NodeJS 6 has been shipped with 95% of the ES6 spec support. This event has
finally graduated JavaScript from being a limited thing that need constant patching
to an actually good and useable out of the box language. (hooray everyone!) So,
in this light I think we need to revisit ES6 generators and make them a widely
accepted feature.

## What Is A Generator Anyways?

Let's recap what generator functions actually are. They can be pretty confusing
at the beginning, but it boils down to pretty much the following:
```js
function* thing() {
  yield 1;
  yield 2;

  return 3;
}
```
Generator is a function that will pause itself at `yield` calls, wait for an
operation to be completed and then resume its course.

Where the whole confusion about generators come from is that you can't just call
it as a normal function. When you call a generator it returns _an iterator_.
```js
const t = thing();
> t
{} // <- an iterator object
> t.next()
{ value: 1, done: false }
> t.next()
{ value: 2, done: false }
> t.next()
{ value: 3, done: true }
```
The main point here is that a generator function can't work on its own. It needs
some external piece of code that will iterate through all the `yield` operation
breaks in order for the function to complete its run.

That is the whole thing to it. The only trick here is that a `yield` can take
any normal value like a string, number or an object, but it also can resolve a
`Promise` or another generator:
```js
function * something() {
  const user = yield User.find(123); // some ORM that returns promises
  const result = yield someLogic(user); // another generator
}
function * someLogic(user) {
  return yield "blah!"; // <- plain value
}
```

## The Source Of Confusion

There are normally two main conclusions people draw from their experience with
generators:

Number one is: _"generators need some external thing to work. it's just too hard"_.
And the second one is: _"a generator returns an iterator, therefore they are for
iterating through sequential data and we're just abusing them for async control
flow"_.

Whatever the case, after the first encounter with generators people usually
fall back to the "fuck the language" mode of operation and use Promises for
control flow.

But, lets actually think about those claims again:

First, _"generators are too hard, they need something else to drive them"_. Well,
lets look at a `Promise` as the fallback solution:
```js
const promise = new Promise(function(resolve) {
  thing((err, result) => resolve(result));
});
promise.then(() => { .... });
```
Doesn't it look like this?:
```js
const promise = something_that_handles_callback(
  callback(callback());
);
promise.handle(final_callback());
```
The way I look at it, a promise is an external handler for your _callback_. The
core logic is described in the callback function and a promise is an interface
around it to call the function asyncly. So, isn't it kind of the same as this?:
```js
const thing = co.wrap(function * () {
  return yield somePromise();
});
thing().then(() => { ... });
```

Second, _"generators are actually for iteration as they return iterators"_. I can
certainly understand how generators could be seen this way. But, I think that is just a
surface and the problem is a bit deeper than that. The core issue here is the
nature of JavaScript itself.

I actually think that generators is a really smart solution for the async control
flow issue in JavaScript. Yes, a generator returns an iterator, but that is a
necessity due to JavaScript's single threaded nature.

If you have a single thread and you have a piece of logic that needs to stop and
resume several times during it's course, it only makes sense to make it an iterator
so that something else could iterate through those stops and have an opportunity
to handle each result individually.

Overall, generators are not abused iterators. Generators are an ingenious solution
for the async control flow issue in a single threaded environment. The iterative
aspect is just a side effect of it, which can also be used to, well, asyncly
iterate through things. Which is often really useful. Besides, those are not
exactly orthogonal issues.

## The True Nature Of Generators

I think generators and developers started on a wrong foot. And the reason for that
is because we thought that they both allocate the same space of handling the
async control flow and hence suppose to rival against each other. Which is
completely wrong in my mind.

Allow me to offer a different point of view on the whole situation.

Consider that a Promise is a value in future. In a sense it is just a variable,
like say a number or a string, but it only resolves its actual hidden value in
the future.

And consider that `yield` is just a control flow keyword. It is a thing, just
like `if`, `else` or `for`, but it is for async operations that happen in the
future.

If you look at them this way, you can see that they are not actually rivals.
Promises and yields complete each other. They were meant to work together just
as regular variables and `if/else/for` control clauses. They are exactly the
same concept with he only difference that they're created for handling logic
that is distributed in time.

In a sense Promises and yields have the same purposes that threads and mutexes
have in other languages. But they don't operate the same way due to the
single-threaded nature of JavaScript.

## What Generators Can Do For You

> Don't ask what you can do for generators. Ask what generators can do for you!

Actually a lot. When you switch your async control flow from Promises to Promises
and generators, you basically switch from the "fuck the language" mindset to
"hmm... this language is actually pretty good now" one. It just makes everything
you do much less confusing. Things just start to click together.

My favorite example is async testing. Let's look how it is normally done with
pure promises:
```js
describe('JSON API GET /thing', () => {
  it('must return correct data', () => {
    return api.get('/thing').then(result => {
      expect(result.status).to.eql(200);
      expect(result.body).to.eql(THE_RIGHT_THING);
    });
  });
});
```
It looks simple enough, but, as a developer, you normally would read it like this:
_"Ok, it seems that we're returning something. Why? What should we return? Ok, it
seems that we're returning a Promise—lets pray that the other end will do the right
thing with it. Ok, what happens when it resolves? Apparently it returns a response
object."_

_All_ that thinking process happens within your brain every time even before you
start to understand what the hell you're actually testing here. Compare that
to a generator version:
```js
describe('JSON API GET /thing', () => {
  it('must return correct data', function* () {
    const response = yield api.get('/thing');

    expect(response.status).to.eql(200);
    expect(response.body).to.eql(THE_RIGHT_THING);
  });
});
```
This reads like so in my brain: _"So we're GETting a /thing waiting for a
RESPONSE and then making sure that it has the right status an body."_. Feel the
difference?

Let's look at an `express` + `Promise` example:
```js
app.get('/thing/:id', (req, res) => {
  Thing.get(req.params.id).then(thing => {
    if (thing) {
      res.json(thing);
    } else {
      res.status(404).send('nope');
    }
  });
  // oh someone forgot to add a .catch(next) clause here
  // so we will never know when the whole thing explodes
});
```
Compare this to a `express` + `express-yields` version:
```js
app.get('/thing/:id', function(req, res) {
  const thing = yield Thing.get(req.params.id);

  if (thing) {
    res.json(thing);
  } else {
    res.status(404).send('nope');
  }
});
```
Don't you think that the second version has significantly less noise and looks
more like an actual programming instead of a "fuck the language" hack?

## Conclusion

Well, I guess at this point you don't really need any further conclusions. I just
want to urge you to put aside the idea that promises and generators are rivals.
They're not. They are two different things and they supposed to work together.

Let them do their thing and it will change your life forever.

PS: Some of you are probably asking yourself: _"what about ES7 async/await?"_.
My answer to that is _"nothing"_. async/await is just a babel's shorthand for
`co.wrap(function *() {...})`. It uses generators internally and is basically
the same feature under a different brand. Let me reiterate this. Generators
are not the ugly limited brother of async/await. async/await is just a syntax
sugar for _one of the aspects_ of generators.
