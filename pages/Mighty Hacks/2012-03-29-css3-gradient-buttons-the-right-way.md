# CSS3 Gradient Buttons The Right Way

Do you like the picture below? Do you want to know how to make those things in pure #CSS the right and reusable way?

![](/images/2012/03/all-images-lWD7.png)

People make CSS3 gradient buttons for a while now, but the problem is that web-designers tend to just google some css3 gradient generators, then enter some colors in there, then copy paste some giant piece of auto-generated css. Which is kinda fine until you want to change a color or add an icon, or reuse that pail of code in any way.

Luckily for us, there is always a better way to do things.

## Show Me Some Code

The trick to good CSS3 gradients is to use `rgba` colors instead of the usual `rgb` or `hex` values. You define a semi-transparent gradient layer for your buttons, say kinda like that

```sass
.button
  background-image: -webkit-linear-gradient(rgba(255,255,255,0.7) 5%, rgba(255,255,255,0) 70%, rgba(0,0,0,.05) 85%)
  background-image: -moz-linear-gradient(rgba(255,255,255,0.7) 5%, rgba(255,255,255,0) 70%, rgba(0,0,0,.05) 85%)
  background-image: -ms-linear-gradient(rgba(255,255,255,0.7) 5%, rgba(255,255,255,0) 70%, rgba(0,0,0,.05) 85%)
  background-image: -o-linear-gradient(rgba(255,255,255,0.7) 5%, rgba(255,255,255,0) 70%, rgba(0,0,0,.05) 85%)
  background-image: linear-gradient(rgba(255,255,255,0.7) 5%, rgba(255,255,255,0) 70%, rgba(0,0,0,.05) 85%)
  background-color: #eee
```

As you can see, I used three levels, a fully transparent color in the middle, white semi-transparent on top and dark semi-transparent at the bottom. This will produce a nice modern plastic-like semi-transparent gradient over your button.

![](/images/2012/03/gray-buttons-kquX.png)

Btw, don't use just two colors, that will look glossy like windows vista and all designers will lough at you.

The great thing about this approach is that you can reuse this layer everywhere and you don't need to go back to a CSS gradient generator every time you want to change the background color. You can specify it directly in CSS as a normal color!

```sass
.button

  // gradients are in here

  &.red
    background-color: #ecc

  &.blue
    background-color: #cce

  &.green
    background-color: #cec
```

This will produce buttons like those

![](/images/2012/03/color-buttons-X8Oj.png)

Pretty neat, huh?

You also might need to define special styles for active, disabled and hovered versions of buttons, but that's again just adjustments in the semi-transparent layer we defined in the very beginning, you won't have to change the actual `background-color` property of your button in every pseudo-class.

## Adding The Icons

And finally, lets add some icons on the buttons. I already described [in this post](http://theosom.com/p/s5cV) how you can make imageless icons in #CSS, but if you want icons exactly like on the first picture, here is what you can do

```sass
.button-add, .button-edit, .button-delete
  padding-left:  2.5em
  padding-right: .8em

  &:before
    border-right: inherit
    background-color: rgba(0,0,0,0.1)
    position: absolute
    top: 0
    left: 0
    height: 100%
    text-align: center
    line-height: 1.3em

.button-add:before
  content: "\u271A"

.button-edit:before
  content: "\u270E"

.button-delete:before
  content: "\u2716"
```

After you add both `button` and say `button-add` classes, the icon will appear on your button. It's that simple.

## What About Old Browsers?

One of the nice things about this approach is that it automatically falls back gracefully. Because you already specified the `background-color` and the `border` attributes correctly, the old browsers will just skip the gradients and show flat buttons. Say here is how it looks like in IE9

![](/images/2012/03/ie9-lrZG.png)

In more older browsers there won't be the icons and round corners, but it still will be a normal gray button that will look and behave like a normal button.

If you want the full version of the css code, go and check the [lovely.io ui core project](https://github.com/MadRabbit/lovely.io/blob/master/ui/core/main.sass) [lovely.io](http://lovely.io) is an HTML5 centric project and we use those semi-transparent gradients in there as a default solution to generate the basic collection of buttons, icons and that sort of stuff.