# The Magic clear:both Trick

Okay, now raise your hands who of you in your web-developer's career had to do that?

```html
<div class="container">
  <img src="tall-image.jpg" style="float: left">
  Smaller than the image text

  <div style="clear: both"></div>
</div>
```

I'm pretty sure that 99% of you at some point had to add that dummy DIV with `style="clear: both"` so that the floating block didn't stick out of the main container.

My dear friend, did you know that you don't have to do that? You can happily have clean content like so.

```html
<div class="container">
  <img src="tall-image.jpg" style="float: left">
  Smaller than the image text
</div>
```

And then generate that dummy div with #CSS!

```css
div.container:after {
  content: '';
  display: block;
  clear:   both;
}
```

Check it out, i've made you [this little demo](http://jsfiddle.net/JfaPH)!

## Browser Support

This hack will work in IE8 and upper (http://caniuse.com/after)

If you need to support older browsers, try add `*zoom: 1;` to the container element, that should have the same effect.