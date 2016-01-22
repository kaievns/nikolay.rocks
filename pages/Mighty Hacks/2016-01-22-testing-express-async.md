# Testing ExpressJS Apps Like It's 2016

I guess in 2016 no one needs an introduction into why testing is cool and
awesome. Many of you wrote plenty of [expressjs](http://expressjs.com) apps
(or similar). And some of you I'm sure wrote some testing for your JSON API's
with something like [supertest](https://github.com/visionmedia/supertest). Today
though I'd like to show how to make it so much betterer in the modern ES7
async/await environment.

I guess, I don't need to talk about the merits of the `async/await` functions
in ES7 either. Developers are migrating there at mass, and our tools, including the
testing environment, migrate there as well. The cool thing about it is that
anything that is promises aware can be used with async/await almost right away.
For example [mocha.js](https://mochajs.org) supports them out of box:

```js
import { expect } from "chai";
import User from "../src/models/user";

describe("User", () => {
  it("does stuff", async () => {
    const user = await new User({username: "nikolay"}).save();
    expect(user.id).to.be.ok;
  });
});
```

Awesome isn't it? Now, how can we do the same for an #expressjs app testing?

Firstly, lets look at how a normal testing looks like with #supertest:

```js
import express from "express";

const app = express();

app.get("/blah", (req, res) => {
  res.send("hello!");
});

import supertest from "supertest";

describe("GET /blah", () => {
  it("is alive!", (done) => {
    supertest(app)
      .get("/blah")
      .expect(200, "hello!", done);
  });
});
```

It is not too bad, but those are callbacks. Try to combine this with your usual
async/await business to say create database models before calling the API, and
you end up in the world of pain and ugliness.

Not to worry though. Everything you need to make your testing live enjoyable is
already here. You just need to wrap the `supertest` stuff into a promise! For
example, create a `helper.js` file somewhere in your testing environment that
has something like this:

```js
import app from "../src/app"; // wherever your express app is
import supertest from "supertest";

export const api = {
  get(path, params, headers) {
    return request("get", params, headers);
  }
  // ... the same for 'post', 'put', 'delete'
}

async function request(method, path, params={}, headers={}) {
  return new Promise((resolve, reject) => {
    let test = supertest(app);
    test = test[method](path);
    test = test.send(params);

    // do stuff with headers here as well

    test.end((error, response) => {
      if (error) {
        reject(ereror);
      } else {
        resolve(response);
      }
    });
  });
}
```

It looks a bit bulky, but the principle is pretty simple. We do all the same
regular `supertest` business, but inside of that `new Promise` wrapper. We
setup the request pretty much the usual way, and then in the `.end()` we just
checking whether it had failed or not, and resolve/reject the promise based on
that.

Now, when you have this fancy helper, you can write your app testing code
in an async way like it is 2016!

```js
import { expect } from "chai";
import { api } from "../helper";

describe("GET /blah", () => {
  it("responds with hello!", async () => {
    const response = await api.get("/blah");

    expect(resonse.status).to.eql(200);
    expect(response.text).to.eql("hello!");
  });
});
```

Pretty neat, isn't it? Now you can do all sorts of async stuff in your tests,
create records before calls, check database afterwards and so on. And everything
in a linear straight forward manner.

Enjoy!
