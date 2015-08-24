# Elixir: First Impressions

I've been starring at [elixir](http://elixir-lang.org) for a while now.
It kind of looked good, but I just couldn't find a good enough excuse to
give it an actual try beyond reading books and playing in REPL. But,
recently, I started a small toy project which needs to process quite a lot
of sequential data, and I thought it might be a good fit.

So, I've spent roughly two weeks building actual real life stuff with
#elixir on a green field project. And, for the future reference, I
think I need to record my first impressions of the language.

## Who is this guy?

And before we start, I guess it's a good idea to say a bit about my
background. So that when you don't like what I'm saying you could blame
my previous experiences.

```
C -> PHP --> Python --x         /-Lua-> |
            \-> Java -> Ruby ---------> |
               \-> Javascript --------> |  NOW
                              \-Swift-> |
|<------------- ~15 years ------------> |
```

Those are the languages which I used to build actual production stuff.
There is another dozen more that I studied, but didn't use to built
anything beyond basic examples or toy projects. I'm basically a web dev;
#ruby is my bred and butter; I quite like #javascript and #lua,
and I have high hopes for #swift and #rust.

## Elixir in general

Elixir to me is like one of those douche-ish friends. He's your
pal, you like him, you are on the same wave-length about many things.
But then, he goes around talking how he doesn't have a TV because he
prefers books, and how your affection for bacon is going to kill you
some day. And then you die in a car accident and he goes to your funeral
and says: "you could totally die of a heart attack".

Don't get me wrong, I'm a giant douche myself at times. We are all
delusional one way or another, and that's cool. My point here is that
you need to have a decent level of tolerance to this sort of quirks
and look past them.

For example, you can often hear from elixir people talks how immutable
they are, and there is no state, and how classes are bad. But then, when
you need to get any actual stuff done, you need to store stuff, and count
stuff, and track stuff. And then turns out there are
[records](http://elixir-lang.org/docs/v1.0/elixir/Record.html) and
[gen-servers](http://elixir-lang.org/docs/v1.0/elixir/GenServer.html)
that can have mutable state on the outside.

Yeah, they are totally not like classes and instances, I get it. But,
what if you wrap your module up, name it `class` and have a method `new`
on it that will run your OTP `start_link` on the inside?

If it looks like a duck, and quacks like a duck. It's a duck, mate.
An awesome, multi-threaded, distributed, fault-tolerant duck.

Or you can hear how awesomely functional Elixir is, and how beautiful
pipes are. And don't get me wrong, in many cases they totally are,
but then you look at it:

```
"string"
  |> String.strip
  |> String.split("\n")
  |> Enum.map fn (s)-> Sting.upcase(s) end
```

And it's kind of the same as this:

```js
"string"
  .trim()
  .split("\n")
  .map(function(s) { return s.toUpperCase(); });
```

JavaScript is a prototype based language, so all those methods live
on a prototype, not on the object itself. So, what's the point?

Or immutability for example. In erlang everything is immutable, but
in Elixir you can reassign "variables". Kind of. For example

```
iex(1)> a = 1
iex(2)> f = fn ()-> a end
iex(3)> a = 2
iex(4)> f.()
1
```

The "variable" gets frozen the moment the function is declared, and
that creates quite a few weird situations at the beginning. I wish
it would just explode and be done with it.

Another thing is that Elixir is essentially a preprocessor for Erlang.
So, in many cases you will have a feeling like you are using coffeescript;
you can touch this, but can't touch that. And then, when it doubt
backtick javascript!

Again, it is fine, but you will need to go along to get along.

## Erlang VM

The cool thing about Elixir is actually not elixir itself. Syntax often
is the most boring part of a programming language. The cool thing about
Elixir is the Erlang VM.

It's super-stable, fault-tolerant, battle tested, fast and, as a friend
of mine put it, `parallel as fuck`. There are plenty of cool features
that I'm just starting to dig up. Ability to run isolated processes
for everything is cool. Ability to push byte code to another process
is cool. Byte-compiled stuff is cool.

But then again, you sit there and think: _when I run in rails something
like this_

```ruby
AwesomeJob.perform_later(:blah, :blah, :blah)
```

I kind of do the same thing. And I know TCP sockets and I'm not afraid to
link two node.js processes with ZMQ if I needed.

In the end, Erlang VM does all the same marshalizing and communication
between processes as any other environment. It's just baked into
the VM and has nice hooks in the language. It is handy, but I'm
not convinced that it is necessarily good. I'd much prefer external
tools for that, so that they could evolve separately.

## Dev environment

Dev environment in Elixir is alright. The `mix` tool does pretty much
the same as `rake` and `bundler` in ruby, which is neat. Compilation
is quick, runtime is fast. In most cases it is very well thought
through and pleasant to use.

There is not that much variety of packages, but you will find modules
for most of the common tasks, databases, etc. It is not stellar,
but it is survivable.

And, if you still didn't learn the lesson and want rails, there is the
[phoenix](http://www.phoenixframework.org) framework. At this point it's
like rails 2.3.x. Quirky but useable.

## The good stuff

Pardon me for being a bit negative in the text above. There are plenty
of fan-boys who will tell you that elixir is the best thing eva. And,
I think it is important to look at things a bit critically. Anyways,
the good stuff.

Pattern matching, obviously. In a sense it is your conditionals on
steroids, but it is quite neat and helps to deal with routine operations
quite a lot.

Heredocs. That is the thing I was missing heavily from Python. Ability
to lookup docs from REPL is magical, I wish it was a thing in Ruby,
really. I can `bundle open` things, but heredocs are sweet.

Doctests. Another thing I missed a lot from Python a lot are the doctests.
An option to express your use cases in docs and run them as tests is
like unicorns and rainbows. I still write them in ruby and javascript,
but having it as a built in feature is totally awesome.

The community is generally grown up and openminded. You won't see many
"ok I've just built my first blog" types in there. Which is good as you
don't waste much time.

There are plenty of other things, but generally, I'm usually pleasantly
surprised by the quality of decisions the elixir core team makes.

## Overall

Well, it's already was quite a long post I guess. Overall I like it.
I like it a lot. But. (there is always a `but`, right?) I don't think
elixir is going to be the next big thing. And that is alright.

There are plenty of languages that are awesome but not like totally
hot right now. It preserves their quirkiness and uniqueness. It keeps
our brains sharp. It makes us better programmers. And that is a good thing.

I'm going to keep working with it for a while, just for the kicks of
it. But, if you are looking for the next ruby or javascript. I'm
afraid you will have to look somewhere else. Luckily there
are plenty of options [Go](http://golang.org), [Rust](http://www.rust-lang.org),
[Swift](https://developer.apple.com/swift/).
