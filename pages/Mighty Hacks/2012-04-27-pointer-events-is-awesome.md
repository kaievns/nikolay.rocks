# Pointer Events Is Awesome

While I have the urge to share this little #css trick. Lets say you have a list of stuff, and by `stuff` I mean a list of mixed content entries. Sorta like this one

![a dummy list of stuff](/images/2012/04/1-y87O.png)

And if you're wondering, no, I'm not making a porno site, just thought it might get you interested in the topic :)

So, you have a list of stuff, and as with any list of stuff, at some point, you want to highlight the current item on the list. Assuming you have only the `.current` class on one of the items, how do you do that?

```css
li.current {
  background: pink;
}
```

Surely, that might work, but if you call yourself a proper #css junkie, you certainly wouldn't feel satisfied with that. Lets think bigger and fancier, how about making a little overlay with the `:after` selector? Say, like that

```css
li {
  position:   relative;
}
li.current:after {
  content:    ' ';
  position:   absolute;
  left:       0px;
  top:        0px;
  width:      100%;
  height:     100%;
  background: rgba(255,255,200,0.5);
}
```

That sounds fancy isn't it? That actually looks fancy too. Check it out

![list of stuff with css generated overlay](/images/2012/04/2-HSd5.png)

You can just tint the whole thing with some fancy color, maybe even make some nice looking gradients with `rgba` colors as I described in [one of my previous posts](http://theosom.com/p/A07g). There are quite a few options open up.

One problem though, it won't work. (hey, i'm trying to make some narrative in here!) This css generated layer will block all the content underneath itself, and if some poor bastard will try to click one of the pretty lady pictures or any links on a highlighted entry, the click will land on the generated overlay and nothing will happen.

Luckily for us, there is this awesome css property called [pointer-events](https://developer.mozilla.org/en/CSS/pointer-events), which basically defines how elements should react on mouse/touchscreen events, and if you set it to `none` like so

```css
li.current:after {
  .....
  pointer-events:none;
}
```

All the mouse events (including clicks and hovers) will fall through it, just like if this element didn't exist. I've made you a little demo, [check it out](http://jsfiddle.net/G6CwN/)!

But, you know how those stories with miraculous escape work. In the end, the evil, after being defeated, crawls down in some dark hole and waits for the sequel.

Despite of all the potential awesomeness `pointer-events` [at the moment](http://caniuse.com/pointer-events) supported only by chrome, safari and firefox. I would gladly tell IE users to go fuck themselves, but `pointer-events` is not supported by any mobile browsers yet.

So, the story is to be continued...