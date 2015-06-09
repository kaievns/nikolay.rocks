# More Rainbows! Or Why You Should Switch To Atom

I've been in love with the [atom editor](https://atom.io) for a while now. So, I kinda feel like I have to write something about it, but instead thought I'll "show" something  :)

Open up your atom editor, then go to `Atom -> Open Your Stylesheet`, then copy paste thing below in that file and hit `Save`

```css
atom-text-editor::shadow .cursors {
  .cursor {
    transition: background-position 0.3s linear;
    opacity:       0.5;
    background:    gray;
    border:        none;
    border-radius: 1px;
    background-image: linear-gradient(-45deg,
      rgb(255, 0, 0)   0%,
      rgb(255, 255, 0) 16%,
      rgb(0, 255, 0)   32%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255)   66%,
      rgb(255, 0, 255) 82%,
      rgb(255, 0, 0)   100%
    );
    background-size: 5em 100%;
    background-position: 0% 0px;
  }

  &.blink-off .cursor {
    visibility: visible;
    background-position: 100% 0px;
    transition: none;
  }
}
```

Enjoy! (in case you still resist the future, [i got ya covered](https://twitter.com/nemshilov/status/578362578784514049)!)

# But Seriously

One of the biggest sale point for me is that atom is a browser, which means it's all #css and #javascript though and through. And I kinda do css and javascript all day, every day, so I can do whatever I want with the thing. Hell, I even can annoy Putin and friends with it (what a nerdy way of demonstrating your support and disobedience!).

Bet you can't do that with Vim!

# PS: Extra Weirdness!

One more. I didn't make it myself, but found on the Internetz. Put this into your editor when you feel down.

```css
atom-text-editor {
	-webkit-animation: rainbow 3s linear infinite;
}

@-webkit-keyframes rainbow {
	0%   { -webkit-filter: hue-rotate(0deg);   }
	100% { -webkit-filter: hue-rotate(360deg); }
}
```

That will remind you of the good old days you had in uni/college (I know you did) and maybe will trigger your creativity :)