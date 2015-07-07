# How To Load Private Images Via Ajax

So, here is a fun problem. Lets say you have a website where
users can upload some images and then access them privately
when signed in. For example you might be using a simple #rails
controller kind of like this one:

```ruby
class ImagesController < ApplicationController
  before_action :require_user

  def show
    image = current_user.images.find(params[:id])
    send_data image.blob, type: :jpg, disposition: :inline
  end
end
```

This will work perfectly in a classical rails app with a
session based #authentication system. The browser will send
cookies along with the image request and the `current_user`
will magically pop up in the `ImagesController` just as expected.

The problem is that you might be living in the early 21st century
and you're might be building an awesome JSON API based app,
say with #angularjs. If you have done everything right, you
will be authenticating your users with an auth-token in the HTTP
headers. Say something like that:

```ruby
class ApplicationController < ActionController::Base
protected

  def current_user
    @current_user ||= User.authenticate(auth_token)
  end

  def auth_token
    request.headers["AuthToken"]
  end
end
```

In this case, there will be no cookies and when the browser sends
a request for the image, it won't send any headers either. So,
you'll request will be completely anonymous and the server will
rightfully throw a `404`.

## Brut Force Solution

The solution to the problem is obviously to send somehow an auth-token
along with the image request. And the first thing that might spring
to mind is to just add the auth-token to the image url:

```html
<img ng-src="/images/123.jpg?auth_token={{auth_token}}" />
```

That might work. But, unfortunately you will have to drag that
`?auth_token=` everywhere in your front end. Then you will have to
support two authentication types on the server side as well. Plus
make sure that your angularjs `$http` header configurations don't
get misaligned with the `?auth_token=` hacks.

That will be a mess and quite an error prone one.

## Better Solution

A better solution would be to load the image via your front end
ajax system. In case of angular with the `$http` module. It will
most likely already have all the necessary headers and configurations
for your JSON API access, so your image requests will fit right in.

A nice way to implement the solution would be to build a simple
directive, something that would look like that:

```html
<img private-src="/images/123.jpg" />
```

Then make some #javascript code like so

```js
App.directive("privateSrc", ["$http", function(http) {
  return {
    restrict: "A",
    scope: { src: "@privateSrc" },
    link: function(scope, element) {
      http.get(scope.src, {responseType: "blob"})
        .success(function(blob) {
          var converter  = window.URL || window.webkitURL;
          element[0].src = converter.createObjectURL(blob);
        });
    }
  }
}]);
```

It is pretty straight forward, but there are few things worth
mentioning. Firstly, you need to specify `responseType: "blob"`
so that the browser treated the XHR response as a binary data.
Secondly, you will need to convert the blob into a source object
for the image with the `window.URL` service. (this feature is
called [blob urls](http://caniuse.com/bloburls) in case you want
to dig deeper into the topic).

As the result, we have an easily reusable and highly maintainable
solution that fits right into your existing system.

## Extra Awesomeness!

One cool side effect of this approach is that you can visualize
the image loading process to your users and make your UI appear
more dynamic. For example, you can add the `loading` class to the
image while it's being loaded:

```js
link: function(scope, element) {
  element.addClass("loading");

  http.get(scope.src, {responseType: "blob"})
    .success(function(blob) { /* dealing with the blob */ })
    .finally(function() {
      element.removeClass("loading");
    });
}
```

Once you have that, just add some #css sprinkles on top of
the cake:

```css
img.loading {
  content:    " ";
  background: rgb(0,0,0,0.5) url("spinner.gif") no-repeat center center;
}
```

Don't forget to specify that `content: " "` thing, it will
remove the weird border around the image while it doesn't
have any source in it yet.

__PROTIP:__ you can use `base64` animated gifs with `background-image`
properties. Saves you one tiny http request :)
