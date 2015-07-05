# How To Patch Response Body in Connect Server

This thing took quite a bit of tinkering to figure out. And apparently
some other folks also struggle with the ins and outs of the problem as well.
So, today's topic is _"how do you patch response body in #nodejs connect
server middleware?"_

## The Problem

I quite like [connect](https://github.com/senchalabs/connect) server.
It's just a very simple thing that allows you to bolt middleware on
top of the stock `http` server in #nodejs. It's super lightweight,
fast and easily extendible.

But, the problem is that it's an one direction pipeline. If some
piece of middleware piped some data into the response and called
`res.end()`, your own middleware won't have an easy way to modify that
response.

For example, `nikolay.rocks` is built with [react](http://reactjs.com).
And I'm kind of being naughty and rendering the whole app directly into
the `document.body`. So, when [gulp-connect](https://github.com/AveVlad/gulp-connect)
injects the livereload script, it embeds it on the inside of the `BODY`.
But then the react app completely wipes the `BODY` content and and breaks everything.
Hence I needed to post-process the response body and move the livereload
script outside of `BODY`.

## The Solution

To solve the problem you'll need to inject a middleware into the
connect's pipes.

```js
connect.server({
  root: "./",
  // other prams
  middleare: function() {
    return [
      super_patch // <- that's our middleware
    ]
  }
});
```

The `super_patch`, as any other connect middleware will take three params
`req`, `res`, `next`. The trick here is to re-wrap the `req.end` function
with what we need. It looks kind of like that:

```js
function super_patch(req, res, next) {
  var real_end = res.end;

  res.end = function(string, encoding) {
    if (string) { // can be undefined on 302, etc. requests
      string = string.replace(/mighty hacks/, 'MIGHTY HACKS');
      res.setHeader('content-length', Buffer.byteLength(string, encoding));
    }

    real_end.call(res, string, encoding);
  };

  next();
}
```

That's pretty much the whole solution. But there are two important things
to keep in mind thought. Firstly, the `string` can be `undefined` in some
cases; for example a redirect or a `HEAD` request. Secondly, you need to
set the `content-length` header with the new content size, because it's
set to the original by default. A mismatch might make the browser to hang
waiting for more data from the server.

Needless to say that it's quite a naughty thing to do and it might break
some content for you. So, in a real life situation it might be a very good
idea to scope the hack by checking the `req.url` or response content type
before applying the patches.
