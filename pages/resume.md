# Nikolay Nemshilov

Hi, I'm Nikolay, I'm what you might call a technical technical lead.
I help companies that are passionate about tech to build the best
products possible and ship them fast and reliably.

I come from a rather eclectic background that includes: engineering,
science, economics, art and even pedagogy. This unique set of experiences
gives me a very strong foundation of skills that are necessary to
perform exceptionally in the drastically dynamic world of modern
software development.

<a href="#" class="start-prezo">Watch the prezo</a>

## Primary Skill Set

* Building best products possible
* Overall applications architecture
* Analytics, research & optimization
* Extended full-stack development
* Great personality and people skills

## Programming Languages

* Ruby ~10 years
* JavaScript ~15 years
* Swift ~7 years
* Python ~2 years
* PHP ~5 years

Also, i was exposed at various degrees to: Java, Lua, Elixir,
C++/C, Haskell, Lisp, Elm.

## Web Related Tech

* RubyOnRails ~10 years, an early adopter
* NodeJS ~5 years, an early adopter
* AngularJS ~2 years
* ReactJS ~1 year
* BackboneJS ~3 years

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

## Contacts

* <a href="mailto:&#110;&#101;&#109;&#115;&#104;&#105;&#108;&#111;&#118;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;">&#110;&#101;&#109;&#115;&#104;&#105;&#108;&#111;&#118;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;</a>
* <a href="https://github.com/MadRabbit">GitHub/MadRabbit</a>
* <a href="https://twitter.com/nemshilov">@nemshilov</a>
* <a href="https://au.linkedin.com/pub/nikolay-nemshilov/14/78b/78">LinkedIn</a>

<div class="controls-space">
  <a href="#" class="exit-button">exit</a>
</div>

<script type="text/javascript">
(function() {
  var timer, i, headers, lists;

  if (document.body.classList.contains("resume")) {
    start_the_prezo();
  }

  var start_link = document.querySelector("a.start-prezo");
  start_link && start_link.addEventListener("click", function(event) {
    event.preventDefault();
    start_the_prezo();
  });

  function start_the_prezo() {
    i       = 0;
    headers = [].slice.call(document.querySelectorAll("main article h2")),
    lists   = [].slice.call(document.querySelectorAll("main article h2 ~ ul"));

    timer = setInterval(next_block, 11000); next_block();
    lists[lists.length-1].className += " slide-in-contacts";
    document.body.classList.add("resume");
    document.body.scrollTop = 0;
  }

  function next_block() {
    for (var j=0; j < headers.length; j++) {
      headers[j].classList[headers[j] == headers[i] ? 'add' : 'remove']('active');
      lists[j].classList[lists[j] == lists[i] ? 'add' : 'remove']('active');
    }

    if (++i > headers.length - 2) { // don't show contacts
      clearInterval(timer);
    }
  }

  var exit = document.querySelector(".exit-button");
  exit.addEventListener("click", function(event) {
    event.preventDefault();
    document.body.classList.remove("resume");
    clearInterval(timer);
  });
})();
</script>
