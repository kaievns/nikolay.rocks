# Easy Peasy Vector Icons

There are a few techniques we used through the history of
web development in order to add icons to the UI. Individual GIF
files with IMG tags, PNG icons and backgrounds in #css, font icons
and `content` properties. But, there is one another, quite simple
and lean technique that is not that well known. It uses #css with
embedded #svg content. I've been using it quite extensively lately
on my projects, so I thought I could share the idea.

## The Problem

Although font icons are fantastic, in many cases they might
be an overkill and unnecessary maintenance overhead. Firstly,
you have a big ass web-font blob to carry around and secondly,
a substantial chunk of css mappings for the font glyphs that
also need to be loaded up one way or another.

It might be fine for a large web app, like a CMS or something
like that, where you use literally dozens of icons all over
the place. In this case it makes sense to have a whole set
of icons available at your disposal at any time.

But, for a small project, like say this blog for example, you
might need just a hand full of icons. So, you might want to
consider some simpler options.

## The Option

There is a nice alternative to the font based icons that will
provide you with smooth, low maintenance vector icons. You
can embed #SVG based icons directly into a piece of #CSS.

Firstly, you will need a SVG icon. I have found an awesome
source of those, it's called [iconfinder.com](https://www.iconfinder.com).
It has plenty of icons in various formats, both free and commercial
(for a reasonable price). Just go in there, find any vector icon
that has a plain SVG option, and download the `.svg` file.

Now, let's presume you have some #html element, like a link for
example, where you want to add the icon. Say a `delete`
link like this one:

```html
<a href="javascript:deleteStuff();" class="delete">
  Delete!
</a>
```

Now you can embed that SVG icon directly into the link with a
simple piece of CSS like so:

```css
a.delete {
  white-space: nowrap;
  display:     inline-block;

  &:before {
    content:             " ";
    display:             inline-block;
    width:               1em;
    height:              1em;
    background-image:    url('data:image/svg+xml;utf8,<svg ....>...</svg>');
    background-repeat:   no-repeat;
    background-position: center center;
    background-size:     contain;
  }
}
```

The trick here is the `background-image: url('...')` section. You
will need to open up that `.svg` file you downloaded form the iconfinder
and copy the part of it's content that has the `<svg>...</svg>` tags
in it. Sometimes that's all it will have, but sometimes it might have things
like `<!DOCTYPE` or `<?xml version="1.0" ?>` at the beginning of the file,
cut it out.

If you have done everything right, you will see something like this:

<p class="step-1">
  <a href="javascript:alert('deleting!')" class="delete">Delete!</a>
  <a href="javascript:alert('deleting!')" class="delete" style="font-size: 2em">Delete!</a>
  <a href="javascript:alert('deleting!')" class="delete" style="font-size: 3em">Delete!</a>
</p>
<style type="text/css">
  .step-1 a.delete {
    white-space: nowrap;
    display:     inline-block;
    margin-right: 1rem;
  }
  .step-1 a.delete:before {
    display:             inline-block;
    width:               1em;
    height:              1em;
    vertical-align:      middle;
    content:             " ";
    background-image:    url('data:image/svg+xml;utf8,<svg enable-background="new 0 0 500 500" height="500px" id="Layer_1" version="1.1" viewBox="0 0 500 500" width="500px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M418.081,122.802h-59.057V68.29  c0-20.077-16.262-36.34-36.341-36.34H177.316c-20.078,0-36.342,16.264-36.342,36.34v54.513H81.918  c-12.536,0-22.713,10.177-22.713,22.715c0,12.536,10.177,22.713,22.713,22.713h13.629v263.48c0,20.078,16.262,36.34,36.341,36.34  h236.224c20.078,0,36.341-16.262,36.341-36.34v-263.48h13.629c12.535,0,22.715-10.177,22.715-22.713  C440.796,132.979,430.616,122.802,418.081,122.802z M313.598,122.802H186.4V97.367c0-11.083,8.909-19.991,19.991-19.991h87.216  c11.084,0,19.99,8.909,19.99,19.991V122.802z M186.4,186.401v218.051c0,9.992-8.181,18.172-18.17,18.172s-18.17-8.18-18.17-18.172  V186.401c0-9.989,8.18-18.17,18.17-18.17S186.4,176.412,186.4,186.401z M268.172,186.401v218.051  c0,9.992-8.181,18.172-18.172,18.172c-9.99,0-18.17-8.18-18.17-18.172V186.401c0-9.989,8.181-18.17,18.17-18.17  C259.991,168.231,268.172,176.412,268.172,186.401z M349.938,186.401v218.051c0,9.992-8.181,18.172-18.169,18.172  c-9.99,0-18.172-8.18-18.172-18.172V186.401c0-9.989,8.182-18.17,18.172-18.17C341.758,168.231,349.938,176.412,349.938,186.401z" fill-rule="evenodd"/></svg>');
    background-repeat:   no-repeat;
    background-position: center center;
    background-size:     contain;
    margin-right:        0.2em;
    margin-top:         -0.3em;
  }
</style>

As you can see, it scales perfectly when you change the `font-size`
property; because we have specified the size of the `:before` block
in `em` and made the `background-size: contain`.

If you're using #LESS preprocessor or such, it worth adding a simple
icons constructor like this:

```css
.add-icon(@data) {
  ...
  &:before {
    ...
    background-image: url(@data);
  }
}
```

And then embed your icons in links and buttons sort of like that

```css
@trash-icon: 'data:image/svg+xml;utf8,<svg ....>...</svg>';

a.delete {
  .add-icon(@trash-icon);
}
```

This way you can have the icons somewhere in a config and them quickly
reuse and embed them all over the place.

## Pros & Cons

As you can imagine, this approach has it's own merits and falls. Firstly,
you will have to handpick the icons yourself, which might be challenging
if you a design blind dev. Secondly, this approach is not that maintainable
in pure CSS; it's hard to judge from the code what's on the inside of the
image.

But the cool thing is that this is a very lean, extremely low overhead
solution where you need just a hand full icons. The SVG data will be
compressed really well by your web-server's `gzip` pipe. And as all the
data will be embedded right into CSS, there will be no dependent asset
files that you will have to drag around. All your icons will be available
immediately after the styles are loaded.

You can also hand pick all the icons you need and you won't be limited
to a particular vendor. You can mix them as you're pleased and pick the
best ones that fit your design. You also have an option to mix svg and
raster graphics if you feel like it. The `content` property will take
andy `base64` encoded PNG files as well if you need them.

And a final word of caution. Some resources might offer you a base64 encoded
SVG. Don't do it. SVG is a textual format (basically XML) and in it's
raw form will compress much better than the base64 encoded version. So,
there is really no point in using base64 encoding with SVG.
