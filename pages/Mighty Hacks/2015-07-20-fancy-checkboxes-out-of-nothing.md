# Fancy Checkboxes Out Of Nothing

We are continuing our series of posts about minimalistic markup
and #css black voodoo. And today I'm showing, how to convert
this:

```html
<input type="checkbox" />
<input type="checkbox" checked="checked" />
```

Into this (click, click, click):

<p class="full-example">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .full-example input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
    cursor: pointer;
    background-color: white;
    background-repeat: no-repeat;
    background-image:
      radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 54%),
      radial-gradient(circle, rgba(0,0,0,.3) 54%, rgba(0,0,0,0) 56%);
    background-size: 100% 100%, 100%, 100%;
    background-position: -1em -0.0em, -.95em 0.1em;
    transform: translateX(0);
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .full-example input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
    background-position: 0.95em -0.0em, 1em 0.1em;
  }
  .full-example input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

Without any extra elements, or labels, or anything else. Just
pure #CSS and a single #HTML element.

__NOTE__: The point of this article is to show the basic principle, you might
wanna use an [autoprefixer](https://github.com/postcss/autoprefixer) in order
to make those snippets work properly in a real life situation.

## The Starting Point

The magic sauce to the whole thing is really the `appearance` css
property, by assigning it to `none` you can make a checkbox element
to look like a plain DIV. For example:

```css
input[type="checkbox"] {
  appearance: none;
  width:      6em;
  height:     4em;
  border:    .15em solid rgba(0,0,0,.1);
}
input[type="checkbox"]:checked {
  background: green;
}
```

Will make the browser to render this (click it!):

<p class="step-1">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-1 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
  }
  .step-1 input[type="checkbox"]:checked {
    background: green;
  }
  .step-1 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

Lets also add some `border-radius` and animations to make it look
nicer:

```css
input[type="checkbox"] {
  appearance: none;
  width:      6em;
  height:     4em;
  border:    .15em solid rgba(0,0,0,.1);
  border-radius: 2em;
  transition: background .2s linear;
}
input[type="checkbox"]:checked {
  background-color: rgba(0,255,0, .5);
}
```

<p class="step-2">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-2 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
  }
  .step-2 input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
  }
  .step-2 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

## The Knobs

Now, lets add the round knobs. In a situation like this, the
first instinct people usually have is to use a `:before` element
and make it round as a normal div. But, the problem is that
browsers won't animate position changes on those auto-generated
elements. And the end experience won't be that slick and awe inducing
as anticipated.

To combat the problem, we will use the `background-image` property
in conjunction with a `radial-gradient` image. The big difference
in this case is that, when done right `transition: background`
_will animate_ the changes in the `:checked` state! Lets see how
it works in principle:

```css
input[type="checkbox"] {
  ...
  background-repeat: no-repeat;
  background-image:
    radial-gradient(circle, yellow 50%, transparent 54%);
  background-size: 100% 100%;
  background-position: -1em 0;
}
input[type="checkbox"]:checked {
  ...
  background-position: 1em;
}
```

<p class="step-3">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-3 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
    background-repeat: no-repeat;
    background-image:
      radial-gradient(circle, yellow 50%, transparent 54%);
    background-size: 100% 100%;
    background-position: -1em 0;
  }
  .step-3 input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
    background-position: 1em;
  }
  .step-3 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

Try to click them, you should see how they move nice and slow from
end to end to flip the state. And also, notice how the background
color also changes progressively.

Now, lets make it a bit more complicated. Lets add the knob shadow,
so it would look like the real deal. To do that we will basically
create two `radial-gradient` circles, one under another. It's pretty
much the same thing, just a bit more complex:

```css
input[type="checkbox"] {
  ...
  background-image:
    radial-gradient(circle, white 50%, transparent 54%),
    radial-gradient(circle, grey 54%, transparent 56%);
  background-size: 100% 100%, 100% 100%;
  background-position: -1em 0, -0.95em 0.1em;
}
input[type="checkbox"]:checked {
  ...
  background-position: 1em 0, 0.95em 0.1em;
}
```

<p class="step-4">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-4 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
    background-repeat: no-repeat;
    background-image:
      radial-gradient(circle, white 50%, transparent 54%),
      radial-gradient(circle, grey 54%, transparent 56%);
    background-size: 100% 100%, 100% 100%;
    background-position: -1em 0, -0.95em 0.1em;
  }
  .step-4 input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
    background-position: 0.95em -0.0em, 1em 0.1em;
  }
  .step-4 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

## The Black Voodoo

The example above looks kinda good, but we can improve on that with
some final touches. Firstly, you might notice that the edges of the
circles look a bit pixelated. The problem there is that most browsers
are not so good at calculating gradients from named colors like
`white` to `transparent`. You can largely help the case by specifying
the colors in `rgba` values, like so

```css
input[type="checkbox"] {
  radial-gradient(circle, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 54%),
  radial-gradient(circle, rgba(0,0,0,.3) 54%, rgba(0,0,0,0) 56%);
}
```

<p class="step-5">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-5 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
    background-repeat: no-repeat;
    background-image:
      radial-gradient(circle, white 50%, transparent 54%),
      radial-gradient(circle, grey 54%, transparent 56%);
    background-size: 100% 100%, 100% 100%;
    background-position: -1em 0, -0.95em 0.1em;
  }
  .step-5 input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
    background-position: 0.95em -0.0em, 1em 0.1em;
  }
  .step-5 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>

And for the final touch add this to your css

```
input[type="checkbox"] {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
```

<p class="step-6">
  <input type="checkbox" />
  <input type="checkbox" checked="checked" />
</p>

<style class="text/css">
  .step-6 input[type="checkbox"] {
    appearance: none;
    outline: none;
    width:  6em;
    height: 4em;
    border: .15em solid rgba(0,0,0,.1);
    border-radius: 2em;
    transition: background .2s linear;
    background-repeat: no-repeat;
    background-image:
      radial-gradient(circle, white 50%, transparent 54%),
      radial-gradient(circle, grey 54%, transparent 56%);
    background-size: 100% 100%, 100% 100%;
    background-position: -1em 0, -0.95em 0.1em;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .step-6 input[type="checkbox"]:checked {
    background-color: rgba(0,255,0, .5);
    background-position: 0.95em -0.0em, 1em 0.1em;
  }
  .step-6 input[type="checkbox"]:checked:before {
    display: none;
  }
</style>


This will remove a weir flickering on mobile devices when a user
taps the switch box. Normally a browser will try to highlight the
tap, this hack will disable it and the user will see a smooth,
uninterrupted css transition.

## The Conclusion

Well, here you go. We live in such blessed times for the front
end development. With `appareance:none`, multiple backgrounds and
a bit of imagination, we can redraw pretty much any built in #html
element into a thing of beauty and keep the markup pristine!
