# High Performance JavaScript (Book)

I ran into this book while I was going through some javascript optimizations
reading list. It was supposed to provide some good insight into #javascript
performance issues. And it did. Well, if you're in 2010...

This is a great book actually, filled with tons of cool advices on how to
optimize your code to run faster in different browsers. All the quirks of different
javascript engines, details on why certain DOM operations are so slow and how
to work around it. But, it is all in context of IE8 and Firefox vs Chrome in 2010.

It really threw me back to the good old RightJS vs. jQuery rivalry. I wish I
had this book back in the day and didn't have to figure it all the hard way.
Unfortunately, technology had moved on and a huge chunk of this knowledge
is completely false now. Modern javascript engines, with their awesome JIT
compilers, figured how to work around those issues long time ago.

In this way it is actually a pretty cool book to read. If you have been in this
industry for a while, it really shows you how far away from the JavaScript origins
we have moved. With all those modern ES6 twinkidinkies, web workers, sockets,
multi-core processing in node, javascript is a completely different beast now.
And it is awesome!

Some things never get old though. This totally caught me by surprise:

```js
var array = [1,2,3,4....];

for (var i=array.length; i--;) {
  // do stuff with array[i]
}
```

If the order in which you process your array items doesn't matter—which is more
often than not is true. A reverse loop like the one above will use twice less
resources on the iteration operations than a normal straight loop.

The thing I learn...
