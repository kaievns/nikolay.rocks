# Lightweight Redirects With Rack In Rails

Sometimes, when working with #ruby-on-rails, you need to do some permanent redirecting, say you might support some legacy routes, like

```
/about.php -> /company/about
```

Or, you might want to redirect between domains, say

```
www.theosom.com -> theosom.com

http://theosom.com/auth -> https://auth.theosom.com
```

There are quite a few cases like that, and in case of rails applications, people tend to put this sort of functionality either in the routes mapping or in more complex cases in the `ApplicationController`, say like that

```ruby
class ApplicationController < ActionController::Base
  before_filter :handle_redirects

protected

  def handle_redirects
    if something
      redirect_to some_url
      return false
    end
  end
end
```

It works, but that's not the best solution. Firstly, it's relatively heavy, you boot your entire rails application just to make some simple static redirect and because your application might have all sorts of before filters and so on, it might get pretty expensive.

Secondly, it overcomplicates your application controllers logic. Rails controllers implement the [action controller pattern](http://takacsot.freeblog.hu/Files/martinfowler/actionController.html) (by [Martin Fowler](http://www.martinfowler.com/)) and have the specific purpose of handling _actions_, meaning clicks on links, buttons and things like that. Permanent redirects are not actions, they are part of what's called URL routing layer and shouldn't be in there.

# So How Do I Do It The Right Way?

Luckily for us #ruby-on-rails supports #rack applications and that's a good place to organize your permanent redirects, caching and that sorts of stuff, things that wrap your application in general.

Rack apps is pretty simple idea, it's just a collection of middleware between the web-server and your rails application. Rails itself uses quite a few of them, if run the `rake middleware` command in your rails application console, you'll see a list like that

```
» rake middleware
use ActionDispatch::Static
use Rack::Lock
use Rack::Runtime
use Rack::MethodOverride
use ActionDispatch::RequestId
use Rails::Rack::Logger
use ActionDispatch::ShowExceptions
use ActionDispatch::DebugExceptions
use ActionDispatch::RemoteIp
use ActionDispatch::Reloader
use ActionDispatch::Callbacks
use ActionDispatch::Cookies
use ActionDispatch::Session::CookieStore
use ActionDispatch::Flash
use ActionDispatch::ParamsParser
use ActionDispatch::Head
use Rack::ConditionalGet
use Rack::ETag
use ActionDispatch::BestStandardsSupport
use Sass::Plugin::Rack
use Rack::Mongoid::Middleware::IdentityMap
use OmniAuth::Builder
```

Every one of rack apps is basically a wrapper class over your rails app like that

```ruby
class SomeClassName
  def initialize(app)
    @app = app  # your actual rails app instance
  end

  def call(env)
    if some_stuff_needed
      # sending a custom response
      [http_status_code, http_header, http_body]
    else
      # processing with the original rails call
      @app.call(env)
    end
  end

  def each(&block)
    # this method is used for post rails-app calls handling
    # in our case it can be empty
  end
end
```

The `#call(env)` method is called by rails _before_ the actual rails application kicks in, meaning before any controllers or routing calls, and all it receives is the raw HTTP environment hash.

This is a pretty lightweight situation, you didn't instance or process almost anything yet and you can quickly redirect your browser without bothering the actual application with those kinds of stuff. More of that your application doesn't even need to know about existence of those redirects, it can just handle the standard scenario and let your rack filters to adjust the call for it.

# The Actual Solution

Okay, enough of the theoretical, stuff. Now when you know how the guts work, the solution is pretty simple. Just write a new rack middleware class somewhere in your `config/initializers`. For example, my simple `apex -> www.` redirector

```ruby
class WwwRedirectar
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new(env)
    if request.get? && request.url.split('/')[2].split(':')[0].split('.').size == 2
      # making permanent redirect from apex to www. subdomain
      [301, {"Location" => request.url.sub("://", "://www.")}, self]
    else
      @app.call(env)
    end
  end

  def each(&block)
  end
end
```

And hook it up in your `config/application.rb` file like that

```ruby
config.middleware.use "WwwRedirectar"
```

__NOTE:__ you need to use the _string_ name of your class, not the class itself, coz when the config is loaded it doesn't know about your class yet.

Also, you can add your middleware in `config/environments/production.rb` if you need it in production only.

That's basically the whole solution, but you can do much more fancy stuff with rack apps. Check out for example [Ryan Bates](http://twitter.com/rbates) screencasts [1](http://railscasts.com/episodes/151-rack-middleware) [2](http://railscasts.com/episodes/203-routing-in-rails-3) [3](http://railscasts.com/episodes/222-rack-in-rails-3), that should give you some ideas