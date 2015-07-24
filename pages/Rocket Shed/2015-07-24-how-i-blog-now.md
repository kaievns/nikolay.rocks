# How I Blog Now

I'm open-sourcing the guts of [nikolay.rocks](https://github.com/MadRabbit/nikolay.rocks)
today. And, as it is quite a bit unconventional way to blog, I thought
I should write about it a bit.

## Prehistory

I've been blogging for a while now. I cannot say I'm particularly good
at it — it's more of an habit to me — but it's been roughly 15 years
since I had put my first post online. So, you can imagine that I switched
quite a few platforms and engines on my way here.

I hacked together a bunch of PHP pages, I used livejournal, blogspot,
wordpress, jekyll and a few others. I also built my own engine in rails
at some point. But, although there are good parts to each one of them,
I wasn't quite satisfied with any of them.

## What Is My Problem?

Well, it's more of _problems_ than _a problem_. Firstly, I'm a programmer.
Like many others, I have a certain preferred way to deal with stuff I write;
meaning plain text files and a trusty code editor. I spend 10-12 hours every
day writing code and documentation, and I have spent quite a bit of time
optimizing the process for a fast delivery. This is an environment where
i'm most focused.

But then, most engines are web based. And when I'm stuck in a small tiny
TEXTAREA element in a flimsy browser environment, that just distracts me.
There is no code highlighting for the snippets, all fonts are usually wrong.
And being a web-developer, you just don't trust this stuff that much. I
always have at the back of my mind this idea that the web page can reload
or something, and I'm going to loose my stuff. You also can't just drop
your writing halfway through and switch to something else. There is a
session in the browser, and you need to save the draft somewhere. And things
like that. There are solutions to all the problems, but it's just distracting
to me, alot.

The second problem is that I'm a programmer. I build awesome web-stuff
for living, and I can push the envelope quite hard. So, when I use a third party
engine, there are always some substandard things in them. I understand they
don't make the product for me personally, and they need to run a business.
On the other hand, I know I could fix most of the issues easily. But, I don't
have access to the engine guts. All those unresolved urges distract me from
the actual writing.

The third problem, well you guessed it! I'm a programmer. I like to look
back sometimes at my code from a year or two behind and see at my progress.
And I like to do the same thing with my writings. Writing is some sort of a
snapshot of me myself in a certain period of time. I like to look back and
see how well (or badly) I'm progressing as a human being over the time.
But that means I need to keep my data gnostic from platforms and engines.

## The Dream

So, I thought about all those issues for a while and I compiled this list
of important things for a dream engine I'd love to have, and I ended up
with something like this.

1. All content should be 100% in plain text files, so I could work with
   them as I work with my code
2. The presentation layer should be as shallow as possible and don't
   impose rules on the writing format
3. The engine should be gnostic to any platform and easily migrateable
   without a loss of data or functionality
4. The system should be distributed and let me keep my stuff on github
   along with my code
5. The content should be accessible even in case of a catastrophic failure
   in the engine/delivery system.

## The Engine

After a bit of tinkering with different ideas, I decided to build the
entire thing in #javascript and front-end. So, the end result looks
kind of like that. I have the following structure of flat static files
in the project

```
images/
  .....
pages/
  ....
index.html
application.css
application.js
atom.xml
```

All posts and images live in the `pages/` and `images/` folders as simple
static files (markdown, jpeg, etc). Then, as I work on the texts, a small
[gulp](http://gulpjs.com) script reads through all the files and builds
me a small index of the posts in the `atom.xml` file.

Then the `application.js` file has a simple [ReactJS](http://reactjs.com/)
app and it builds the entire UI you see at the moment. All together it works
kind of like that

```
Browser
  <- index.html
    <- application.css
    <- application.js
      <- atom.xml
      <- **/this-page.md

      -> UI
```

There is a small #nodejs server that basically does mode-rewrite and sends
`index.html` file for any HTTP request. Then the file loads up the `application.js`
which loads up the pages index in `atom.xml`. Then, from the index the
application finds the location of the article `*.md` file, loads it up via
an #ajax call and finally builds the entire UI — along with the Markdown
transformations and all the post processing — directly in a reader's browser.

## Pros & Cons

The biggest win for me in this arrangement is a complete lack of infrastructure
in this engine. There is no database, no server side framework, no dependence
to any server side programming language or anything like that. It can run
on any web server that has an option for some sort of a mod-rewrite that will
serve `index.html` to all HTTP requests. In case of `nikolay.rocks` I just
wrote a simple NodeJS + Connect web server and pushed it to Heroku. But, I can
migrate the entire site easily to any host, no matter which tech will be in
fashion tomorrow.

The second biggest win is the fact that the front end app and the content,
they live next to each other. This way I can work on my content and engine
improvements in the same workflow, and then deliver them with the same
delivery mechanism. As the result I fix small UI/UX issues really quickly,
and I can deliver any new wacky ideas fast as well. There is no extra friction
for server side deployment.

And then it's all just text. I work with all the content and code in a normal
programming environment, I can use git branches to stash some work and run
experiments — both content and UI/UX wise. I can share all my work on
GitHub, which will serve as a backup for all my data, as well as an opportunity
for people to contribute. Anyone can submit a pull request to my work, or
create a feature request in [GitHub issues](https://github.com/MadRabbit/nikolay.rocks/issues).

I think I should write some cons here as well, but I can't quite figure any
at the moment. This way of blogging might not be everyone's cup of tea, for sure.
But, I'm pretty happy with this arrangement at the moment. And so can you!

Either way, if you are curious and maybe want to build something like that of
your own, or maybe you want to participate in the new era of collaborative
#blogging (totally made up); please proceed to [this github repo](https://github.com/MadRabbit/nikolay.rocks)!
