# Dockerizing NodeJS App Like It Is 2016

So, obviously #docker is not a big news anymore. But, in the last couple of years
it was through quite few iterations; and the way it's cool to do it in 2016 is
not quite the same as it was. So, here is how I dockerize #nodejs apps those days
so that they'd scale and not cause too much pain in dev.

## Docker Beta

First of all, if you're still not aware of this, docker has native support for
OS X now. At the time when I'm writing this, it is called
[docker beta](https://beta.docker.com) and you might want to enroll for it.

The word "beta" might sound a bit dodgy, but, trust me, I've been using it for
months and it was nothing but rock solid so far. Kudos to google engineers for that.

So, throw away all your `boot2docker` hacks and virtual box VMs. You need the
native docker support to truly enjoy it. It's way faster and more powerful than
the old VM based version.

## Dockerfile

The `Dockerfile` wasn't quite changed in those years. Mine looks somewhat like
this:

```
FROM node:6

WORKDIR /app

COPY ./package.json /app

RUN NODE_ENV=null npm install
RUN npm cache clean

ADD . /app
```

There are few tricks and changes to the canonical way of dealing with this
problem though. Firstly, set your work dir to `/app`, this will make configuration
management easier in the future. I know it's not ubuntu or whatever's way,
but you're not really in ubuntu anymore, are you? With Docker you don't
really care anymore, it's just a thing that runs your _app_. So, having `/app`
as the primary source of contact makes sings simple and self-explanatory.

Secondly, copy the `package.json` and run `npm install` _before_ you add the
rest of the app code base to the container. This way the dependencies installation
step will be cached in the docker layers and docker won't run it again every
time some of your code changes.

Thirdly, don't have any `CMD` in it, your actual command layer will be driven
by docker-compose. See below.

## Enter docker-compose

Perhaps the biggest change of all in terms of how we run dockerized apps those
days is that we use `docker-compose` now. No more mangling with connecting the
containers and databases manually, no more joggling with networks, namespaces,
etc. `docker-compose` takes care of all those things for you automatically.

All you need to do is to create a `docker-compose.yml` file that looks somewhat
like this:

```yml
app:
  build: .
  command: npm start
  volumes:
    - .:/app
    - /app/node_modules
  environment:
    MONGODB_HOST: mongodb
    MONGODB_NAME: db_name
    PORT: 3000
  ports:
    - 3000:3000
  links:
    - mongodb

mongodb:
  image: mongodb:latest
```

There are few tricks going on in here as well. Firstly, the `volumes` section.
We bind the current working directory to the docker container working directory
`/app`. But we also have this weird declaration that looks like `/app/node_modules`.
What this does is it creates a thing called a logical volume for your `node_modules`
folder inside the container. This way the container will isolate the `node_modules`
folder from whatever is installed in your guest OS.

You want to create this volumes separation for couple of reasons. Firstly, if
you don't do this, docker-compose will use your guest OS installed packages
inside of the container, which means you won't have a true separation between
the guest OS and the container. Some packages might behave differently between
OSX and Linux. Secondly, if a package has any sort of binary extensions — `bcrypt`
is the usual culprit — those linked modules will simply not work in a different OS.
So, forcing docker to install all the deps saves a lot of headache and frustration
in the future and adds a better level of confidence in the final work.

Then we have linked services, in this case it is just #mongodb, but it could be
a lot of things. For example if you're working in a micro-services heavy environment,
this might be a life savior. Being able to boot and link things together within
a project makes life way simpler.

And finally, notice nice things like a sanely default `npm start` command, exposed
by default ports and ENV vars that allow you to override for example a database
name when you run tests.

All you have to do once you have this setup is to run:

```
docker-compose up
```

Docker compose will setup all the internals for you automatically.

## A Shorter Version

If you don't have any packages with binary extensions in your dependencies. If
you're just hacking something super basic together and want to keep it simple.
There is a shorter version of this story. You can skip the `Dockerfile` completely
and have `docker-compose.yml` that looks something like this:

```yml
app:
  image: node:latest
  command: npm start
  working_dir: /app
  volumes:
    - .:/app
  environment:
    MONGODB_HOST: mongodb
    MONGODB_NAME: db_name
    PORT: 3000
  ports:
    - 3000:3000
  links:
    - mongodb

mongodb:
  image: mongodb:latest
```

In this case `docker-compose` will just link your `node_modules` folder from
the guest OS and use the `node:latest` image by default.

## Conclusion

Docker compose changed a lot for me in terms how I do dev those days. There is
no more question like "oh, this exotic DB looks promising, but how do I install
and maintain it on my localhost". I just make it a dependent service and use
an existing docker image. It is as simple as that.

It also allowed me to be able to quickly link any weird micro-services together
without worrying things like networking, ports, IP addresses, firewalls and such.
I'm just throwing them into the main docker-compose file as dependent services
and be done with it.

And finally being able to completely isolate the runtime from the guest OS engrains
a much higher level of trust into the final build. I'm not worried anymore about
discrepancies between the dev machine and the production environment. It's all
the same now.

Well, I think that's all for today. I hope this helped.
