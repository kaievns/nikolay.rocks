# -webkit-transform is useful!

The `-webkit-transform` option is hardly a news for people who deal with #css on daily basis. But developers tend to think about it more like a toy "yeah, I can rotate and skew stuff, so what?". Meanwhile, there is one awesome thing in `-webkit-transorm` that can be really useful in everyday life of a front-side developer.

I'm talking about the `-webkit-transform: translate(x,y);` option. All it does is it moves stuff horizontally and vertically, and because of its simplicity people tend to completely miss it, because you can do kind of the same thing with say margins, and absolute/relative positioning.

But, as they say in #Thailand "same same, but different" (sorry i'm having too much fun in here :)), the catch is, that unlike other #css options, `translate` transformation doesn't screws with your layout.

With `-wekbit-transform: translate(x,y);` you can move any element in any position, without breaking the current layout, and it doesn't matter what kind of margins, or positioning you element has, inlined or not, it will be moved to exactly that specified amount of pixels vertically and horizontally.

This is extremely useful for all sorts of animations when elements on your page supposed to slide some way. The trick is, that now you can separate your layout from the visual effects level. You make a nice solid layout and then smoothly move stuff around by simply adding a #css class.

[Here, I've made a little demo](http://jsfiddle.net/j46yL) on jsfiddle. You've got a simple block and then move it around with a simple #keyframe animation.

Such approach with defining animations through css and separated classes gives you a great deal of flexibility. Firstly, you can simply move your animations in css classes an reuse them everywhere. Secondly, you can change your visual effects without digging into the javascript layer. And thirdly, because it's just a css class you can degrade gracefully by simply redefining those classes content in IE patches.

And finally, consider that `-webkit-transform` is hardware accelerated on mobile devices and works much faster than if you'd move stuff around with the usual `position` and `margin` options. In case of complex content with css shadows and semi-transparent layers, that might make a great difference.

That's about it. Give it a try, you're gonna love it!