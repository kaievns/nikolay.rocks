# Can You Draw A Triangle In Pure CSS?

That's a fun trick, you can draw a triangle figure with pure #css without using CSS3 magic with `transform: rotate`. More of that it will work everywhere, even in IE6. Well, sort of :)

When you get it, it's actually really simple

```css
#triangle {
  width:              0px;
  height:             0px;
  border:             100px solid transparent;
  border-left-color:  blue;
  border-right-width: 0px;
}
```

The trick is in making a box of `0/0` size, then you can make a large border, one side of which will look like a tringle.

One tricky moment though. Keep the border sizes equal, otherwise the triangle edge will look pixelated.

Here, try this little demo at [jsfiddle](http://jsfiddle.net/2RYJe)

Enjoy! :)