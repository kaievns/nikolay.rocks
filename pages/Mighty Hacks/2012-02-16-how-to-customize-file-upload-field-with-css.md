# How To Customize File Upload Field With CSS

You know what is the problem with the `input type="file"` fields. They are ugly. More of that, they are ugly differently in different browsers (yes, mozilla, I'm talking about you). But the worst part is that you can't really do much with them by using #CSS.

Some folks try to hide file fields with `display: none` and then fiddle with them by using JavaScript, but it doesn't work either, because there is a whole bunch of limitations for the `type="file"` input fields to prevent no good people from snatching your files. You can't assign the `value` property, you can't even trigger it to show the file choosing dialog without the user clicking directly on the input field.


## So, How Do We Hack It?

The solution is actually quite simple. The trick here is to create a `DIV` which will play the role of your pretty button and put the file input inside of it along with the inner text. Say kinda like that

```html
<div class="button">
  <input type="file" />
  Upload a file!
</div>
```

After that, you need to add a bit of CSS hackery and make the file input to be absolutely positioned over the main text, and then hide it with `opacity: 0`.

```css
.button {
    position: relative;
    padding: .1em 1em;
    background: #DDD;
    border: 1px solid #AAA;
    display: inline-block;
    overflow: hidden;
}

.button input[type="file"] {
    position: absolute;
    left: 0px;
    top:  0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 2;
    cursor: default;
}​
```

There are several important moments you need to keep in mind. Firstly, you have to use `opacity: 0`, not `visibility: hidden` option, because the other way it won't be accessible. Secondly, you need to add the `overflow: hidden` for the button element itself, because in Firefox you can't really change the size of a file input and it will stick out of your button, probably covering some other elements on your page. And finally, don't forget the `z-index: 2` so that when a user clicks the button, he clicked the input field, not the text below it.

That's basically the hack. You can see the [live demo](http://jsfiddle.net/6ASWA/) at [jsfiddle](http://jsfiddle.net).


## Known Issues

Also keep in mind that in Firefox, you can't really change the height of a file input. You kinda can, but weirdly enough it will change the height of the button part of the widget, the text part of it will still be relatively small. So, don't make your button too tall, otherwise there will be empty spaces above and below it and clicks might miss the hidden field.

Also in the same Firefox, you can't change the width of a file input by using CSS, so if you're planning of making some wide fake input field, you should set something like `size="99"` on your hidden input right in your HTML. Then Firefox will make a large field and it will cover your whole widget.

That's the whole thing. Enjoy!