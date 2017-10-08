# A Minimal ES6 Modules Publishing Setup

As we all know, the #javascript scene goes through a lot of churn. And, like me,
for many of you this also means churn in the way #npm modules published. There are
plenty of articles suggesting plenty of approaches that feature variable levels
of complexity of the publishing pipelines. Over the years, boiling in this soup,
i've settled into my own system, which i personally find minimal and unobtrusive.
And, I'd like to share it.

This approach revolves around using the standard #npm and #babel tools

```
npm install --dev babel-cli
```

After that I throw in a `.babelrc` file that looks somewhat like this:

```json
{
  "presets": [
    "react",
    ["env", { "targets": { "node": "current" } }]
  ],
  "env": {
    "production": {
      "presets": [
        "react",
        ["env", { "browsers": ["last 1 versions"] }]
      ]
    }
  }
}
```

What it basically does, is that it creates the minimal compilation situation in
the development environment, where I run my tests in the #nodejs. But, then it
flips to the browser environment setup for production builds. And _production_
in this case means the npm published version of the package.

Once that's done, i add the following lines to my `package.json` file:

```json
...
  files": ["dist"],
  "main": "dist/index.js",
  "scripts": {
    "build": "babel src --out-dir dist/",
    "prepare": "NODE_ENV=production npm run build"
  }
...
```

And, finally, I add the `dist/` folder to the `.gitingore` file. That is all.

What this system achieves is that the `dist/` and the `src/` folders become
isolated entities. The `dist/` folder represents the published version of the
package. It's never committed to git, but it's always automatically recompiled
fresh when you run `npm publish`. The `src/` folder, on the other hand, committed
to the source control system, but, it's excluded from the final build package
that published on npm.

As the result, you never pollute your git history with meaningless build commits.
On the other hand, you are being considerate to other people and don't add
useless weight to your npm published packages. And the best of all, it's
completely transparent to one's workflow. It's still the same old `npm publish`.

Well, that's all the story. I hope it helps.
