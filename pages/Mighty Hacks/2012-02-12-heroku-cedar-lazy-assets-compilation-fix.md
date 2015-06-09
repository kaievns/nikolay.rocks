# Heroku Cedar Lazy Assets Compilation Fix

In case you're running a #Ruby-on-Rails app with #MongoID on #Heroku and all your attempts to make the lazy assets compilation work are futile, cheer up my friend, coz we've got a proper hack for you!

Basically the issue looks like that, you switch on lazy assets compilation in your `config/application.rb` file, but when you try to deploy on heroku, you see an error like that in your deployment log

```
-----> Preparing app for Rails asset pipeline
       Running: rake assets:precompile
       rake aborted!
       Failed to connect to a master node at localhost:27017

       Tasks: TOP => environment
       (See full trace by running task with --trace)
       Precompiling assets failed, enabling runtime asset compilation
```

This issue is quite simple. Heroku just don't run their database for you when you merely try to compile your assets with the `rake assets:precompile` command. And as MongoID is trying to connect to the database when rails environment is loaded, you've got the crash.

## The Hack

I believe the fix is on the way and [Durran Jordan](https://github.com/durran) should make it work in the next gem update, meanwhile you can use the following hack. Place this into your `config/application.rb` file below the `require` commands (before your app configuration)

```ruby
if (ARGV[0] || '').slice(0,17) == 'assets:precompile'
  module ::Mongoid
    def self.load!(config_file)
      puts "Skipping connection to Mongo DB"
    end
  end
end
```

This basically stubs the database connection when you run any of the `assets:precompile` tasks.

__NOTE__ don't place it in a ruby file in the `config/initializers` directory. MongoID checks the database connection before any of your initializers are called.

That's pretty much it. After that, your deployment log shoulda look like that

```
-----> Preparing app for Rails asset pipeline
       Running: rake assets:precompile
       Skipping connection to Mongo DB
       Skipping connection to Mongo DB
-----> Rails plugin injection
```

Enjoy!

PS: Check this [Aleksey Gureiev's blog post](http://blog.noizeramp.com/2011/10/14/rails-3-asset-pipeline-on-heroku-when-using-mongoid/) he described the issue first and deserve a dozen of kudos! Although the hack described in there doesn't work for everyone  :)


## Update

Seems like in Rails 3.2 they had added a special config option to handle the issue

```
config.assets.initialize_on_precompile = false
```

You need to add this into your `config/application.rb` file