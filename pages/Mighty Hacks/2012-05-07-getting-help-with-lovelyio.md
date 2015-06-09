# Getting Help With Lovely.IO

I'd like to share a bit of the [lovely.io](http://lovely.io) practical awesomeness. #LovelyIO is my pet project, on which I've been working for the last year. In simple words, it's a modern, async and #html5 centric version of the [RightJS](http://rightjs.org) library.

At the moment, lovely.io reached the point where I use it on two of my real life projects. It still a bit raw and edgy, but it's so awesome in practical applications that I should share it :)

## So, What's The Hell Up With Lovely.IO?

Lovey.IO is not exactly a #javascript framework. It's actually a service, sort of like [rubygems](http://rubygems.org) but for the front-side modules. This service is based on the [AMD](http://wiki.commonjs.org/wiki/Modules/AsynchronousDefinition) architecture, which basically looks like that.

```html
<html>
  <head>
    <script src="http://cdn.lovely.io/core.js"></script>
    <script>
      Lovely(['dom', 'ajax', 'cookie'], function($, ajax, cookie) {
        $('#my-stuff').html("Boo hoo!");
      });
    </script>
  </head>
</html>
```

Basically, you load the `core` package from the centralized lovely.io CDN host (it's located on amazon's cloudfront service). Once it's loaded (just 3k gzipped), you can _asynchroniously_ load any packages via the `Lovely` interface and then use them on the inside of the callback function.

And those micro-modules form some sort of an ecosystem, where modules can be reused by each other and live like one happy family.

## Lets Build Something Useful

I'd like to show you some real-life example. The other day I need to add a `Help` button next to some complicated form, that button supposed to open up a popup dialog with some help text.

The #HTML looks kinda like that

```html
<form ...>
  <a href="#" class="help" data-css="#the-help">Help</a>

  Form internals go in here

  <div id="the-help" style="display: none">
    The actual help text
  </div>
</form>
```

You basically have a link and a text that supposed to appear in a popup.

## Hooking Up LovelyIO

Lovey.IO already has basic [ui-core](http://lovely.io/packages/ui) and [dialog](http://lovely.io/packages/dialog) packages, so we can start making things right away

```javascript
Lovely(['dom-1.2.0', 'dialog-1.1.0'], function($, Dialog) {
    var help_dialog = new Dialog();

    // initializing the dialog object
    help_dialog.title("Help info");
    help_dialog.addClass('my-help');
    help_dialog.on('ok', 'hide');

    // catching all the `a.help` clicks
    $(document).delegate('a.help', 'click', function(event) {
        event.preventDefault();

        // updating the dialog with the content and showing it up
        help_dialog.update($(this.data('css')).html());
        help_dialog.show();
    });
});
```

As you can see, firstly we ask `Lovely` to load `dom` and `dialog` modules. `Lovely` interface automatically handles all possible internal dependencies, so you just ask which modules you need.

The `Dialog` unit is just a normal #javascript class, you can instantiate it the usual way. And, as it's inherited from the basic `dom.Element` interface, you can simply `addClass` or bind an event listener to it. For those of you who's familiar with #rightjs this should be pretty much familiar.

And finally, we delegate all the `a.help` clicks on the page to a little function that updates the dialog content and shows it up to the user.

That's all there really is. Lovely IO automatically delivers all the scripts, stylesheets, related images and so on from the centralized CDN hosting. All you need to do is to write your actual application code.

As per usual, I've made you [this little demo](http://jsfiddle.net/pKSz8). Enjoy!