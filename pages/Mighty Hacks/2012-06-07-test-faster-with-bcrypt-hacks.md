# Test Faster With BCrypt Hacks

If you're using `BCrypt` in your #ruby-on-rails application and then feel like your #rspec tests run forever, here is a quick tip on how to make your life a bit easier.

Place this into the `spec/support/bcrypt.rb` file

```ruby
#
# Making BCrypt to use the minimal cost so that the specs run faster
#
require 'bcrypt'

module BCrypt
  class Engine
    class << self
      alias :_generate_salt :generate_salt

      def generate_salt(cost = MIN_COST)
        _generate_salt(MIN_COST)
      end
    end
  end
end
```

Basically when you pick any serious size of the salt for production use, it makes things very slow when you run specs, because FactoryGirl (or whatever you use) will generate production grade salt every time you spawn a new model instance. And as it's normally the `User` model, it gets generated a lot, and slows things down.

So, this little hack, makes BCrypt always use the minimal salt size when you run tests regardless to what you set in your actual code. In case of tests it usually doesn't matter anyways.