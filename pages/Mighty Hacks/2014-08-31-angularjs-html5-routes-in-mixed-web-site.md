# AngularJS HTML5 Routes In Mixed Web-Site

I've got a simple, but interesting case today, which seems to give quite a bit of headache to some front-end developers who happened to work with #angularjs.

## The Problem

Imagine you decided to rebuild an existing server-side rendered web-site with angular, and you want to deliver it piece by piece. The problem starts when you decide to use the #html5 push state router. Say something like that

```js
angular.module('my-app').config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
    .when("/", {controller: "HomeController", templateUrl: "home.html"})
    .when("/blog", {controller: "BlogController", templateUrl: "blog.html"})

    .otherwise({redirectTo: "/"});

});
```

This will nicely handle your landing page and the `/blog` resource, but, imagine you also have a legacy route `/about` which is not covered by your angular application yet and served as a static page directly from the server.

In this case routing won't work correctly. When you go directly to the `/about` page from the address bar of the browser, it will work fine, but, if you click say a menu option on a page handled by angular, the click will be caught by the angular's HTML5 router and will redirect you to the home page instead of going to the separate page.

## Options

This is a pretty common issue for legacy applications trying to switch to a modern API based design. Part of the routing is in angular and part of it is still on the server side.

Generally there are two solutions to the problem:

1. Disable the `HTML5` router and fall back to the anchor based router for the angular app. That is a quite disappointing and mediocre solution for building a _modern_ web app. It also might not be an option if you have to keep the original routing intact.

2. There is another solution, you can keep the html5 router, but add the `target="_self"` attribute to every link that is supposed to lead to an external web-page. This is a good solution if you have just a hand full of links and they all scoped nicely. Unfortunately it is not ideal because you will have to drag the `target` attribute around and keep them up to date as your angular application grows and takes over the legacy web-pages.


## Better Solution

Fortunately for us, there is a better solution, which shows the strengths of angular. What you can do is to define a `href` directive in your application and add the `target="_self"` attributes dynamically if the route is not matched against your routing system.

```js
angular.module("my-app").directive("href", function($route) {
  return {
    link: function(scope, element, atts) {
      if (!$route.routes[attrs.href] && attrs.href[0] !== '#') {
        element.attr("target", "_self");
      }
    }
  };
});
```

This solution lives in the veins of the AngluarJS philosophy, "build a framework that suits your app needs", it lets you keep the html5 routing and doesn't require you to do any extra work on your templates. In fact templates won't even know about the existence of the router, you can keep them clean and to the point.

And the best part, once you're done transferring all you web-site to angular, you can just delete this directive and move on with your day.