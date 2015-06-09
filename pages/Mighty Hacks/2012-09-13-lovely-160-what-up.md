# Lovely 1.6.0, What Up?

Hey folks, I've just updated the [lovely.io](http://lovely.io) NPM package to the version `1.6.0`, now some words about what's going on in there.

## Lovely Core in Node

The first major change is that #lovelyio core package is now available for use from #nodejs. That obviously doesn't mean that you can load `dom` and `ui` stuff into node environment, coz why would you? But most of the `core` package is pretty much standard and the set of its utils can be useful in node as well as on the front side.

```coffee
Lovely = require('lovely')

MyClass = new Lovely.Class,
  include: Lovely.Events,

  constructor: ->
    # bla bla bla
```

Basically, if you want it to be put in other way, that's the #rightjs NPM package + ~2 years of development.


## Standard Package Testing Utilities

But the real reason why the new release was made is that now we have standard package testing utilities out of the box.

When I started with lovely.io couple of years ago, the field of console based testing was rather undeveloped and most of the STL packages were tested with quite a bunch of home made helpers and hacks.

Nova days we have [mocha](http://visionmedia.github.com/mocha) and [zombie.js](http://zombie.labnotes.org) stable and widely accepted by public, it's time to get more serious about how we test packages.

So, now lovely.io #NPM package comes with a built in set of testing utilities and when you generate a new project with the `lovely new something` command, you'll get the `test/something_test.coffee` file generated for you. At the moment it will look kinda like that

```coffee
{Test, assert} = require('lovely')

describe "Something", ->
  Something = null

  before Test.load(module, (obj)-> Something = obj)

  it "should compile", ->
    assert.ok Something.version
```

Basically the `Test` object wraps up all the standard testing kitchen. It builds the current package, runs a little #express test server, generates a dummy HTML page, loads everything up, then pulls your package's exported object and provides the object for mangling with it in the tests.

You obviously can create your own HTML pages for testing, make macros, access the zombie browser and it's DOM environment and do all other sorts of fancy stuff with it if you need. If you need more advanced examples, you can check tests at the [lovely.io DOM package tests](https://github.com/MadRabbit/lovely.io/blob/master/stl/dom/test/unit/form_test.coffee)

The whole point of this exercise is to provide developers with a simple, standard and painless environment for automated packages testing in the terminal, rather than relay on devs clicking stuff in the browser like a bunch of school girls.