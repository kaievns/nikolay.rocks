# Single Page Apps Access Handling With AngularJS

This one is a bit tricky and googling the question didn't get me to any clear answer, so I'm writing it here.

The question is how you do the routes access handling in an #angularjs based single page app, the simplest way possible.

## Prerequisites

I assume you go with a vanilla angular app and use the `angular-route` module. Then your app file looks kinda like this

```javascript
var MyApp = angular.module('MyApp', ['ngRoute']);
```

And you define your routes kinda like this

```javascript
MyApp.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: 'dashboard.html',
      controller:  'DashboardController'
    })
    .when("/signin", {
      templateUrl: 'signin.html',
      controller: 'SigninController'
    })

    .otherwise (redirectTo: '/');
});
```

And finally lets assume you have a `User` model that keeps the user's signin status on it, kinda like that

```javascript
function User() {
  this.signedIn = false;
}
```

## The Solution

Firstly, you can define which routes are accessible by whom in your routes config, you can specify it pretty much as you pleased, i personally prefer to name the  property `access`, which makes it easier to grasp later


```javascript
  $routeProvider
    .when("/", {
      // ...
      access: 'require_user'
    })
    .when("/signin", {
      // ....
      access: 'anonymous'
    })
    // ...
```

Once you're done with that, create a new factory that will be responsible for handling your access restrictions (again, name it as you pleased)

```javascript
MyApp.factory('accessHandler', function($rootScope, $location) {
  // create a reference to the current user
  $rootScope.currentUser = new User();

  // tap to the route-change event
  $rootScope.$on('$routeChangeStart', function(event, route) {
    // handle your route access in here
    if (route.access != 'anonymous' && ! $rootScope.currentUser.signedIn) {
      $location.path = "/signin";
    }
  });
});
```

The `route` object in the callback will have all the same properties that you specified in your routes config, so you can be really flexible with those things and write down what makes sense for your app specifically.

Once you're done with the access handler, just add it to your app `run` method

```javascript
MyApp.run(function(stuff, accessHandler) {
  // it will kick in here automatically once angular loads the factory
});
```

And that's pretty much the whole thing

## PS

In the spirit of the `whatever` in Angular, there is no really a blueprint for handling authentication, but you can achieve it pretty easily with just a simple module and  a bunch of options in the routes config.

The good news is that you can be really flexible and make the authentication work exactly the way which makes sense for your application.