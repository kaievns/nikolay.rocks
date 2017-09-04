# Why I RethinkDB And So Can You!

A few weeks ago I started a new project, and I had picked [RethinkDB](https://www.rethinkdb.com)
as its primary database. I'm having some really good time with it and thought
I should share some of my experiences.

I'm not new to NoSQL databases. I've been ridiculed for my preference for
[MongoDB](https://www.mongodb.org) for years now. I also worked extensively with
[ElasticSearch](https://www.elastic.co/products/elasticsearch) and
[CouchDB](http://couchdb.apache.org). The thing is though, I wasn't quite happy
with either of them.

I really like the idea of having a schema-less document storage. When you can
transparently persist any (-ish) native to your favorite programming language
value in a database and then retrieve it the same way, it removes a whole layer
of issues that classical ORM systems bring. It doesn't feel like there is any
mapping at all, you just focus on your code and save data in a database at will.
It feels so liberating after the decades of ORM hell.

But, although it felt great, there were a whole bunch of problems associated with
switching from a relational database to a document storage. Modeling things in
MongoDB is kind of weird, as you have to mangle with saving arrays of external
keys in documents and then exclude those fields out of selects when they grow
too large. Besides querying language in Mongo is kind of an ugly pain in the neck
as well. I'm not even talking about maintaining a MongoDB cluster and how hungry
it is for the disk space when you start to add indexes.

ElasticSearch is wonderful when it comes to scaling a cluster. But, it kind of
awkward to model the data in it, due to its bulky query language and limit to
JSON data format.

So, for my new project, naturally I wanted to give a shot to something new, and
ended up picking RethinkDB. To be honest, their docs and about pages don't do
it justice. They talk about being "just another document store" and then focus
too much on its real-time updates capabilities. I mean c'mon, I will spawn my
own web-sockets interface anyways. Just for the sake of maintainability of it.

The really cool thing about RethinkDB though is that they took the best from three
worlds, the dev, the ops and em... SQL actually.

In terms of OPS, #rethinkdb rolls like it's 2015. Clusters are super easy to
spawn. Replication is a breeze. Sharding data between nodes is as easy as never
before. And, unlike Mongo, RethinkDB has a hardwrite mode that will ensure that
your data is actually persisted on a disk. Hehe...

But then, they are really awesome when it comes to DEV. Although RethinkDB is
a document storage, they also have a whole bunch of concepts that are familiar
to SQL devs. There are indexes, collections are treated kind of like tables, they
support joins. More of that, if you have your data sharded between nodes, RethinkDB
supports joins between those nodes, which is _epic!_

Also, they support map-reduce functions, and apparently they split the work
between all nodes in a cluster to make it run more efficiently. Considering
that you can write regular #JavaScript functions for that, it is also pretty
epic to me.

And finally, they have their own objects query language they call ReQL.
Remember how you spent hours going through the ElasticSearch docs back and
fourth, trying to figure how the bloody thing works? Well, forget about that,
ReQL feels like... well, weirdly it feels a lot like mangling with just an
array in JavaScript. But, it's kind of a scopes chain like ActiveRecord in rails.
So, it feels really natural from many perspectives.

Well, that's about it I guess. I've been hacking a project together with RethinkDB
for the last few weeks and so far it is pretty awesome! So, if you are looking
for a document database and have a freedom to choose, I strongly suggest you give
this one a go. You might really like it!
