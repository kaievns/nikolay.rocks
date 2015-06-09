# Squeeze Those Baby Unicorns!

One of my #ruby-on-rails apps that runs on #heroku had problems with performance. Yeah, we did all the usual mumbo-jumbo with caching and optimizations, but still had some bad days.

One of the problems was that we were running on just 2 dynos under the `thin` server, and as we have some relatively heavy operations going on, pretty often requests started dog-piling screwing everything else in the application.

So, [unicorn](http://unicorn.bogomips.org), it's this magic web-server that runs and balances several instances of itself on the same socket. To put it simple, things like `thin` or `webrick` receive a request, handle it and then write back into a socket, #unicorn on the other hand forks itself and runs several processes to handle requests coming from the same socket.

Usefulness of this feature of unicorn depends on the kind of tasks your application performs. If you handle a lot of heavy requests, then you won't win much, because it doesn't really matter how you spend your CPU cycles limit. But if you have a mixed load or a lot of lightweight stuff with a lot of concurrent users, then unicorn might be very helpful because it can let you squeeze more concurrency out of the same CPU limits.

If you wanna know more about unicorn from smarter people than I'am, then check [this post](https://github.com/blog/517-unicorn)

## How To Set It Up

Michael van Rooijen wrote [this excellent post](http://michaelvanrooijen.com/articles/2011/06/01-more-concurrency-on-a-single-heroku-dyno-with-the-new-celadon-cedar-stack/) about setting it up on heroku. I'll just summarize it in here.

Firstly replace `thin` with `unicorn` in your `Gemfile`

```ruby
gem 'rails', '3.2.3'

# gem 'thin'
gem 'unicorn'
```

Then, save this into the `config/unicorn.rb` file

``` ruby
worker_processes 3 # amount of unicorn workers to spin up
timeout 60         # restarts workers that hang for 60 seconds
```

Michael suggests to use `4` workers, but in my app it was a bit unstable, so I settled on `3`. Plus, I've changed the timeout option to `60` seconds because I have some heavy requests in there.

And finally, replace the `thin start` call in your `Procfile` with `unicorn`

```
web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
```

That's basically it, but if you run #new-relic-rpm you also might wanna add this into one of your `config/initialize` files

```ruby
NewRelic::Agent.after_fork(:force_reconnect => true) if defined? Unicorn
```

That's all, now you can bundle it up and push to heroku.

## The Result

In my case, I've got a mix of heavy requests that process images and lightweight calls for cache, so one of the main problems were dog-piling calls.

![my app on heroku with two web dynos under thin servers](/images/2012/04/before-Zuir.png)

After I replaced `thin` with `unicorn` that spawned 3 workers, the picture changed to this one

![same app running on two dynos under 3 unicorn workers](/images/2012/04/after-A6u1.png)

I think there is not much else to add. If you have a rails app hosted on heroku and you run out of other options, give it a go, that might help you as well.