# Force Long String Line Breaks In Pure CSS

When someone says "pure #css", somehow an image of potato puree pops up in my mind.

![Mmm, yummy!](http://thumb7.shutterstock.com/display_pic_with_logo/238252/238252,1329318553,1/stock-photo-potato-puree-95242723.jpg)

Since the dawn of the Internetz, human beings were cursed by the loooong strings
that don't have any spaces in them. Either it is a friend's prank in your guest
book, a hack from a naughty hacker or a legit business case. Sooner or later,
we all wrote something like this in our code:

```ruby
module HelpfulHelpers
  def force_line_breaks_in(string)
    string.gsub /(.{1,15})( +|$\n?)|(.{1,15})/, "\\1\\3<wbr/>"
  end
end
```

Yeah, I know, there is nothing as satisfying as a witty regular expression and
a set of unit tests that makes sure that you didn't screw up somewhere. Which
you usually do. Because computers.

## A Better Way

Well, I don't need to explain that this way of forcing line breaks in long lines
is ridiculous at best. We are burning baby dolphins alive on the server side to
solve a problem that happens on the front-end.

I couldn't take it anymore, so I googled, and it turned out one can do the
trick in pure css (mmmm, yummy...). Check this out!

<h2 class="force-break">Solongandthanksforallthefish!Sosadthatitshouldcometothis.Wetriedtowarnyouallthatyouaredead</h2>
<style>
  .force-break {
    word-break: break-all;
    width:      75%;
  }
</style>

It looks much simpler than one would think:

```css
.force-break {
  word-break: break-all;
}
```

And it's [well supported by all browsers](http://caniuse.com/word-break)

## Conclusion

Well, there is no real conclusion. Just learn #css and don't be this guy. That's all.

![](https://s-media-cache-ak0.pinimg.com/originals/db/73/e9/db73e9c3465f5dd391e53268e59c0bba.gif)
