# How To Center A Block Vertically With CSS

Sometimes you need to position one #HTML block in the center of another one, and you need to do that both horizontally _and_ vertically. The closest example would be a modal dialog

```html
<div class="screen-locker">
  <div class="dialog">
    Hello world!
  </div>
</div>
```

Horizontal alignment is quite simple, you just use the old trick with `text-align` and `display: inline-block` #css properties

```css
div.screen-locker {
  text-align: center;
}
div.dialog {
  display: inline-block;
  text-align: left;
}
```

but vertical alignment is a bit tricky one. You can't just say `vertical-align: center` on your dialog element, because `vertical-align` says how to align sibling elements, not how a particular element should be aligned inside of it's parent element.

Some people try to solve the problem with JavaScript by calculating the dialog element's position from it's height and available free space. But there is actually a very simple pure css based hack for that.

## The Hack

The hack is pretty simple. All you need to do is add one more hidden element in your html code

```html
<div class="screen-locker">
  <div class="aligner"></div>
  <div class="dialog">
    Hello world!
  </div>
</div>
```

The purpose of this element is to center the dialog element vertically. The trick is that you make it have the height of `100%` and then align it vertically with the dialog element, say like that

```css
div.screen-locker {
  text-align: center;
  position: relative;
}
div.aligner {
  display: inline-block;
  width: 1px;
  height: 100%;
  vertical-align: middle;
}
div.dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
```

and because the aligner DIV will have the 100% height it will center the dialog DIV vertically as well. No need for any JavaScript voodoo, it will stay perfectly in the center and will get repositioned automatically if the browser window got stretched.

Enjoy!