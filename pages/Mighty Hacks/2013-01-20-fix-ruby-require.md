# Fix Ruby require

Requiring things in ruby always were kind of ugly business and you would see things like that all the time

```ruby
require File.join(File.dirname(__FILE__), "boo", "hoo")
```

And to address the issue, in Ruby 1.9 they did the silliest possible thing, they introduced the `require_relative` function.

Why is it silly? Coz you don't need it! Humanity's been using the `require "./somthing"` syntax for ages and everyone's got used to it already!

More of that, you can actually hack it on fly, right in ruby itself, right now!

```ruby
alias :__require :require

def self.require(str)
  if str[0] == '.'
    require_relative str
  else
    __require str
  end
end

require 'some/global/lib'
require './some/relative/lib'
```

Enjoy!

PS: You also can get rid of the `File.join` calls that way and split/join the strings on fly.