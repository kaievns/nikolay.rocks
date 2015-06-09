# Lovely.IO UI 2.0 Whats New?

I finally published the [lovely.io ui-core 2.0](http://lovely.io/packages/ui/changelog) today, time to reflect a bit on what's going on in there.

## Post RightJS

As you might now, #lovelyio was started as an #HTML5 centric fork of #rightjs, so you won't be mistaken if you thought that lovely.io UI is a continuation of the same idea. I'm trying to build a new kind of UI with marvels of the modern technology in mind.

RightJS has the [rightjs-ui](http://rightjs.org/ui) library, but didn't really have a centralized ui-core. It kinda did, but internally, and pieces of it were compiled inside of every module. And as lovely.io allows easy packages dependency handling, there was no reason not to start building one ground-level block upon which all the rest of the packages will grow.

## What's Inside?

With lovely.io ui-core i certainly didn't want to build a jquery-ui like mastodon, in reality i ended up with something close to [twitter bootstrap](http://twitter.github.com/bootstrap) but a bit simpler and with a proper #javascript API.

Essentially there is a set of scripts and styles to build standard-looking buttons, menus, spinners and so on, and a basic class for all sorts of modal dialogs/popups. It's all modular and OOP based, so you can build everything programmatically

```js
Lovely(['ui-2.0.0'], function(UI) {
  var button = new UI.Button();
  var icon   = new UI.Icon('save');

  var Lightbox = new Lovely.Class(UI.Modal, {
    constructor: function(options) {
      this.$super(options);
      this.update('some internal block code');
    }
  });
});
```

There are also several every-day use things like lockers, html-based spinners, menus and etc.

```js
Lovely(['ui-2.0.0', 'dom-1.2.0'], function(UI, $) {
  $('#some-element').on('click', function() {
    this.append(new UI.Locker());
    this.load('/some.url');
  });
});
```

As per usual, the package carries all the necessary styles, so all you'll have to do is to build your stuff and be happy.

## Font Based Icons

Lovely.io UI-core 2.0 comes with a built in set of icons, which is based on the [FontAwesome 2.0](http://fortawesome.github.com/Font-Awesome) font-based icons set.

Font-based icons were chosen, firstly because they are DPI independent and look excellent an any screen, and secondly you can do all sorts of stuff with them by using CSS magic.

Font-based icons might be a bit of a problem to setup, but, lovely.io and the ui-core package take care of everything automatically, all you get in the end is a great set of icons which you can easily use in your apps.

## Human Friendly Keybindings

Lovely.io ui-core also provides certain extensions to help you handle UI related keyboard events. Which basically means that, when you hook up the `ui` package you can specify keyboard combinations instead of the event names

```js
Lovely(['dom-1.2.0', 'ui-2.0.0'], function($, UI) {
  $(document).on('esc', function() {...});
  $('#input').on('enter', function() {....});
  $('#something').on('ctrl-s', function() { ... });
});
```

No more routine `event.keyCode == 13` checks!


## What's Not In There

Lovely.io ui core was conceived as a ground level package. Which means there is no real widgets in there, all real things are in the actual packages, see for example [dialog](http://lovely.io/packages/dialog), [zoom](http://lovely.io/packages/zoom), [tabs](http://lovely.io/packages/tabs)

Then, when I say lovely.io is HTML5 centric, I mean that. There is no `IE < 9` support and there won't be any. I know, i know, but.

1) Supporting old IE is thankless job, and no-one want to do extra work because of lazy ass sysadmins or cheap-skate office owners
2) Without old IE browsers support, we can go crazy doing super-awesome sweet CSS3 things
3) Codebase gets much cleaner and flexible
4) IE 10 is coming

LovelyIO is a project oriented on the future projects, so there won't be anything less than HTML5 and CSS3, get used to it.

## Is It Ready?

It is. I already use it on two of my latest projects in production. I don't have a gazillion of users (yet :)) but I use it every day, and because lovely.io allows me to get through the build-measure-learn cycle as quickly as possible, things get updated and fixed regularly.

lovely.io is new and unusual, but it's not raw. lovely.io STL is based on well tested RightJS codebase and ready for early adopters.

And soon we're going to start rocking the world! :)