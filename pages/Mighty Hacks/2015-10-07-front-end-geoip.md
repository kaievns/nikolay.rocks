# GeoIP Checks On Front-End

When it comes to GeoIP checks, we often tend to think of it as an explicitly
server-side process. You take the request IP address, run it through some database
or an external service, and then switch on/off certain pieces of UI through
HTML rendering. It is generally fine, but rendering HTML on the server side? Eww...

![](http://www.recaption.com/uploads/23522504e1ef21118a.jpg)

Either way, there are plenty of legit cases — such as single page apps, etc —
where you might want to do it on the front-end. Luckily for us there are some
nice options available.

There is a bunch of services on the internets that are built specifically for that purpose.
For example [freegeoip.net](http://freegeoip.net) or [ipinfo.io](http://ipinfo.io).
In either case, the principle is really simple: you just issue a XHR request
to their service from your browser in #javascript and get a JSON blob back with
all the geoip data you might need.

```js
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function() {
  var result = JSON.parse(xhr.responseText);
  console.log(result.country_code);
});
xhr.open("GET", "https://freegeoip.net/json");
xhr.send();
```

As this request will be issued from the user's browser you'll get the correct
data about their location. And that's all there is about it.

__PS:__ If you feel untrusty about non-google API's. 1) You're supporting the bad
form of capitalism, 2) Google also has a geolocation API, but it requires quite
a bit more hassle as you will need an access key and stuff.
