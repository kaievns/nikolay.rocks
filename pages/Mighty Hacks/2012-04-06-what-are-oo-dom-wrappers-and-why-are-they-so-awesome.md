# What Are OO DOM-Wrappers And Why Are They So Awesome

This post is more for youngsters and intermediate #JavaScript developers. To get it you'll need to know how #OOP in #JavaScript works and what [prototype-based programming](http://en.wikipedia.org/wiki/Prototype-based_programming) is.

## Sooo... What's Up?

To get to the point I need to write a bit about the history of javascript frameworks. In the good old days scripts were simpler. There was this framework [Prototype](http://prototypejs.org), it was called this way because it was simply screwing with the `HTMLElement` class prototype like so

```js
HTMLElement.prototype.addClass = function(name) {
  this.className += " "+ name:
};
```

It was fun, coz all those methods were available immediately after you get access to your dom-element, say through `document.getElementById` or something like that. Unfortunately, when there were more than one library screwing with the native class prototypes, things tend to go south really quickly.

In a while people figured that it is not cool anymore and [jQuery](http://jquery.com) raised. To be fair, [dojo](http://dojotoolkit.org) and [Ext](http://www.sencha.com/products/extjs) did it way before #jQuery, but anyhow. This is how jQuery essentially works

```js
var jQuery = function(css_rule) {
  var elements = find_elements_by(css_rule);

  for (var i=0; i < elements.length; i++) {
    this[i] = elements[i];
  }

  this.length = elements.length;
};

jQuery.prototype.addClass = function(name) {
  for (var i=0; i < this.length; i++) {
    this[i].className += " "+ name;
  }
};
```

Well, it's a bit more complicated than that, but basically it's a plain JavaScript class, which mimics an Array. It stores references to a list of elements inside itself and then loops through every dom-node in all the methods that manipulate with something.

This approach solves the problem of prototype pollution, because all the methods stored in the `jQuery` object, and it also makes it fairly simple to extend the framework with plugins.

The problem with jQuery-like frameworks is that they are great for simple cases, when all you need is to do some basic dom-manipulations or make some ajax-requests. But when you want to write some complex logic, it turns out that `jQuery` is just a flat list of functions, much like `PHP` which has the same exact problems. The code gets messy, you always shovel things into the `$` function, and plugins tend to screw with jQuery itself by adding more and more methods into jQuery's prototype.

## The OO DOM-Wrappers

The idea of object oriented dom-wrappers derives from the jQuery like frameworks, but instead of making a flat list of methods that loop through a list of elements, oo dom-wrappers wrap every single dom-element separately. In the essence it looks like that

```js
var Element = function(raw_dom_element) {
  this._ = raw_dom_element;
};

Element.prototype.addClass = function(name) {
  this._.className += " "+ name;
};
```

This might not look like a lot of a change, but in reality it changes the development paradigm completely. See, now instead of writing spaghetti code that use a flat list of _functions_, you can use proper inheritance features.

For example, you might have a separated class for handling web-forms, which will inherit the basic `Element` functionality and extend it with the form specific features

```js
var Form = new Class(Element, {
  send: function() {
    // sending the form via AJAX
  },

  values: function() {
    // collecting the form values
  }
});
```

You obviously can inherit this generic class further and say make some other, application specific forms that can validate themselves

```js
var MySmartForm = new Class(Form, {
  send: function() {
    if (this.isValid()) {
      this.$super(); // making a parent class call
    }
  },

  isValid: function() {
    return this.values().name != false; // not blank
  }
});
```

On every level of inheritance you have access to all your parent class functionality and you can extend and overload it in any way you like.

## What Does It Give You?

The crucial thing about having classes and inheritance is that now you can properly structure your code. Every complete logical block can be written in a separated, highly maintainable class with great deal of reusability.

No more writing spaghetti code. With classes you can organize your code in a proper way, have code structure, methods, use software design patterns, create proper APIs for your application and use unit testing for development.

No more screwing around with the system. When you use OO dom-wrappers, you don't pollute the system namespace, in fact you don't touch the core system at all. Every new class, widget or extension builds a new, completely separated branch of functionality. This way plugins can safely coexist and reuse each other.

## What Else Is There?

Besides the big-boy OO toys, using dom-wrappers instead of jquery-like collections processing gives you a bunch of other nice effects.

First of all, it's plainly faster. [RightJS](http://rightjs.org), which pioneered OO dom-wrappers, in various [head to head comparisons](http://rightjs.org/benchmarks) goes way faster than jQuery in almost every imaginable situation.

And there is a good reason for that. Because OO dom-wrappers don't copy lists of elements and they don't go through all of them in every method. And because in normal life you manipulate with just one or two elements, no time is wasted on looping through them.

Secondly, the result code is much smaller. Because methods in OO dom-wrappers do just what they supposed to, there is no code for constant looping through lists of elements and as the result, #RightJS, while having practically all the same functionality as #jQuery, weights almost half of it (yes, gzipped).

And thirdly, because all the subclasses use the same basic `Element` class, everything and everywhere has the same API. It doesn't matter whether you have a calendar, color picker or a lightbox they all have the same standard collection of methods and you can `hide()`, `show()` or `addClass()` on all of them without even going into the documentation. That saves a lot of time on digging around and wondering how a third party plugin called this method and that feature. All of them have standard and familiar API.

## The Conclusion

OO dom-wrappers is a very simple concept, which can give you a great deal of change in the way you develop #JavaScript applications. It doesn't make much of a difference in small and simple cases, but when you develop complex interfaces, oo dom-wrappers can give the very things that were inherently missing in JavaScript, a proper code structure and API standardization.

And that my friends is a lot.