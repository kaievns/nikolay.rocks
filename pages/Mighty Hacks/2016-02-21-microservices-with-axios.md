# How To Micro-Service In NodeJS With Axios

People often ask me: "Nikolay, how do you micro-service in #NodeJS?". Well,
no one really asks me, but I still think it is a serious question, how one
connects small services in #javascript those days over #HTTP?

## The Simplest Case

Well, in general, if you don't need to do any authentication then making two
services to talk to each other over HTTP is pretty simple. Just use a good
modern HTTP wrapper, for example [axios](https://github.com/mzabriskie/axios):

```js
import axios from "axios";
import express from "express";

const app = express();

app.get("/bacon", (req, res) => {
  axios.get("http://factory.com/bacon-service")
    .then(bacon => {
      res.send(bacon);
    });
});
```

Axios is pretty cool, it's `Promise` through and through. So, you can parallelalize
your calls, use `async/await` and so on. The interesting question starts when
you need to authenticate requests between services.

## With Authenticated Services

Before you can make any calls to the chunky bacon factory, you need to get an
authentication token from an authentication service. And this is what I wanted
to show in this post.

In case of [expressjs](http://expressjs.com), the best way to deal with the
problem, I think, is to build a middleware. This way you can reuse it everywhere
and be flexible about its usage.

On the higher level your code will look somewhat like this:

```js
import express from "express";
import { authenticate } from "./middleware";

const app = express();

app.get("/bacon", authenticate, (req, res) => {
  req.axios.get("http://factory.com/bacon-service")
    .then(bacon => res.send(bacon));
});
```

Now inside of that `authenticate` middleware you might want to have a call to
the auth service and then build a preconfigured `axios` instance on the `req`
that will have all the authentication keys. This way it will be all ready to
go when it hits your actual route handler:

```js
import axios from "axios";

export function authenticate(req, res, next) {
  const creds = {whatever: "it is in our case"};

  axios.post("http://bacon-police.com/auth", creds)
    .then(response => response.data)
    .then(auth => {
      // this is the part where you preconfigure authoken
      // based on your auth service response
      req.axios = axios.create({
        headers: {Authtoken: auth.token}
      });
      next(); // <- handing over to the next middleware
    })
    .catch(error => {
      res.status(401).json({error: "authentication failed"});
    });
}
```

To reiterate: we create a middleware that is injected before the actual route
handler and that makes an authentication call. Once it receives the auth response
with a token, it sets up a new `req.axios` instance that has the `Authtoken`
preconfigured with credentials from the authentication service.

If the call fails for whatever reason, we have the `.catch(error => )` section
that will consistently spit back a `401` error and hang up.

The details might vary from a case to case, but the principle will be the same.

## Why Do It This Way?

The number 1 reason is consistency. I believe a service should not care whether
it is called by a human from a UI, by another service or by whatever. The
authentication process should be the same. By having this middleware, you can
consistently authenticate all your micro-services communications through the
same pipeline.

Secondly, because it is a middleware, it is highly reusable. You can jack it
in in any route you need; you can move the entire piece in a shared package
and so on. Your actual app code will not need to know anything about the
handshake process. It just gets a preconfigured HTTP client and get to the
business logic of the service right away.

And thirdly, an often neglected aspect is the consistent failover handler. When
you repeat your authentication code here and there, it often slips off and the
response starts to vary from a service to service, or even from a route to route.
It is really easy to get sloppy and forget to do anything about failures. But,
when you have a single middleware, you control the failures processing precisely
in one place. It saves hours of time in debugging. And sometimes lives, families,
friends. You should care.

Either way, that is the whole story. Ping me on twitters if you have any further
questions.
