# Connect Webpack Dev Server to Backend API

Webpack is alright. Maybe not exactly my cup of tea, as it has a strong
configuration flavor, but it does what it supposed to and it does it well. Besides
if you want all the #react hotness you need #webpack. The problem that I run
into though, is how on earth do you connect the webpack dev server to the
backend API server and make them run together? It took a bit of time to figure,
so maybe this will help someone.

## The Problem

The problem goes somewhat like this. Webpack dev server is kind of a thing of
its own, it can serve static assets and it is pretty good at it. But it is
designed for working on the front end code and generally gives zero worries about
the backend server that runs your JSON API or whatevers.

You can kind of run the webpack dev server on its own. And, you can run your
backend server on its own. But how to run them alonside? Two separate tabs is
kind of okay, but substandard as you will have to mangle with ports and stuff
manually across your app. Besides you probably want to make your backend server
to serve whatevers webpack builds in the end, right?

## The Principle

There are few things we need to understand in order to make it click. Firstly,
webpack dev server is what serves stuff your browser, but in the background
_it can proxy all missing requests_ to something else. Look at the following code:

```js
import webpack from "webpack";
import config from "../../webpack.config";
import WebpackDevServer from "webpack-dev-server";

const PORT = process.env.PORT || 8080;

const front_server = new WebpackDevServer(wepback(config), {
  proxy: {
    "*" : "http://localhost:1234" // <- backend
  },
  // ... rest of the options
});

front_server.listen(PORT, 'localhost');
```

So, technically you can run two servers one backend one frontend and then proxy
all backend calls to the backend server on another port.

The second thing that we need to grasp is that your backend will serve static
assets in production after webpack will compile them. So, you need to remove
all static assets serving from the webpack dev server and leave them to the
backend server:

```js
import express from "express";
import serveStatic from "serve-static";
import API from "./lib/api";

const app  = express();
const PORT = process.env.PORT || 8080;

app.use(serveStatic(__dirname+"/build"));
app.use(API);

app.listen(PORT);
```

## The Trick

At this point you have those two servers the webpack one that builds and serves
the javascript stuff, and the backend that serves API and the static assets from
the build folder in production. You can boot them on two different ports in
different tabs and it will kind of work. But we can do better and make it all
automatic.

The idea is that instead of booting servers from `env.PORT` directly, we make
our front and backend server modules to export functions that take a port.

```js
import webpack from "webpack";
// ...

export default (PORT) => {
  const server = new WebpackDevServer(wepback(config), {
    proxy: {
      "*" : `http://localhost:${PORT - 1}`
    },
    // ... rest of the options
  });
  server.listen(PORT, 'localhost');
}
```

And then do the same with the backend:

```js
import express from "express";
// ...

export default (PORT) => {
  const app = express();
  // ....
  app.listen(PORT);
};
```

Once you have those two, make a main module that will kick in both of the servers
on correct ports from `env.PORT`:

```js
import appServer from "./webpack-server";
import apiServer from "./json-api-server";

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  apiServer(PORT);
} else {
  apiServer(PORT - 1);
  appServer(PORT);
}
```

And it's all done! Now it's just a single entry point that boots all your system
both in prod or in dev and handles all the proxying and ports automatically. Now
you can just jack in `"start-dev" : "./main-server"` in your `package.json` file
and enjoy the happy deving!

## The Conclusion

Not much of a conclusion, more of an opinion. But I like when things are opinionated
but leave room for other things to exist. Node culture can be hectic at times,
but it really shines in moments like this. The front end and the back end don't
really care about each other, but they can co-exist and let you swap them for
whatevers later.
