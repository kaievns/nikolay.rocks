# How To Randomize Array in JavaScript

Although #JavaScript doesn't have a builtin method for randomizing array items,
there are plenty of ways to do it manually. Unfortunately, people usually go
after the brute-force solution and it looks somewhat like so:

```js
var original_array   = [1,2,3,4,5];
var randomized_array = [];

for (var i=0; i < original_array.length; i++) {
  var random_pos = Math.floor(Math.random() * array.length);
  randomized_array.push(original_array[random_pos]);
}
```

That is not only quite bulky, but also produces a new array instead of
randomizing the existing one. If you need to randomize the array items directly,
then the implementation gets even more complex. One will have to get two
random positions and then swap the items in the array. Ughrr....

Meanwhile, you can totally ninja the hell out of the task by using the builtin
`Array#sort` method and some bitshifting voodoo in one glorious one-liner:

```js
[1,2,3,4,5].sort(function() { return Math.random() * 2 | 0; });

// or if you live in the future and use ES6
[1,2,3,4,5].sort(()=> Math.random() * 2 | 0);
```

Isn't it beautiful?... But, how does it work?

Well, it's pretty simple actually. The `Array#sort` method can take a function for a
custom sort algorithm. And, that function is supposed to return either `1`, `0`
or `-1` depending on where two items are supposed to be placed against each other.

The `Math.random() * 2 | 0` thing randomly returns either `1` or `0`. So, we
kind of shortcutting the native (and quite hight-performant) `Array#sort` method
with a function that returns random placings for the items.

Mission accomplished, Enjoy!
