# Nikolay Nemshilov

Hello, I'm Nikolay. I'm

blah!

## Programming Languages

* Ruby ~10 years
* JavaScript ~15 years
* Swift ~1 year
* Python ~2 years
* PHP ~5 years

Was exposed at various degrees to: Java, Lua, Elixir, C++/C, Haskell, Lisp, Elm.

## Databases

* Mysql
* PostreSQL
* MongoDB
* ElasticSearch
* InfluxDB


## Open-Source Projects

* [Nikolay.Rocks](https://github.com/MadRabbit/nikolay.rocks) - Next-gen blogging platform in React
* [Ruby Fighter](https://github.com/MadRabbit/ruby-fighter) - Street Fighter II in Ruby and Gosu
* [UnderOS](http://under-os.com) - Web-like abstraction on top of iOS in RubyMotion
* [Lovely.IO](http://lovely.io) - JavaScript modules hosting platform
* [RightJS](http://rightjs.org) - fully featured JavaScript framework
* [100+ more](https://github.com/MadRabbit?tab=repositories) on GitHub

## Blogging / Speaking

* Speaker at [RubyMotion inspect 2014](http://www.rubymotion.com/conference/)
* Speaker at [Rocky Mountains Ruby 2014](http://rockymtnruby.com)
* Was accepted for [RubyConf 2014](http://rubyconf.org), but couldn't attend due to family affairs
* Regularly present at [RoRoSyd](http://ruby.org.au/meetups/syd.html) and [SydJS](http://www.sydjs.com)
* [Nikolay.Rocks](http://nikolay.rocks) - personal blog about tech and life

## Work Experience

* `10.2013-12.2015` Ninefold Pty Ltd - Leading Software Engineer
  > Leading a team of Ruby developers to build a new PaaS/IaaS
  platform based on top of Rails/AngularJS/CloudStack/Chef and
  other tech. I also helped to promote the product by writing
  blog posts and speaking at conferences
* `12.2012-10.2013` JobReady Pty Ltd - Technical Lead
  > Lead a small team of RubyOnRails developers to build and
  support a SaaS platform for Australian apprenticeship
  program centers. Rails/JavaScript/PgSQL/ElasticSearch
* `06.2010-11.2012` DoshMosh Pty Ltd - Technical Lead
  > I've built an online game around debates and choices.
  It used Rails/JavaScript/MongoDB/Memcached/Heroku
* `05.2009-11.2012` Independent Developer/Contractor
  > Various mid and long-term contracts. Mostly Ruby and JavaScript
* `01.2009-05.2009` Storyz Pty Ltd - Senior Software Engineer
* `11.2006-11.2008` Independent Web Developer
* `06.2003-10.2006` Active Design Studio - Senior Software Developer

## Education

* `1999-2003` Altai State University - Radio-Physics and Electronics
* `2000-2001` All-Russian Finance & Economics Institute - Accounting and Statistics
* `1996-1999` Barnaul Industrial College - Electrical Engineering and Pedagogics


<script type="text/javascript">
(function() {
  var timer, i = 0;

  if (document.body.classList.contains("resume")) {
    var headers = [].slice.call(document.querySelectorAll("main article h2")),
        lists   = [].slice.call(document.querySelectorAll("main article h2 ~ ul"));

    timer = setInterval(next_block, 15000); next_block();
    //next_block();
  }

  function next_block() {
    for (var j=0; j < headers.length; j++) {
      headers[j].classList[headers[j] == headers[i] ? 'add' : 'remove']('active');
      lists[j].classList[lists[j] == lists[i] ? 'add' : 'remove']('active');
    }

    if (!headers[++i]) { i = 0; }
  }
})();

</script>
