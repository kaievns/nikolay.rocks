# Awesomize Your App With Font Awesome

In case you haven't heard, raster-graphic sucks, png sucks, png icons suck in particular. Yeah, I know, deep down we all have a soft sport for [glyph icons](http://glyphicons.com) because of their uberglorious black and white colors. But things have changed.

## The Problem

See, back in the good old days, when IE6 was rocking the minds of youngsters, pixels were square. If you had an image of 100x100 pixels in size, every pixel in this image would be displayed with a _single_ physical pixel on your display. But truth is, that pixels that your browser knows don't correspond to physical pixels in 1:1 ratio. Pixels in a browser is a _relative_ measure.

The simplest example is in your pocket. Retina displays of iDevices basically render every pixel in your browser with four physical pixels. So, if your image has size 100x100 pixels, on the device level it will allocate 200x200 pixels of your screen.

The problem is that on the system level those devices will approximate missing pixels and the raster graphics will and do look smudged all over the screen. It's good if you have sharp edges, then it might look okayish, but if you have any sort of gradients, it's gonna look awful.

## The Solution

The solution came from a bit unexpected direction. People figured that you don't need to invent any sort of new format for that, no need to go crazy and use SVG, instead you can make a custom font, which instead of normal letters will have a set of icons.

If it sounds dodgy, relax, it's not. Github started to use this feature a while ago and replaced all their raster icons with their own font, some other sites (including this one) did so as well. And now there is an open-source fonts available for that.

One of the most awesome, called [Font Awesome](http://fortawesome.github.com/Font-Awesome). It has decent set of icons (which grows constantly) and it has proper community support. Go check their site, they have all nice documentation and examples in there.

## So What?

In case you're thinking "fuck it, it's too complicated, I'll just make ugly squarish icons and no one will notice difference", think again. Using fonts instead of raster graphics not just solves the problem of different DPI in screens, it actually opens up a lot of options.

## Because It's Fucking Font!

Every icon is essentially a letter, so you can say change colors and backgrounds of your icons directly from your #CSS. More of that, you can apply things like text shadows, rotate icons, change colors dynamically from your application scripts, and best of all you can use css transitions to make it change smoothly!

Here's what I've got in one of my own applications, it's all done in #css + font-awesome.

![-](/images/2012/05/1-Pp97.png)

That's about it. Don't hesitate, give it a try, coz all cool kids gonna start doing it pretty soon.