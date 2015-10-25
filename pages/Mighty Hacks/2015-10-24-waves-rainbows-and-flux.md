# Making Rainbows With Ruby, Waves And A Flux Capacitor

So, rainbows. We need more of them! I think. But, in either case, I've been
working on this silly little Friday fun project of mine — I called it
[git rainbow](https://github.com/MadRabbit/git-rainbow). It's kind of like a
regular `git commit` but it uses some ANSI escape codes magic to make the
commit text to be colored as a rainbow!

![](https://github.com/MadRabbit/git-rainbow/raw/master/screen.png)

There is no particularly reasonable idea behind it. But, never the less, the
project presented a fun problem to solve:

> How do you generate a set of rainbow colors of an arbitrary length?

## Know Your Waves, Mate!

Here in Sydney, you inevitably learn about waves, trigonometry, frequencies and
other fun stuff. Like, how to go into the rain forest and not to be eaten by
[yowies](https://en.wikipedia.org/wiki/Yowie). I mean seriously, forget snakes,
spiders and sharks. Yowies are the ones you need to look out for!

Either way. Waves. Waves are awesome. They say everything is a wave. Just like
this one

```ruby
12.times.map { |i| "%0.2f" % Math.sin(Math::PI / 12 * 2 * i) }
# 0.00, 0.50, 0.87, 1.00, 0.87, 0.50, 0.00, -0.50, -0.87, -1.00, -0.87, -0.50, 0.00
```

That simple one-liner builds a sine wave that goes from `1` to `-1`  in 12 steps.
Awesome! But, why would we care?

I'm glad you asked! Because with that function we can build a sequence of color
brightness of an arbitrary size. We just need to normalize the sine `1..-1` values
to the standard RGB `0..255` values.

```ruby
size = 12
size.times.map do |i|
  sin = Math.sin(Math::PI / size * 2 * i)
  int = "%d" % (sin * 127 + 128)
end

# 128, 191, 237, 255, 237, 191, 128, 64, 18, 1, 18, 64, 128
```

Now if we hook up the [tco](https://rubygems.org/gems/tco) gem, which can spit out
the 256 colors ANSI codes in the console, we can visualize the result by feeding
the gem with a standard `hex` values.

```ruby
require 'tco'

size = 12
size.times.each do |i|
  sin = Math.sin(Math::PI / size * 2 * i)
  hex = "%02x" % (sin * 127 + 128)
  print Tco.bg("##{hex}#{hex}#{hex}", " ")
end
```

This will print out a gradient of colors kind of like this one

<div class="rainbow-test">
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>

<style>
  .rainbow-test {
    height: 1.5em;
  }
  .rainbow-test div {
    display: inline-block;
    height: 1.2em;
    width: 1em;
    float: left;
  }
</style>

## Phase Shift And Flux Capacitor

So, here is where the magic happens. A normal sine wave starts from `0` then goes
on its way to `1` and then down to -1. But, it's an endless function, technically
you can start the same wave anywhere by using what's known is a *phase shift*.

```ruby
size   = 12
phase1 = 0              # 0 deg
phase2 = Math::PI * 2/3 # 120 deg
phase3 = Math::PI * 4/3 # 240 deg

size.times.each do |i|  
  sin1 = Math.sin(Math::PI / size * 2 * i + phase1)
  sin2 = Math.sin(Math::PI / size * 2 * i + phase2)
  sin3 = Math.sin(Math::PI / size * 2 * i + phase3)
end
```

If we visualize that with the `tco` #ruby gem as we did before, you will see an
image kind of like this one:

<div class="rainbow-test">
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>
<div class="rainbow-test">
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(127, 127, 127)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
</div>
<div class="rainbow-test">
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(1, 1, 1)'></div>
  <div style='background: rgb(18, 18, 18)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
  <div style='background: rgb(127, 127, 127)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(255, 255, 255)'></div>
  <div style='background: rgb(237, 237, 237)'></div>
  <div style='background: rgb(191, 191, 191)'></div>
  <div style='background: rgb(128, 128, 128)'></div>
  <div style='background: rgb(64, 64, 64)'></div>
</div>

Each wave in this situation is shifted by `120deg`. If you present them in a
circle, it will look kind of like a flux capacitor:

![](http://2.media.bustedtees.cvcdn.com/f/-/bustedtees.49d8193f-536e-42c3-a009-c493535c.gif)

Now all you need to do is to replace those brightness levels in every phase with
`red`, `green` and `blue` channels!

```ruby
require 'tco'

size        = 12
red_phase   = 0              # 0 deg
blue_phase  = Math::PI * 2/3 # 120 deg
green_phase = Math::PI * 4/3 # 240 deg

size.times.each do |i|  
  red_sin   = Math.sin(Math::PI / size * 2 * i + red_phase)
  blue_sin  = Math.sin(Math::PI / size * 2 * i + blue_phase)
  green_sin = Math.sin(Math::PI / size * 2 * i + green_phase)

  red_hex   = "%02x" % ( red_sin   * 127 + 128)
  blue_hex  = "%02x" % ( blue_sin  * 127 + 128)
  green_hex = "%02x" % ( green_sin * 127 + 128)

  color     = "##{red_hex}#{green_hex}#{blue_hex}"
  print Tco.bg(color, " ")
end
```

And that will spit out the rainbow colors sequence of the given size!

<div class="rainbow-test">
  <div style="background:rgb(128, 18, 237)"></div>
  <div style="background:rgb(191, 1, 191)"></div>
  <div style="background:rgb(237, 18, 128)"></div>
  <div style="background:rgb(255, 64, 64)"></div>
  <div style="background:rgb(237, 127, 18)"></div>
  <div style="background:rgb(191, 191, 1)"></div>
  <div style="background:rgb(128, 237, 18)"></div>
  <div style="background:rgb(64, 255, 64)"></div>
  <div style="background:rgb(18, 237, 127)"></div>
  <div style="background:rgb(1, 191, 191)"></div>
  <div style="background:rgb(18, 128, 237)"></div>
  <div style="background:rgb(64, 64, 255)"></div>
</div>

You might need to add an extra phase shift to all three waves to get the
classical red to violet rainbow colors list. But I'll leave this to you.

And that's about it. Make more #rainbows, and give the
[git rainbow](https://github.com/MadRabbit/git-rainbow) gem a shot!
