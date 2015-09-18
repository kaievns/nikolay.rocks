# Minimalistic Yet Fully Featured HTML Layout

I'm continuing my mini series of articles about minimalistic #html markup and pure
#css hackery. And, today we are talking about building a very simple, yet fully
featured fixed-width page layout. So, get the homies, lets do this!

<iframe width="420" height="315" src="https://www.youtube.com/embed/4pZLq9RBUvw" frameborder="0" allowfullscreen></iframe>

-

## What & Why

Obviously, there are plenty of ways to build page layouts. Some are better, some are
betterer. But, in this particular case I'm interested in getting away with as slim HTML
markup as possible. The reason is simplicity and maintainability of code. The simpler the
code the easier it is to reason about and more time you can spend on important things.

So, in this case we are going to use a very minimal html markup that looks kind of like
this:

```html
<body>
  <header> Header stuff </header>
  <main>
    <article>
      Main page content
    </article>
    <aside>
      Sidebar content
    </aside>
  </main>
  <footer> Copyright (C) 2015 Nikolay </footer>
</body>
```

There are several reasons why this layout is awesome. Firstly, one can very quickly
get a sense of what's what. Tags like `header`, `main > article` and `footer` are
more than self explanatory. Secondly, there is literally zero scaffolding elements,
no extra wrapper DIVs or classes or anything like that, which gets rid of a lot of noise.
And lastly but not leastly, this layout will be very easy for robots to process.
Things like readers, bots and such will easily and reliably find your page main content
and display it to your users.

So, we are going to take this markup and turn it into a fully featured fixed-width
page layout. I'm going to use the marvels of modern technology such as #flexbox,
well coz it's awesome. But, if you feel like holding the progress of humanity back,
you can achieve the same thing with more traditionalist tools as well. Just with
a bit more code.

## Breaking It Up

So, firstly, lets outline the structure and put headers, footers, etc in their places.
That can be really easily done with some flexbox voodoo:

```css
body {
  display:        flex;
  flex-direction: column;

  > main {
    flex: 1;
  }
}
```

This will build you a structure kind of like this:

<div class="example-1 examplish">
  <div class="hdr"> Header stuff </div>
  <div class="mn">
    <div class="artcl"> Main article content </div>
    <div class="asd"> Sidebar content </div>
  </div>
  <div class="ftr">Copyright (C) 2015 Nikolay</div>
</div>

<style>
.examplish { background: rgb(255, 200, 255); height: 200px; min-width: 500px; overflow: auto; }
.examplish .hdr   { background: rgb(255, 200, 200); }
.examplish .ftr   { background: rgb(200, 255, 200); }
.examplish .mn    { background: rgb(200, 200, 255); }
.examplish .artcl { background: rgb(255, 255, 200); }
.examplish .asd   { background: rgb(200, 255, 255); }

.example-1 { display: flex; display: -webkit-flex;flex-direction: column; -webkit-flex-direction: column; }
.example-1 > .mn { flex: 1; -webkit-flex: 1; }
</style>

Again, you can achieve the same with more traditional css tools, but
your friends will judge you for that. Either way, the point here is
to get a vertical stack of the `header`, `main` and `footer` elements
with the `main` element taking all the available space.

Once we have that, we just repeat the same trick on `main` and `article`/`aside`
elements to split the central space vertically:

```css
body {
  display: flex;
  flex-direction: column;

  > main {
    flex: 1;
    display: flex;

    > article {
      flex: 1;
    }

    > aside {
      width: 300px;
    }
  }
}
```

This will render you a nice looking sidebar with `300px` width.

<div class="example-2 examplish">
  <div class="hdr"> Header stuff </div>
  <div class="mn">
    <div class="artcl"> Main article content </div>
    <div class="asd"> Sidebar content </div>
  </div>
  <div class="ftr">Copyright (C) 2015 Nikolay</div>
</div>

<style>
.example-2 { display: flex; display: -webkit-flex;flex-direction: column; -webkit-flex-direction: column; }
.example-2 > .mn { flex: 1; -webkit-flex: 1; display: flex; display: -webkit-flex; }
.example-2 > .mn > .artcl { flex: 1; -webkit-flex: 1; }
.example-2 > .mn > .asd { width: 200px; }
</style>

From here you can just add some paddings where needed and be done with it.
A very lean and simple way to start. The only problem is that this layout
will take the full width of the browser window. So, lets take it one step
further.

## Making Fixed Width

The question you might be asking yourself right now is: _how are we going
to make it fixed-width without extra wrappers?_ The answer is simple.

![](/images/magic.gif)

We are going to use some magic paddings on the `header`, `main` and `footer`
elements. See, instead of extra elements and margins, you can calculate horizontal
paddings directly on the top level elements with the CSS `calc()` function.
The thing is [well supported](http://caniuse.com/calc) by all browsers that
matter those days.

The magic sauce is really in setting the left and right paddings to a half
of the difference between the viewport width and the layout fixed-width. It is
actually very simple to calculate:

```css
body {
  > header, > main, > footer {
    padding: 1em calc(50% - 997px / 2);
  }
}
```

In this case I have set the vertical paddings to `1em` and horizontal paddings
to a half of the difference between the page width and desired layout width
`997px`. (half of the page width minus half of the layout width). That will
make it look kind of like that:

<div class="example-3 examplish">
  <div class="hdr"> Header stuff </div>
  <div class="mn">
    <div class="artcl"> Main article content </div>
    <div class="asd"> Sidebar content </div>
  </div>
  <div class="ftr">Copyright (C) 2015 Nikolay</div>
</div>

<style>
.example-3 { display: flex; display: -webkit-flex;flex-direction: column; -webkit-flex-direction: column; }
.example-3 > .mn { flex: 1; -webkit-flex: 1; display: flex; display: -webkit-flex; }
.example-3 > .mn > .artcl { flex: 1; -webkit-flex: 1; }
.example-3 > .mn > .asd { width: 200px; }
.example-3 > * { padding: 1em calc(50% - 80% / 2); }
</style>

## Final Touches

In most cases the implementation above will work fine. But, to avoid some edge
cases with nested size spaces, you might want to set `box-sizing` property
to `padding-box`:

```css
body {
  > header, > main, > footer {
    padding: 1em calc(50% - 997px / 2);
    box-sizing: padding-box;
  }
}
```

And another thing is that you need to add some extra paddings on the left
and right of the main blocks so that when a user makes a narrow window and
the page will start to scroll, you would have some nice looking gaps between
the content and the window edge. To do that we can use the same flexbox
trick and couple of css generated elements:

```css
body {
  > header, > main, > footer {
    ....
    display: flex;

    &:before, &:after {
      content: " ";
      width:   1em;
    }
  }
}
```

That will make sure that you always have some nice looking gaps on the sides
no matter what is the viewing context.

And the last thing is that you might want to make the whole thing responsive
and make it have breakpoints. Well, that's just too easy:

```css
body {
  > header, > main, > footer {
    ....
    padding: 1em calc(50% - 997px / 2); /* default */

    @media (max-width: 768px) { /* phone */
      padding: 1em calc(50% - 736px / 2);
    }

    @media (min-width: 992px) { /* tablet */
      padding: 1em calc(50% - 960px / 2);
    }

    @media (min-width: 1200px) { /* desktop */
      padding: 1em calc(50% - 1168px / 2);
    }
  }
}
```

And we are done!

## Conclusion

It might look like a long post, but the whole thing (without responsive hacks)
is actually preposterously compact.

```css
body {
  display:        flex;
  flex-direction: column;

  > header, > main, > footer {
    display:    flex;
    box-sizing: padding-box;
    padding:    1em calc(50% - 997px / 2);

    &:before, &:after { content: " "; width: 1em; }
  }

  > main
    flex: 1;

    > article { flex: 1; -webkit-flex: 1; }
    > aside { width: 300px; }
  }
}
```

That's all there is really is to it. And the cool part, is that due to its
simplicity and lack of wrapping elements — that would otherwise just get in
your way — there are a lot of things you can do with this markup.

Need to have two sidebars? Just add another `ASIDE` element in front of `ARTICLE`.
Don't want no sidebars? Remove both `ASIDE`s from the markup. Want the sidebar fold
on mobiles and stack up underneath the article? Too easy, just add a `@media`
query and change the `flex-direction` on the `MAIN` element to `column`.
And so on and so forth.

Well, that's pretty much the whole hack; i think you got the idea. Enjoy!
