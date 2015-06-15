# How To Marshalize ActiveJob Arguments

As we all know #rails 4.2 have finally given birth to the `ActiveJob` component, which,
allegedly, will congregate all the other background job queues under one unified API.
While that is a totally awesome and long awaited development, there is one gray area
issue that you might run into. The arguments that an active job instance might take.

## The Problem

The problem is that an `ActiveJob` instance only can take simple strings and numbers
as arguments (or a combination of those in arrays and hashes).

Basically it is done as a safeguard to protect you against some side effects that
passing an `ActiveRecord` instance into a background job might cause. Say, for example
you passed an object to a queue and then deleted it from a database. God knows what
might happen; so they force you to use record ids as attributes.

## The Options

But, some of us actually want to lead a dangerous life, and pass complex objects
into background jobs. DANGER, DANGER!

<iframe width="420" height="315" src="https://www.youtube.com/embed/2a4gyJsY0mc?rel=0&amp;controls=0&amp;showinfo=0&amp;t=92" frameborder="0" allowfullscreen></iframe>

For example, I'm quite a fond of value objects when it comes to a complex business
logic. They a simple throw away instances that incapsulate data and probably some
smarts around it. Unfortunately the data in them is not persisted and not really
meant to.

## The Solution

So, in any case, if you find yourself in the same situation and want to pass value
objects into a background job, here is how you can do that with `ActiveJob` filters

```ruby
class MarshalizedJob < ActiveJob::Base
  before_filter do |job|
    job.arguments.map! do |arg|
      Base64.encode64(Marshal.dump(arg))
    end
  end

  before_perform do |job|
    job.arguments.map! do |arg|
      Marshal.load(Base64.decode64(arg))
    end
  end
end
```

Once you have that, just use the new `MarshalizedJob` class as the parent for your
specific jobs that will take value objects as parameters.

__NOTE__: you need to have both `Marshal` and `Base64` encoders, because #ruby marshalizer
will spit out binary `ASCII-8bit` strings, which left alone, will cause encoding problems
down in the pipes, as `ActiveJob` encodes everything into `JSON` later on when it passes
data to sidekiq/redis.

## Final Notes

I just wanted to add couple of personal notes. Firstly, I'm really pleased with the flexibility
of `ActiveJob`; hail to rails core team they listened to the things the community was building
for years and they didn't disappoint.

Secondly, although the reasoning behind the limitations on the argument types is totally
understandable, we need to acknowledge that there are developers who are spoiled by other
languages and tech. So, it feels like there should be a config option out of the box in
#ActiveJob that will allow one to serialize value objects transparently without us needing
to monkeypatch it with callbacks every time.
