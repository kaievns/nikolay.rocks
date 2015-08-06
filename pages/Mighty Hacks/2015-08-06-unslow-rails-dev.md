# How To Make Rails Dev Server To Load Pages Faster

There is a #rails hack that most of #ruby devs don't know. It can,
in some circumstances, greatly improve the pages loading time in
development environment and make your dev life somewhat more pleasant.

The problem occur when your web page makes several rather heavy
requests to the server. The most common case is that you might have
a single page application, which then simultaneously hits several
#JSON #API end points. Or, your page might load several heavy images;
or make some slow ajax requests. There are plenty of cases like that.

For example on my current project at [ninefold](http://ninefold.com)
we have a #SPA that lets you manage your virtual servers, networks, etc.
On page boot it makes several JSON API calls to get the data from the
server. In a normal rails setup the page loading will look kind of like
that:

![](/images/2015/08/06-before.png)

I have put a `sleep 0.25` in the `application_controller` to exaggerate
the issue a bit and make it more pronounced. But generally, the problem
is that rails rack server in dev environment handles all the HTTP requests,
including the assets, sequentially one by one.

As the result, you can see that all the JSON API calls are returned
sequentially. Then the image assets requests are delayed until all the
JSON API calls are resolved. In projects that have a lot of slow
requests it can be quite annoying to wait for several seconds and stare
at a half loaded page.

Luckily there is a solution to this issue. The root cause of the issue
is that rails has `Rack::Lock` middleware in dev environment injected
into #rack's pipes. That is the thing that puts all the incoming
requests in a queue.

So, open up `config/environments/development.rb` file and add this
somewhere in the config

```ruby
config.middleware.delete Rack::Lock
```

Then try to boot your rails app again and see the difference. If you
have done everything right, you should see something like that:

![](/images/2015/08/06-after.png)

As you can see, instead of `~2+seconds`, now the app boots in `~0.5s`.
Also, if you look a bit closer at the image, you will notice that all the
http requests — both, json api and image assets — are loaded in parallel.
Images don't wait on JSON API calls anymore and appear whenever they are
ready.

Rails is more than capable of handling several requests in parallel in a
multi-threaded setup. That is what happens in an actual production
environment.

As awesome as this hack seems, there is a little side-effect to it. If
you look into your terminal, your rails log will be scrambled due to
rails handling all the incoming requests simultaneously:

![](/images/2015/08/06-console.png)

It is a bit hard to work like that. But, don't you worry. Nikolay has
you covered! Add this to your gemfile's `:development` section

```ruby
group :development do
  ...
  gem 'sweet-logger'
end
```

Then bundle and try again! Now rails will still handle all the incoming
requests in parallel, but `sweet-logger` will spit them out into the
terminal one by one, so you could make sense of what's going on in the app.

[sweet-logger](https://github.com/MadRabbit/sweet-logger) is a little project
of mine that basically does some mumbo jumbo with threads and caching
and then presents all the requests history in one chronologically ordered
list.

One more thing, before we go. You might also want to change this to
your `config/environments/development.rb` file:

```ruby
config.eager_load = true # was false before
```

Rails server hot-reload doesn't quite work nicely in a multi-threaded
environment, so you need to tell rails to eager load your code. Don't
worry, thanks to `spring` it is not gonna add too much to the loading time.

And that is pretty much all about the hack. Enjoy!
