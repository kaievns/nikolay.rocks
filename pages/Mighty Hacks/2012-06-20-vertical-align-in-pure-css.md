# Vertical Align In Pure CSS

Okay, one more take on the old as the world problem. How to align one block inside of another one with pure #CSS?

```html
<div id="wrapper">
  <div id="content">Bla bla bla</div>
</div>
```

I already described the trick, with one extra element that aligns the inner one, but you actually can achieve the same with CSS generated elements via the `:before` call

```css
#wrapper {
  position: relative;
  text-align: center;
}

#wrapper:before {
  content: ' ';
  display: inline-block;
  height: 100%;
  width: 0px;
  vertical-align: middle;
}

#content {
  display: inline-block;
  vertical-align: middle;
}
```

Basically the trick is quite simple, you just generate an element which has `height: 100%` style and then align it with the content block by using `vertical-align: middle` property on both of them. And as the tall one will take the whole vertical space, the smaller one (with the content) will align against it in the middle.

Cheers!