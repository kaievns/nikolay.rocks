# How To Stop Worrying And Start Loving Exceptions

Here is the blunt truth. Whatever you are building right now will fail. It doesn't
matter how good you are at programming, it doesn't matter how many tests you
write. Somehow, somewhere, things won't go as you imagined them and your code will
fall on its face. That is the nature of software development.

There is a direct consequence of this problem. If you don't have a well thought
and articulated errors handling strategy at the beginning of a project you
basically failed as an engineer. This negligence will eventually consume your
time, time of the support engineers, ops, testers, it will affect clients and
hurt the business bottom line.

Don't get me wrong, I'm not trying to scare you and neg you into submission.
What I'm trying to do is to stress the importance of the issue and the cumulative
effect it has on teams. Here is a classical example: someone used promises for
async control flow:
```js
app.get('/something/:id', (req, res) => {
  Something.fetch(req.params.id).then(thing => {
    res.send(thing);
  });
});
```
Seems innocent enough, right? We all wrote something like this in our careers.
Unfortunately, lets say your persistence layer underneath `Something` throws
an exception every 10th time, what will happen? Well, the app will hang because
someone forgot to add a `.catch(next)` section to the promise. Happens to all
of us, right? We are just mortals after all.

But, what does this mean for a business? Well, firstly, until this issue is
resolved, depending on a case, as a business you will loose up to 10% of your
revenue. But, it gets worse.

Some of your loyal customers will try to communicate the problem to support.
Support will waste quite a bit of resources on this, because it only happens
every 10th time and verifying the problem will be tricky. Eventually, they will
push a ticket to the development team. Product owner will spend their time on it,
try to verify it several times, again. Then, depending on personalities in your
team and the quality of your process, this ticket will bounce back and fourth
between teams changing its status from `bug` to `can't verify` several times.
I've seen this happening anywhere from a day to several months. Which means that
in addition to loosing _revenue_ you will also burn your _resources_. This
innocent mistake will hurt your business twice.

An issue that happens only under some unclear circumstances and doesn't throw
and exception is one of the worst time wasters in teams. So, `rule #1` let it
crash! It is much more preferable that your app explodes and the user will be
exposed to a stack trace than an error being suppressed and never surface the
logs.

This is exactly the reason why you should never use promises for control flow.
Because we are just humans, we make mistakes. Use ES6 generators instead.
For example the [express-yields](https://www.npmjs.com/package/express-yields)
package. In this case, if a promise rejects, a `yield` will throw and the exception
will bubble up in the stack.
```js
app.get('/something/:id', function * (req, res) {
  const thing = yield Something.fetch(req.params.id);
  res.send(thing);
});
```
So, now when you have things crashing, comes `rule #2` - always log errors! If a
tree feel in the woods and no one put it on youtube, did it really happen?

You need to log your errors explicitly. Make sure your application code has
something like this:
```js
const express = require('express');
const routes = require('./routes');
const logger = require('./utils/logger');

const app = express();
//....
app.use(routes);
app.use(logger.errorsLog); // <- MUST HAVE!
```
Anything that falls through to the errors logger, _must_ be logged! It is half
of a solution to let exceptions to be surfaced. They also need to be saved and
accessible later. Whatever you do, you always have to be able to answer two
questions: "how often an error appears?" and "what is the metadata around the
failure?". Stack traces, user IDs, request parameters and headers, it all have
to be saved for future analysis!

Now when you let exceptions happen and you have a way to log them, comes
`rule #3`: stop babysitting your code! _do not handle_ exceptional situations in
your primary flow. For example:
```js
app.put('/something/:id', function * (req, res) {
  const [ thing ] = yield Thing.findAll(req.params.id);
  const data = req.body.thing;

  if (!thing) {
    res.status(404).send({ error: 'not found'});
  } else if (!thing.update(data)) {
    res.status(422).send({ error: 'failed to save'});
  } else {
    res.send(thing);
  }
});
```
this might not seem like a big deal, but this is actually pretty hard to support
piece of code. Half of the code is allocated for handling exceptional situations
rather on the main purpose of the function.

Now imagine this approach is replicated a dozen of times across your project and
you have a massive maintenance overhead on your hands. A much better solution
would be to let it crash:
```js
app.put('/something/:id', function * (req, res) {
  const thing = yield Thing.find(req.params.id); // <- throws DocumentNotFound
  thing.update(req.body.thing).save(); // <- throws UnprocessableEntity

  res.send(thing);
});
```
Once you have something like this, all you need is to create a piece of middleware
between your _routes_ and _errors log_, that will handle HTTP errors consistently
in one place:
```js
// ....
app.use(routes);
app.use(processHttpErrors);
app.use(logger.errorsLog);

function processHttpErrors(err, req, res, next) {
  if (err instanceof DocumentNotFound) {
    res.status(404).send({ error: 'not found' });
  } else if (err instanceof UnprocessableEntinty) {
    res.status(422).send({ error: 'bad data' });
  } else if (...) {
    ... other HTTP errors, like 401, 403
  } else {
    next(err); // <- pass the rest of the errors into the errors logger
  }
}
```
in this situation you have two major wins. Firstly, you have a single place
where you make decisions how to respond to a particular exception and whether
to log it. And secondly, you remove this responsibility off the shoulders of your
primary code base. This will make it much more simple and maintainable.

But, the most important result of `rule #3` is that you shift your mindset from
the one that basically says "my code never crashes", to the one that says "crashes
are the part of life and we take them as serious as out code".

## Conclusion

Admittedly, #javascript was conceived in times when browsers didn't even have
a development console. You actually had to put `alert(1)` in your code to surface
the errors. But not anymore. There is no excuse for not taking errors handling
seriously those days. And it will improve the quality of your dev life significantly
if you do.

Just remember that the safest and most maintainable code is not the one that
never fails. The safest and the most maintainable code is the one that has
failure as part of its operation. Your code shouldn't be bug free, your code
should be ready to handle any failure properly and consistently. Because that
what actually matters in the end: ability to quickly identify problems, fix them
and move forward.

So, don't try to avoid exceptions. That is a passive aggressive behavior. Embrace
them and be open about it, and they will change your life for better!
