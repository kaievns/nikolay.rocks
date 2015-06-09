# Fixing NPM

[NPM](http://npmjs.org) and [Node.js](http://nodejs.com) is a mess. Everyone who was around for couple of years knows how those bastards screw everyone over every time they make a new release.

The new version of #NPM is not an exception https://npmjs.org/doc/folders.html, basically they say you either install a package locally (meaning dump it in your project's folder) and then you can `require()` it or, if you need it as a binary executable, you should install it globally, but then you won't be able to call it programmatically with `require()`

If your package does both things, like my beloved lovely.io, coffee-script and so on, you can either install it twice or go fuck yourself.

Yes, coz they're fucking Rembrandts and we're taking their brushes away by asking them to the sane thing.

## Hack It!

Well, enough bitching about it. Lets hack it and make the bloody thing work properly

Assuming you install #nodejs with `brew`

Step 1. add `global=true` into your `~/.npmrc` file
Step 2. nuke the `~/.npm` and `~/.node_modules` folders
Step 3. add `export PATH=/usr/local/share/npm/bin:$PATH` into your `~/.bash_profile` file
Step 4. add `export NODE_PATH=/usr/local/share/npm/lib/node_modules:$NODE_PATH` there too
Step 5. run `source ~/.bash_profile` in your terminal or open up a new one

Reinstall everything you need and love with the `npm install` command.

Now you can use packages both as bins and libs from a single repository.