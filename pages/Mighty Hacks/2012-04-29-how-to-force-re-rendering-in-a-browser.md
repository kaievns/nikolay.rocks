# How To Force Re-rendering In A Browser

Normally you don't need this sort of things, browsers are pretty smart those days, but once in a blue moon, when you have a complex #html layout and go too fancy with #css, especially if you deal with a slow mobile browser, you might see some artifacts, things might get stuck here and there and so on.

And if you see the artifacts go away after you resize the browser window a bit, you might start wondering "how can I force the bloody thing to re-render stuff programmatically?"

My friend, the answer is actually pretty simple

```js
var block = document.getElementById('my-ugly-block');
var dummy = document.createElement('div');

block.appendChild(dummy);

window.setTimeout(function() {
  if (dummy.parentNode === block) {
    block.removeChild(dummy);
  }
}, 1);
```

The idea is obvious, you insert a dummy element into the block of interest and then remove it from there. But there is a couple of important moments.

Firstly, you should remove the dummy element with the `window.setTimeout` call, coz #javascript is single threaded, this will finish up the current scenario and let the browser a chance to render stuff. If you place those commands one after another, nothing will happen. The browser will change it's internal model back and fourth, but won't render the changes.

Secondly, don't forget about that `.prentNode ==` check, if you make the re-rendering calls repeatedly, things might get screwed because you have the async call in there, and those things executed by the system not exactly in the same order they were originally placed.

That's about it. Have fun!