# How To Add RethinkDB Support On CircleCI

I've been shopping around for a CI pipeline recently. I was mostly a TravisCI
guy all this time. But, when it came to running my own private repos in a CI,
$130/month vs. $0/month makes a lot of sense. So, I've decided to give
[CircleCI](https://circleci.com) a shot.

Just to be clear, I'm not affiliated with CircleCI in any way. I simply had quite
a solid experience with their product. So, I believe they deserve a bit of promotion.
Either way, here is what you came here for: how to add #rethinkdb support to
the #circleci build pipeline.

Long story short. At this point CircleCI doesn't have a support for RethinkDB as
a service. But, it seems that they had thought it through and allow you to install
any software via `apt-get` before a test run. So, to add RethinkDB, you simply
need to add the following to your `circle.yml` file:

```bash
dependencies:
  pre:
    - source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
    - wget -qO- http://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
    - sudo apt-get update
    - sudo apt-get install rethinkdb
    - sudo cp /etc/rethinkdb/default.conf.sample /etc/rethinkdb/instances.d/instance1.conf
    - echo "cache-size=128" | sudo tee --append /etc/rethinkdb/instances.d/instance1.conf
    - echo "no-http-admin" | sudo tee --append /etc/rethinkdb/instances.d/instance1.conf
    - sudo /etc/init.d/rethinkdb restart
    - sleep 5
```

As you can see there is a bit of a hackery going on. It took me a bit of time to
figure this, so bear with me.

The problem here is that CircleCI runs everything in docker containers and those
have some limited resources on them. On the other hand RethinkDB is a bit memory
hungry. So, if you just `apt-get install` it, half of the tests will time out
because rethinkdb will eat up all the available memory.

To battle the problem I have couple of patches to the stock rethinkdb config.
Firstly, it reduces the `cache-size` down to 128MB. And secondly it shuts down
the http admin interface that comes with rethinkdb by default. After those two
fixes the rest of it is a pretty smooth ride.

One more thing though. If you're using [thinky](https://thinky.io) and
[mochajs](https://mochajs.org) you might want to add the following to your
`test/helper.js` or wherever you keep tests suite config.

```js
const thinky = require("../config/thinky"); // <- your thinky configuration
before(() => thinky.dbReady());
```

There is a bit of a lag between thinky creating a new test database and when this
database will become available. So, this patch will wait on rethinkdb to thumb
up your database before you start making queries to it.

That's pretty much all the hackery. I hope they will add rethinkdb as a built-in
service at some point though.

Also, CircleCI folks, if you're reading this, could you please make `node:latest`
to be the default for #nodejs builds? Having `v0.12` as the default in mid 2016
is a bit, well, embarrassing.
