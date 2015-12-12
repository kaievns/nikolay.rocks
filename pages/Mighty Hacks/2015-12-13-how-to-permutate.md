# How To Permutate Arrays in JavaScript

It is a recurring task in game dev, you have several lists of attributes and
you need to create a list of all permutations of them. For example a classical
example is a deck of playing cards:

```js
var faces = '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');
var suits = 'H,S,D,C'.split(",");
var cards = [];

// magic goes in here
```

Normally this sort of thing is done in nested loops, like so:

```js
for (var i=0; i<faces.length; i++) {
  for (var j=0; j<suits.length; j++) {
    cards.push(faces[i] + suits[j]);
  }
}
```

It is a simple and well known approach. But, it kind of ugly and quickly gets
out of hands if you need to permutate more than two sets of attributes:

## How We Can Make It Better?

There is actually another way to build permutations using a single `for` loop and
a bit of math. It looks kind of like so:

```js
for (var i=0; i < faces.length * suits.length; i++) {
  var face = faces[i % faces.length];
  var suit = suits[i % suits.length];

  cards.push(face + suit);
}
```

The trick here is that we iterate through the whole length of the final set and
then get the actual items by applying the mod operator on the current position.
It does exactly the same thing as the double loop, but in a bit different order.
The cool thing about this approach is though, that it scales nicely when you
introduce more attribute sets. For example if you add a card color (dunno why),
the whole thing could look somewhat like this:

```js
var faces = '2,3,4,5,6,7,8,9,10,J,Q,K,A'.split(',');
var suits = 'H,S,D,C'.split(",");
var colrs = 'R,G,B'.split(",");
var cards = [];

for (var i=faces.length * suits.length * colrs.length; i--;) {
  var face = faces[i % faces.length];
  var suit = suits[i % suits.length];
  var colr = colrs[i % colrs.length];

  cards.push(face + suit + colr);
}
```

As you can see, it grows linearly and makes much less calculations than plain
three level deep iterations loop would do. You even can quite easily generalize
the solution and make a function that will take an arbitrary number of attribute
lists and create a set of permutations out of it.

Well, here you go, you daily doze of #javascript hackery.
