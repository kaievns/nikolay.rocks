# How To Make Auto-Resizable Textarea

It seems that not everyone knows how to make a textarea element which will automatically resize itself so that the text fit into it without scrolling. The usual CSS hacks don't work in case of textareas and to make this feature work, you need to do some hackery around.

In my version of the hack I'll be using [lovely.io](http://lovely.io), which is my pet project. It has mostly jquerysh syntax so it should not be a problem to reproduce the code on any other system.

## So, How It Works?

The idea is actually pretty simple. All you need is to create a `DIV` element that will have all the same styles as the textarea itself, this includes fonts, margins, paddings and borders. Then you set the same width but leave the `height: auto`. And finally move this div outside of the visible area, with `position: absolute`

After that you hook up to the `keyup` event of your textarea, and every time the user hits a key you copy text from textarea into the div, get its size and apply it to the textarea itself.

## Lovely Basics

[Lovely.IO](http://lovely.io) is kind of a port of the [RightJS](http://rightjs.org) library, which is built on modular architecture, AMD and that sort of stuff. So to make it running you'll need to make a construction kinda like that

```html
<script src="http://cdn.lovely.io/core.js"></script>
<script type="text/javascript">
  Lovely(['dom'], function($) {
    // And here is your code
  });
</script>
```

This basically gets the `lovely.io` core, and then uses asynchronous modules definition to load the DOM handling module, which is kind of jQuery looking thing.

## Show Me The Code

Now to the actual code. A simple brut force solution might look say like that

```javascript
$(function() { // dom-ready
  var textarea = $('#my-textarea')[0];
  var meter    = $('<div></div>')[0];

  // some default styles
  meter.style({
    position:   'absolute',
    top:        '-999999em',
    left:       '-999999em',
    border:     '1px solid grey',
    overflow:   'none',
    whiteSpace: 'pre',
    wordWrap:   'break-word'
  });

  meter.insertTo(textarea, 'after');

  // copying the styles
  meter.style(textarea.style(
    'font-size,font-family,width,'+
    'margin-top,margin-left,margin-right,margin-bottom,'+
    'padding-top,padding-left,padding-right,padding-bottom'
  ));

  // adding the actual resizing
  textarea.on('keyup', function() {
    meter.html(this.value() + "\n\n");
    this.style({height: meter.size().y + 'px'});
  });
});
```

Firstly, we make that `DIV` element with default styles. The crucial thing is not to forget the `overflow: none`, `white-space: pre` and `wordWrap: break-word` settings so that the `DIV` mimicked a `TEXTAREA` text behavior.

Then we copy styles from the `TEXTAREA` element (coma separated style names return a hash of the styles in lovely.io). And finally we tap into the `keyup` event of the textarea to make it automatically resize. The only tricky thing here is to add those `"\n\n"` two new line chars at the end of the text, just to eliminate possible lags on text wrapping and give the user some sense of empty space below the cursor.

## Ninja Style

That's the whole thing really. But if you need to make more than one textarea autoresizable, or say you have all sorts of textareas in our project, some of them are autoresizable, some aren't. In this case you might want to look into the custom dom-wrappers functionality of [Lovely.IO](http://lovely.io) which was migrated from the [RightJS](http://rightjs.org) project.

OO DOM-wrappers in [Lovely.IO](http://lovely.io) are pretty simple. It's just a collection of classes that wrap the original dom-elements and allows you to do all sorts of fancy things, like custom methods and inheritance.

So, in our case we could just inherit the `Input` class, which in the `dom` module handles all the input fields, and then incapsulate the auto-resizing functionality in it.

```javascript
var AutoTextarea = new Class($.Input, {
  constructor: function(raw_element, options) {
    this.$super(raw_element, options);
    this.meter = this.make_meter();
    this.on('keyup', 'auto_resize'); // RightJS style call by name
  },

  auto_resize: function() {
    this.meter.html(this.value() + "\n\n");
    this.style({height: this.meter.size().y + 'px'});
  },

  make_meter: function() {
    return $('<div></div>')[0]
      .style({....});
      .insertTo(this, 'after');
      .style(this.style('....'));
  }
});
```

As you can see, we simply overloaded the original constructor and made it to create meter `DIV` and hook it up to the `keyup` event. Once you've got this class, you can use it in all sorts of ways. For example the usual `dom:ready`

```javascript
$(function() {
  $('textarea.autoresizable').forEach(function(input) {
    if (!(input instanceof AutoTextarea)) {
       // rewrapping it in your own class
       new AutoTextarea(input._);
    }
  });
});
```

Or you could use events delegation and lazily instantiate your class when the textarea gets focused

```javascript
$(document).delegate('textarea.autoresizable', {
  focus: function() {
    if (!(this instanceof AutoTextarea)) {
      new AutoTextarea(this._);
    }
  }
});
```

I think that's the whole story. Enjoy! :)