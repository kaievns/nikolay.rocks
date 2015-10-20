# Rebuilding MeowTV App With ReactNative

So, I've decided to give [react-native](https://facebook.github.io/react-native/)
a more real shot and rebuild the [MeowTV](http://meowtvapp.com) app from 100%
swift + xcode into 100%-ish react-native. The goal here is to evaluate react-native
as a valid option for real live apps, and, check how the #react + #flux architecture
scales outside of the web dev context.

A bit of prehistory. I've got a decent amount of experience with mobile dev.
I jumped into the game a bit late with [RubyMotion](http://www.rubymotion.com),
a mind bogglingly awesome project that allows you to write native iOS/OS X/Android
apps in ruby. Then I've built the [under-os](http://under-os.com) project, which
is sort of like react-native, only in #ruby. Then I slowly transitioned to
using pure #swift and XCode.

So, in a sense I'm a web dev. I believe 100% in the idea that react-native
tries to build: a web like abstraction on top of a native apps development.
But then, as many others, I feel more comfortable with the web stack and I want
my production projects to be consistent in this way.

## The App

So, to the app. The app is actually quite simple, it helps you to find videos
on youtube that are created specifically as entertainment for cats. And then
it has a specially designed video player that allows you to completely block
the screen, so that when your furry friend gets too agitated about the imagery
on the screen, he wouldn't tap the playback controls accidentally.

![](http://meowtvapp.com/img/screens/ipad-1.png)

![](http://meowtvapp.com/img/screens/ipad-3.png)

It is a pretty simple app but it presents a wide range of problems that needs
to be solved:

1. JSON API communication
2. Collections representation
3. Navigation between screens
4. Custom WebView scripting for the youtube player
5. Settings/support for multiple devices

So, I'll just go through those problems implementation in the #react-native realm
and my experiences with each one of them.

## Overall Project Organization

Here is where react-native really shines. React plays with the open-source tools
really nicely. So with npm, babel, packaging and other tools, you really do feel
in your own shoes; even though the context is quite different from web-dev.
Packaging of binary extensions might feel a bit cumbersome if you are not really
on a short leg with XCode, but it's completely survivable.

And then there is React, which scales really nicely. With the react + flux pair,
you know what to do and how to drive the implementation. You already have the
basic structure in mind, how to bind components to storages, etc.

XCode free for all project structures loose in this regard quite a bit to the
well oiled npm + react + flux machinery.

## JSON API Communication

JavaScript came from web. So, no wonder that working with JSON APIs is as
delightful as ever in react-native. More of that react-native people generously
hooked up [babeljs](https://babeljs.io) and enabled all the awesome ES7 `async`
and `fetch` features by default. So, working with any networking is just a
breeze.

If you ever tried to communicate with a JSON API via any incarnation of the
`Foundation` framework in iOS. You will cry how much easier it is to do in
javascript than XCode.

It's kind of funny how non #javascript people used to say _ewww, callbacks!_
Everyone still does callbacks, yet javascript moved beyond that and it looks awesome!

## Rendering Collections

This one was a bit of a surprise to me. React native supports pretty nicely
the usual list views, and it stitches very well with flux. But, it doesn't support
the greed like collection views at all. There is a npm package for greed views,
but it is just a hack that jacks in a predefined number of cells into every
row of a list view. But no real greeds, greed layouts or anything like that.

I'm sure it will be solved eventually. But, there is a bit of a tendency in
react native at the moment to solve everything with DIVs—or plain UIView elements.
I kind of expected that react native will have proper abstractions on top of
all the basic UI components. But that is far from being the case. At least
at the moment.

So, basically whenever you have a case for any non-trivial UI elements, you will
have two options. Either build a half-backed substitute with DIVs or get your
hands dirty with Objective-C/Java.

## Navigation Between Screens

I've built a thing for this problem myself at [under-os](http://under-os.com).
Navigation in native apps is quite a bit different from your browser's navigation
and it is a real problem to present an abstraction that will be sensible to
a web dev.

Good news, react from the very beginning was quite a bit inspired by mobile dev.
So, they kind of piggy-backed on the native iOS navigation controller system,
but, somehow it doesn't feel particularly different from the web version of
the [react-router](https://github.com/rackt/react-router) package.

It's still a bit cumbersome though, as you get the navigation reference into
your top level view, but the user actions usually happen deep inside some
nested components. So, somehow you will have to drag that reference around.
Either through an external service or through params and callbacks. A little
awkward but totally survivable. Also, I think it will change a lot as we
progress towards a cross-platform support for navigation needs.

## Custom Views/Components

This one is a bit of a pain in the neck at the moment. React native does a great
job hiding ugly details from you when it comes to the built-in components.
But, when you need to build anything custom, you will have to go through the hell
of mangling with multiple xcode projects.

Here is where the rubymotion approach is a clear winner. All the code lives in
ruby and then compiled. So, you have the overall consistency and all the heavy
artillery ruby has to offer when it comes to meta-programming and blunt
monkeypatching.

In case of react-native, your javascript code runs in an isolated vm where
the native app context is explicitly bridged into the javascript vm objects
space. That makes it quite a pain in the neck, as with any small change in a
component's API you will end up split-brain between the javascript vm and native
app context, which is built in objective-c/java.

Unfortunately, this is an inherited quality of react-native and there will be
no way around it. I can imagine that over time we will gather a collection of
high quality components that will cover 99% of use-cases, but at this point
you will be left on your own.

## Support For Multiple Devices

As I said before, I'm primarily a web-developer. A plain text editor and a console
my favorite tools. So, as much as I might dislike the "vertical integration"
approach apple takes to it's development tools, I find the auto-layout feature
in XCode incredibly useful.

To be honest, I hate building UIs programmatically. React's JSX approach makes
it somewhat bearable, but it is still a huge pain in the neck. I much prefer
to throw a bunch of elements on a canvas and then write what they supposed to do
in code. Mangling with paddings, margins, sizes and constantly hit Ctrl+R to
see the result is somewhat degrading in my mind. I can do it, but it is like
writing CSS by hands. Computers are much better at this than humans and there
are more interesting problems to solve out there.

This is especially noticeable when it comes to supporting multiple form factors.
In XCode, you just flip to another view and make this specific device adjustments
and you're done. You can clearly see how your app will look like on every device.

In react-native you have a trimmed down version of the flexbox implementation.
It kind of works on one device, but as you go into the proper responsive design
territory it quickly becomes a huge problem. There is no real CSS, no media
queries, you will have to mangle with the style objects manually in javascript.
That's not a stellar experience to be honest.

## Overall Conclusions

So, I went through the basic pros and cons of react-native, rubymotion and
xcode in the sections above. But what is the overall conclusion?

Well, we could say the usual _it's new and a bit rough at the moment_, which is
kind of true, but useless. Lets look at it this way:

It took me roughly a month of my time to build the original version of MeowTV
app in swift + xcode. That includes quite a bit of a learning curve for me as I
had to learn a different development paradigm and a language.

But, it took me ~8 hours to build the first working spec of the app in react-native.
Yeah, it's kind of clunky and not as shiny and polished as the original. But
it is a day of work—including the learning curve and bugs chasing in someone
else's code. It is not a month of blind mangling with the things and throwing
the joystick at the wall. And that makes all the difference.

You can't expect to ship anything remotely serious with react-native at this
point. I'm not even speaking about shipping a true cross-platform app. But it
has a great potential as the entire toolset is very familiar to anyone who
ever built anything with react + flux.

So, lets wrap it up this way. It is not ready for the prime time (duh). Neither
it will solve all your problems if you don't know much about the native apps
development and expect that it will provide a nice wall between you and life.

But, if you have a rather simple app in mind, and you're not afraid of occasionally
getting your hands dirty with objective-c/java, and you're keen on trying new shinies,
react-native is a totally feasible option. It's fun, it scales just as madly
as web react apps. And, it will present you with a nice stream of interesting
problems to solve and commit back to the project.

Well, that's about it. I hope you learned things from my experience. Oh, and
I have released the [meowtvapp-react](https://github.com/MadRabbit/meowtvapp-react)
into the wild. So, lets be like totally awesome friends on [GitHub](https://github.com/MadRabbit)
and stuff. Coz the future looks bright and rainbowy!
