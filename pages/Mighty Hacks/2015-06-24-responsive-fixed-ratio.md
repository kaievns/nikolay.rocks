# Responsive Elements With a Fixed Aspect Ratio

This problem have a tendency to hit me from the blind side now and then.
How do you make a #responsive element with a flexible size, which keeps its
aspect ratio when stretched with the design?

For example, you have an avatar image, like the one in the sidebar, and you
want to keep it square by using pure #CSS. You can make its width flexible
by setting the `width: 100%` style on it. But how do you specify the height?
The size might differ from a context to context.

Well, as it is with many things in life, the trick is that you have to stop
asking the question directly, in this case _"how do you i specify the height?"_,
and look for other options.

## Use The Paddings Luke!

Turned out, you can specify the `padding-bottom` property on an element
in percents. If there is a `width` was set on the element, that will make
the browser to calculate the _bottom_ padding relatively to the element's
width.

For example the block below will always keep the aspect ratio of `1/10`.
Try to stretch the browser window back and fourth to see it in action.

<div style="width: 100%; padding-bottom: 10%; background: orange;">

</div>

The style for it looks kinda like that

```css
div.one-tenth {
  width: 100%;
  padding-bottom: 10%;
  background: orange;
}
```

## Special Cases

So, for a square element, like an avatar you might want to specify the
`padding-bottom` property to `100%`. Naturally. But one another case
that you will probably run into is a `16:9` video. Like this one.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tHwntRpLobU?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

To keep it perfectly sized in all the situations wrap the `IFRAME` in a
`DIV` and style them like so

```css
div.video {
  position:       relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top:    25px;
  height:         0;

  iframe {
    position: absolute;
    top:      0;
    left:     0;
    width:    100%;
    height:   100%;
  }
}
```

That is all there is to this trick really. Enjoy!
