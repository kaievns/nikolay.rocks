# How To Test Routes With MiniTest

Here we go again. Yet another testing framework for #rails and nothing works :) Well, I hope #minitest will eventually get there, meanwhile, if you're a test junkie and wanna test routes properly in your rails application, here's how you can do that.

Firstly, you'll need to add this in your `test/minitest_helper.rb` or wherever you keep the minitest hooks

```ruby
class MiniTest::Rails::ActionDispatch::IntegrationTest
  register_spec_type(self) do |desc|
    desc.is_a?(String) && desc =~ /routing/i
  end
end
```

Secondly, create the `test/routes` folder and some tests the usual way, for example

```ruby
require 'minitest_helper'

describe "Some routing tests" do
  it "should route root to dashboard" do
    assert_routing "/", class: "dashboard", action: "show"
  end
end
```

The magic thing in here as you might figured is to put the `routing` into the top description call so that we could hook it up correctly

And finally you might wanna add the following into your `Rakefile`

```ruby
if defined?(MiniTest)
  MiniTest::Rails::Testing.default_tasks << 'routes'
end
```

That will make sure that minitest runs your `test/routes` directory with the `rake minitest` task, say on CI or something like that.

That's about it. Enjoy!