# Not Your Daddy's Links Highlighting

Back in 1999, the only thing you really needed to know to impress someone
with #css was this:

```css
a { text-decoration: none; }
a:hover { text-decoration: underline; }
```

After that you could count on achieving the status of an awesome webmaster and
could start your own web-development consulting business. Or something like that.

Well, the times have changed a bit. And although, despite of all our hopes and
dreams, people still use mouses and trackpads, technology changed rather
dramatically. And, in this environment, it is just a crime to keep adding
`text-decoration` to `a:hover` styles. We can do so much better!

## The Basic Principle

The basic principle of all the examples I'll post here is to generate an
animated background image. Hover your mouse over this one

<h1><a href="#" class="example-1">Hello world!</a></h1>
<style>
  a.example-1, a.example-1:hover {
    text-decoration:  none;
    background-image: linear-gradient(0deg,rgb(53,152,219),rgb(53,152,219));
    background-size:  0% 0.1em;
    background-position: center bottom;
    background-repeat: no-repeat;
    transition: background-size 0.2s;
  }
  a.example-1:hover {
    background-size: 100% 0.1em;
  }
</style>

You can achieve this effect with a code that looks kind of like that:

```css
a {
  background-image: linear-gradient(0deg,blue,blue);
  background-size:  0% 0.1em;
  background-position: center bottom;
  background-repeat: no-repeat;
  transition: background-size 0.2s;

  &:hover {
    background-size: 100% 0.1em;
  }
}
```

Firstly we generate a blue background and we set its size to be `100% 0.1em`
on hovers. Browsers are perfectly capable of animating those properties, so
you will see this stretching line transition.

## Variations

You can create some variations on this feature by playing with the
`background-position` property:

<h1><a href="#" class="example-2">Hello world!</a></h1>
<style>
  a.example-2, a.example-2:hover {
    text-decoration: none;
    background-image: linear-gradient(0deg,rgb(53,152,219),rgb(53,152,219));
    background-size:  0% 0.1em;
    background-position: left bottom;
    background-repeat: no-repeat;
    transition: background-size 0.2s;
  }
  a.example-2:hover {
    background-size: 100% 0.1em;
  }
</style>

```css
a { background-position: left bottom; }
```

<h1><a href="#" class="example-3">Hello world!</a></h1>
<style>
  a.example-3, a.example-3:hover {
    text-decoration: none;
    background-image: linear-gradient(0deg,rgb(53,152,219),rgb(53,152,219));
    background-size:  0% 0.1em;
    background-position: right bottom;
    background-repeat: no-repeat;
    transition: background-size 0.2s;
  }
  a.example-3:hover {
    background-size: 100% 0.1em;
  }
</style>

```css
a { background-position: right bottom; }
```

Or, if you feel particularly evil, you could even use several background images
to create even more complex animation:

<h1><a href="#" class="example-4">Hello world!</a></h1>
<style>
  a.example-4, a.example-4:hover {
    text-decoration: none;
    background-image:
      linear-gradient(0deg,rgb(53,152,219),rgb(53,152,219)),
      linear-gradient(0deg,rgb(53,152,219),rgb(53,152,219));
    background-size:  0% 0.1em, 0% 0.1em;
    background-position: left bottom, right bottom;
    background-repeat: no-repeat;
    transition: background-size 0.2s;
  }
  a.example-4:hover {
    background-size: 50% 0.1em, 50% 0.1em;
  }
</style>

```css
a {
  background-image:
    linear-gradient(0deg,blue,blue),
    linear-gradient(0deg,blue,blue);
  background-size:  0% 0.1em, 0% 0.1em;
  background-position: left bottom, right bottom;
  background-repeat: no-repeat;
  transition: background-size 0.2s;

  &:hover {
    background-size: 50% 0.1em, 50% 0.1em;
  }
}
```

Multiple backgrounds animations can give you quite a variety of options if you
manage to put them to a good use.

## Rainbows! Give Me Rainbows!

And the last but not least example. Rainbows!

<h1><a href="#" class="example-5">Hello world!</a></h1>
<style>
  a.example-5, a.example-5:hover {
    text-decoration: none;
    background-image: linear-gradient(90deg,
      rgb(255,0,0)   0%,
      rgb(255,255,0) 16%,
      rgb(0,255,0)   33%,
      rgb(0,255,255) 50%,
      rgb(0,0,255)   66%,
      rgb(255,0,255) 84%,
      rgb(255,0,0)   100%
    );
    background-size:  0% 0.1em;
    background-position: left bottom;
    background-repeat: repeat-x;
    transition: none;
  }
  a.example-5:hover {
    background-size:  100% 0.1em;
    animation: rotate-bg 10s infinite linear;
  }
  @keyframes rotate-bg {
    0% { background-position: 0 100%; }
    100% { background-position: 50em 100%; }
  }
</style>

```css
a, a:hover {
  text-decoration: none;
}
a:hover {
  background-image: linear-gradient(90deg,
    rgb(255,0,0)   0%,
    rgb(255,255,0) 16%,
    rgb(0,255,0)   33%,
    rgb(0,255,255) 50%,
    rgb(0,0,255)   66%,
    rgb(255,0,255) 84%,
    rgb(255,0,0)   100%
  );
  background-size:  100% 0.1em;
  background-repeat: repeat-x;
  animation: rotate-bg 10s infinite linear;
}
@keyframes rotate-bg {
  0% { background-position: 0 100%; }
  100% { background-position: 50em 100%; }
}
```

This example is a bit more complex, but essentially it uses the same principle.
Firstly, we generate a rainbowy linear gradient that goes from end to end. But
then, instead of running transformations on the `background-size` property, we
make the background to `repeat-x` and then animate its position to change
from `0` to some large enough number like `50em`. This will create an illusion
of an infinitely running rainbow.

Well, I hope you had fun and got some inspiration from this article. Now, go
build something awesome!
