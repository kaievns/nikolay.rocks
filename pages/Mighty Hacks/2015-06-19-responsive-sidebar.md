# Responsive Sidebar Out Of Nothing

If you're looking at this page in a desktop browser, try to shrink the
browser's window to a narrow, mobile like width. You should see that
the sidebar folds and becomes this sandwich icon in the header. So,
today I'm explaining how to do that with a minimal markup and some
basic #css voodoo.

## The Problem

I, personally, like my markup as simple as I can get away with. There are
couple of reasons for that. Firstly, obviously, when you don't have much
of a clutter of css classes and strange seemingly purposeless elements,
it is much easier to reason about the system in general. When you see a
bunch of simple, semantically marked elements, you can quickly build the
app structure in your head, and then move things around with a good dose
of confidence.

Secondly, keeping markup simple kind of forces you to think more about
the context of those elements; and good cascading styles are all about
context. It does, on average, make you write more #CSS, but it makes
you write better, more flexible CSS. In the end, it really pays off in
cases like #responsive design or graceful degradation in older browsers.

Let me demonstrate. If you look at this page via an inspector, you'll
see a structure kind of like that:

```html
<body>
  <header>...</header>
  <main>
    <div class="paddings">
      <article>
        Main article text
      </article>
      <aside>
        The sidebar stuff
      </aside>
    </div>
  </main>
  <footer>...</fotter>
</body>
```

Then this structure is transformed with some simple #flexbox css rules.

```css
main .paddings {
  display: flex;

  article {
    flex: 1;
  }

  aside {
    width: 300px;
  }
}
```

So, basically it's a very simple two columns deal where the sidebar has
a fixed width and the `ARTICLE` element takes the rest of the available
space in the container.

## Make It Responsive

As I mentioned before, when it comes to minimalistic markup, you need
to think about the context, and in this case the context will be a different
width of the browser window. I personally prefer to show the sidebar on
an iPad in the landscape mode, and then fold it in the portrait orientation.
That makes it nicely stashed away on all the mobile phones as well.

So, in this case I'm using a media query with `max-width: 768px`

```css
@media (max-width: 768px) {
  main aside {
    position:   absoulte;
    top:        0;
    right:      0;
    min-height: 100%;
  }
}
```

This will break the flexbox structure and will make the sidebar to appear
as a tall column on the right, which will hover over the main content. Kind
of like the open state sidebar.

Now we need to add a toggler element that will flip the state of the
sidebar from open to hidden. I would normally just put an `A` element
right on the inside of the `ASIDE` block.

```html
<aside>
  <a href="" class="toggler"></a>

  <section class="about"> ... </section>
  <section class="contacts"> ... </section>
  <section class="categories"> ... </section>

  ...
</aside>
```

You will need to make that `.toggler` element hidden on desktops and only
show the element when the sidebar folds. That is simple

```css
main aside {
  a.toggler {
    display: none;
  }
}

@media (max-width: 768px) {
  main aside {
    a.toggler {
      display:  block;
      width:    2em;
      height:   2em;
      position: absolute;
      left:    -4em;
      top:      1em;
      /* the rest of the styles */
    }
  }
}
```

This way the toggler will only appear when it's needed. Once you have that,
you will need to connect the button to some piece of javascript that will
toggle the `open` class on the `ASIDE` element.

```css
@media (max-width: 768px) {
  main aside {
    position:   absoulte;
    top:        0;
    right:      0;
    min-height: 100%;
    transform:  translateX(300px);

    &.open {
      transform: translateX(0px);
    }
  }
}
```

As you can see I used the `translateX` property to move the sidebar right
and hide it beneath the right edge of the screen. And then, when the `open`
class is added, I move it back into the view.

## Lets Make It Smooth!

It is possible to do the same thing by using the `right: -300px` property
on the element and then reset it to `0px` with the `open` class, but I
prefer to use `translate` because, well, one way or another you'll boss
will want the sidebar animated, and then, `trasnform` will save your skin.

See, the problem is that when you use geometry attributes like `right`, `left`,
`width`, etc. The browser will have to recalculate the page geometry on every
step an animation. That makes the movement often look quite jerky.

But, when you use `transform: translate` properties, the browser starts cheating.
It basically takes a picture of the element and then moves it across the screen.
So, visually it might look like they do the same thing, but in reality `transform`
will use much less CPU resources and hence animate it smoothly.

```css
@media (max-width: 768px) {
  main aside {
    // ....
    transform:  translateX(300px);
    transition: transform .4s ease-out;

    &.open {
      transform: translateX(0px);
    }
  }
}
```

Now the sidebar should move smoothly back and fourth!

## The Locker Screen

One more thing you will need for you awesome responsive sidebar is a an
overlay that will lock and shade out the the main content while the
sidebar is visible.

That can be easily done with a css generated element.

```css
@media (max-width: 768px) {
  main aside {
    // ....
    &.open {
      // ...

      &:before {
        content:    " ";
        display:    block;
        background: rgba(0,0,0,0.4);
        position:   absolute;
        height:     100%;
        width:      100vw;
        top:        0;
        right:      100%;
      }
    }
  }
}
```

As you can see, it is just a plain `DIV` element with a semi-transparent background.
The only tricky part is that I used the CSS3 `100vw` value, which makes the block
to have the same width as the window. And then I moved it completely out of the `ASIDE`
element with the `right:100%` setting.

## Conclusions

That is pretty much all the basics of the implementation. After that, you can add
some bells and whistles, like a rotating toggler icon, and so on, but the main mechanics
will remain the same.

The cool thing about this approach is that it is highly flexible and has a great deal
of separation of the concerns. Your HTML and JavaScript are only concerned with providing
the controls and keeping the state; all the visual styling is done completely in the #CSS
layer.

And the best thing is, that we kept the CSS itself highly contextualized and declarative.
Every state is clearly described and you can extend them with more fine grain details
without chances to ruin the main functionality or a need to change the DOM structure.
