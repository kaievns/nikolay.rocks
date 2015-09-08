# Programs Are People Too My Friend

Most of the last year I spent trying to bring a young developer up to speed. It
is an interesting thing to do actually as you get to look at your everyday cases
from a different perspective. I'm not a big fun of existing dogmatism in the
software industry myself, but to a new to the profession person it just doesn't
make any sense:

> Nikolay, why is it bad to write `smth = Smth.smth.smth.smth`?<br>
> Coz, the Demeter Law<br>
> What's De-meter law?<br>
> Er...

Even for grownup developers it is often a problem. I've been through quite
a few teams, and you always run into a person high on software design patterns.
People often delude themselves by learning as many software patterns as they can
and then just blindly pushing them everywhere, and then thinking they are shipping
good software.

So, naturally, I've been through this thought back and fourth quite a lot. How
do you explain good software design so it would make common sense and not fall
into the vicious cycle of describing abstractions via abstractions?

But then, recently, I've been reading this book about human behavioral patterns. It
is actually fascinating how well they can describe group dynamics through a set
of basic behavior styles. And there it occurred to me that different pieces of
a complex software system behave in a much the same way. Let me go through some
examples to demonstrate what I mean:

## Passive

There are four basic behavioral patterns: *passive*, *aggresive*, *passive-agressive*
and *assertive*. *Passive* is the kind of a person who takes shit from everyone.
Such person does whatever he was told to do, and constantly tries to
cope with all (often unreasonable) demands people throw at them.

In the world of #ruby-on-rails the classical example of passive behavior would
be `ActiveRecord::Base`. That thing does everything:

```ruby
user = User.find(123) # searches the data
user.valid?           # validates incoming params
user.save             # persists
user.posts            # handles associated data
user.activate!        # handles the business logic
```

The problem with the passive people is that they try to do too much, but then rarely
take time to become good at anything. They are swamped with things to do all
the time, so they often can't finish their tasks. They just can't say `NO`.

You see where I'm going with this? The same exact problem happens in software,
when a program tries to be a peg to every whole it just creates a mess. And then
neither the piece of code nor people who use it are capable of stopping and
making things right.

That's why #activerecord are bad. It is just too convenient to throw everything
at it and it rarely complains.

## Aggressive

The *aggresive* behavioral style is expressed in, well, aggressive imposing of
someone's views/options on other people. A person with an aggressive behavioral
style often thinks that everyone around them are unreliable idiots and hence they
try to fix the "problem" by making rules and getting their way by force.

There is not that many truly aggressive pieces in #rails per se (thanks to our
lord and savior DHH). But, you can quite often see people building aggressive
pieces of code in the services layer. I usually call this a *hitler class* pattern.

```ruby
class Hitler
  def hail?(user)
    user.respond_to?(:hail?) && user.hail?
  end
end

class ApplicationController < ActionController::Base
  before_action do
    Hitler.new.hail? current_user
  end
end
```

It can be called many things that sound something like `SecurityEnforcer` or
`ResourcesSupervizor` or `AccesssHandler`. It often looks innocent, like "oh it
is a strategy pattern!". You kind of doing the right thing and encapsulate the
decision making code in one place, but then you don't count in the fact much
the code that calls it needs to dance around and go into self-denial just to
work with the jerk.

The problem with aggressive people is that they justify their shit by thinking
that others are idiots. But in fact they build unnecessary barriers and make
other people's life miserable and complicated. In the end people get fed up with
it and start to act behind the angry person's back, which makes them even more
mad.

In case of software the same thing will happen. Other code will try to wrap ill
tempered modules, or create a parallel, less demanding implementations of the same
thing. Which is never healthy for any code environment.

## Passive-Aggressive

*Passive-aggressive* is a type of a person who exhibits both sides of the passive
and aggressive behavioral styles. Upfront they seem like they take everything
other people throw at them. But then, if it doesn't fit their plans, they just
flush other requests down the toilet and do what they want either way.

In case of #ruby such behavior can be described through `rescue nil`

```ruby
class User
  def activate!
    blah.blah.blah.save! rescue nil
  end
end
```

Passive-aggressive people are quite frustrating to deal with. They just do what
they want, when they want. They are quite unreliable. So, if you need to cooperate
with them you need to keep various scenarios in mind. In the end, some edge case
happens and everything goes down to the toilet.

The same goes for the code. When a program does unexpected things and produces
weird artifacts, that is just frustrating. More of that, it makes other pieces
of code's lives harder than it has to be.

## Assertive

Here we are coming to the meat of it. *Assertive* is a positive style that is
based on two basic principles.

1. a person clearly states his opinion about a situation
2. a person acts based on the situation without imposing his views on other people

A proper functional programming code is usually a good example of assertive
behavior. Every function does its little thing with what was given to it,
and leaves the integration part to something else.

In case of #rails one could argue that controllers, when not overdone are quite
assertive.

```ruby
class UsersController < ActionController::Base
  def index
    render json: User.all
  end

  def create
    user = User.new(params[:user])

    if user.save?
      render json: user, status: 200
    else
      render json: { errors: user.errors }, status: 422
    end
  end
end
```

The great thing about assertive people is that they are focused on a task at
hand. And, because they don't impose their will on others, they are great at
cooperating between each other and can achieve awesome things together. They are
reliable, because they express their intentions easily, and they say `nope` when
they can't do something.

And just like people, programs that exhibit such traits are just a pleasure to
work with.

## Conclusion

I know I am anthropomorphizing the code quite a lot in this case, but that is
intentional. I am not advocating against learning software design patterns either.
My point here is that there are things we can learn from humans. And we can use
them to express ourselves and reason why some pieces of code work nicely and some
others are total pain in the neck.

By using regular human analogies we can almost intuitively reason about code
quality without falling into abstract dogmatism of the software industry.

Try it, and let me know what kind of characters do you see in your code? Do
pieces of your programs even like each other? And why?
