# Caching Friendly Authentication

Today's post is about authentication, giving a user access to control elements and doing so in caching efficient way. I'll use #rails and #lovelyio as examples, but the principle should be applicable to any platform/framework.

## The Problem

```erb
<div class="comment">
  <p class="text"><%= @comment.text %></p>

  <% if admin? or @comment.user == current_user %>
    <p class="controls">
      <%= link_to :edit, edit_comment_path(@comment) %>
      <%= link_to :delete, @comment, method: :delete %>
    </p>
  <% end %>
</div>
```

We all did that `if admin?` thing. Still do, right until the moment when

```erb
<p class="text">
  <%= @comment.text %>
</p>
```

Becomes, something like

```erb
<p class="text">
  <%= something_really_slow @comment.text %>
</p>
```

Then you start using the `cache` helper and make things more complicated

```erb
<div class="comment">
  <%= cache "this_slow_stuff_#{@comment.id}" %>
    <p class="text">
      <%= something_really_slow @comment.text %>
    </p>
  <% end %>

  <% if admin? or @comment.user == current_user %>
    <p class="controls">
      <%= link_to :edit, edit_comment_path(@comment) %>
      <%= link_to :delete, @comment, method: :delete %>
    </p>
  <% end %>
</div>
```

And then your boss come and starts saying: "hey my dearest developer, lets make some really slow stuff in the `comments_controller` too". And here you start pulling your hair off. You'd love to use `caches_page`, compile everything once in HTML and then serve it to the user bypassing #rails, but that bloody thing

```erb
<% if admin? or @comment.user == current_user %>
  <p class="controls">
    admin links in here
  </p>
<% end %>
```

Still requires you to run it through the rails just to make those stupid links appear and disappear for the right folks.

And here people tend to start getting a bit crazy, use memoisation of the slow processes in controllers, build crazy schemes of nested caching mechanisms, build rack apps to include those links in precompiled blocks of HTML and so on.

Have you ever wondered why people go in such troubles over such a simple thing?

All this memoization, PJAX, TurboLinks, all those things come up because of one simple thing, they're created by server-side developers. You see, serversiders, they got used to compile HTML. Since the invention of PHP, that's what they do, they write programms that compile #HTML, and when a piece of HTML needs to be changed in some way, they change the programms that compile it.

And that's so 1999... Coz

## There Is A Totally Better Way Of Doing It

Sometimes you need to let the things go. As [Morihei Ueshiba](http://en.wikipedia.org/wiki/Morihei_Ueshiba), the great master of [Aikido](http://en.wikipedia.org/wiki/Aikido) said once: "don't try to stop a train with your body, love the train instead, let it go, let it run, and use it's energy"

In our case that would be the simplest thing, just remove the whole `<% if admin?` thing from your templates for good. Just give it some love, get rid of all the ugly `if` and `elses`, make it shiny

```erb
<div class="comment">
  <p class="text"><%= @comment.text %></p>

  <p class="controls">
    <%= link_to :edit, edit_comment_path(@comment) %>
    <%= link_to :delete, @comment, method: :delete %>
  </p>
</div>
```

Then go straight into your `comments_controller`, get rid of all the momoization crap and `cache_page` the whole page as it is, with all the links

```ruby
class CommentsController
  caches_page :index

  def index
    some_slow_stuff
  end
end
```

That's what zen is all about, deconceptualization. You need to make things simple to see their true nature, and the true nature of your situation in this case is that you just wanna show some controls to the comment owners that's it. It doesn't mean that you have to add and remove them from your html, it only means that you need to `show` and `hide` them.

How about that?

```erb
<style type="text/css">
  .controls {
    display: none;
  }
</style>

<div class="comment" data-owner-id="#{@comment.owner.id}">
  ....

  <p class="controls">
    ...
  </p>
</div>

<style type="text/css">
  *[data-owner-id="#{@comment.owner.id}"] .controls {
    display: block;
  }
</style>
```

See, we just hide all the control links upfront with some #css, and then show them to the right user with a specifically crafted for him piece of CSS that shows the links to the user.


## Possible Implementation

There is a whole bunch of ways to add that last piece of CSS on the page. You could say append that piece of css to your html with a simple rack app, maybe even use a quick #nodejs proxy for that, or something like that. But normally you also need all sorts of other stuff about the current user, like his name, avatar, role and so on. So it's better if you just make a quick #ajax request to your server for that data

For example add the `show` method to your `SessionsController`

```ruby
class SessionsController < ApplicationController

  def show
    if logged_in?
      render json: {
        id:    current_user.id,
        name:  current_user.name,
        admin: current_user.admin?
      }
    else
      render text: '' # nothing
    end
  end

  ...
end
```

Yes, you do an extra request to your server, but in reality you make the same exact amount requests to #rails, coz the main page will be served with your server directly to the user (possibly through a bunch of extra locations), and this authentication request is really lightweight and can be optimised further with `cookie` flags, caching and so on.

The big win here is that you don't render you huge page all over again all the time.

And on the #javascript side it all really super simple (pardon me for using my beloved [lovely.io](http://lovely.io) in here)

```coffeescript
Lovely ['dom', 'ajax'], ($, Ajax)->
  Ajax.get '/session', complete: ->
    if user = @responseJSON # if the user session data came
      $(document.body).addClass('logged-in')
      $(document.body).addClass('admin') if user.admin

      style = new $.Style(html: """
        *[data-owner-id="#{user.id}"] {
          display: block;
        }
      """)
      style.appendTo(document.body)
```

You also can continue and adjust the userbar for the logged in user, sort of like that

```coffeescript
$('#login-form').hide()
$('#userbar').show()
$('#userbar .username').html(user.name)
```

And so on. There is practically no visible lag in the UI with such approach. You can see it in action right on this very site.

This also opens up a whole bunch of options to you, like for example you can login/logout users almost instantaneously without actually reloading the page, switch users on fly, you can even use a separated server for users authentication and so on.

That's basically the whole idea. Let me know if you have any questions.