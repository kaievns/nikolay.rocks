# Modular Framework Is A Reality!

So, here is the thing. I'm happy with this little thing called [lovely.io](http://lovely.io) it's a fully modular #javascript framework that uses a #cloudfront based CDN as a centralised packages repository. In an essence it looks kinda like that

```html
<script src="http://cdn.lovely.io/core.js"></script>
<script type="text/javascript">
  Lovely(['dom', 'ajax', 'fx'], function($, Ajax, Fx) {
    // do stuff here
  });
</script>
```

So, you load the `core.js` synchronously, then it loads the `dom`, `ajax` and `fx` asynchronously (each as a separated file) and once everything is loaded it will run your code.

When I explain this thing to people, 99% of recipients says something like

> Oh, no! You're loading 4 files instead of one, it's gonna take forever because of the server resolving and repeated queries. And bla bla bla.

Today fellas, I'm gonna teach you a lesson

## The Test

As this is not my first penises measurement contest I'll keep the test super simple :)

```html
<html>
  <head>
    <script>var time = new Date();</script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>console.log("jQuery CDN:      ", new Date() - time)</script>

    <script>var time = new Date();</script>
    <script src="http://cdn.rightjs.org/right-2.3.1.js"></script>
    <script>console.log("RightJS CDN:     ", new Date() - time)</script>

    <script>var time = new Date();</script>
    <script src="http://cdn.lovely.io/core-1.4.0.js"></script>
    <script src="http://cdn.lovely.io/dom-1.4.2.js"></script>
    <script src="http://cdn.lovely.io/ajax-1.1.4.js"></script>
    <script src="http://cdn.lovely.io/fx-1.1.1.js"></script>
    <script>console.log("Lovely.IO Sync:  ", new Date() - time)</script>

    <script>var time = new Date();</script>
    <script src="http://cdn.lovely.io/core-1.4.0.js"></script>
    <script>
      Lovely(['dom-1.4.2', 'ajax-1.1.4', 'fx-1.1.1'], function($) {
        console.log("Lovely.IO Async: ", new Date() - time);
      });
    </script>
  </head>
</html>
```

I'm using all #jquery, #rightjs and #lovelyio official CDN hostings. It's blunt stupid, I simply include the file and measure how long does it take to load and initialize everything.

The only difference that in case of #lovelyio you can use it in both synchronous and asynchronous modes, hence two tests

Now, you might wanna cover your kids ears.

Ready. Set. Go!

## Clean Cache Result

![](/images/2012/11/11-hMBO.png)

## Cached Reload

![](/images/2012/11/22-ul8w.png)

## Analysis

To be fair, both jQuery and RightJS use a Google based CDN and I'm in Bangkok, so I've got `~100ms` ping to their servers. LovelyIO on the other hand uses AWS CloudFront as it's CDN hosting, so I have only `55ms` lag with them coz those guys have edge locations just in every corner of the planet.

But even with this in mind, you should consider that #lovelyio loads _4 files_, when both jQuery and RightJS load only one.

So, here it is. Fully AMD based modular #javascript frameworks is the reality, more of that when it's done right, they are far better reality than the one you used to think is the best.