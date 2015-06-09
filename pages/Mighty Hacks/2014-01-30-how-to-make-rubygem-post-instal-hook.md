# How To Make Rubygem Post Instal Hook

So here is a little hack which not everyone knows. Sometimes you need to run some scriptery after your #rubygem was installed, like say generate some templates or so. For example in [under-os](under-os.com) i needed to put the #RubyMotion templates in place. But unfortunately in gemspecs you can only specify `post_install_message`, which doesn't let you do anything really but print a string on the screen.

But if you really really need to run some #ruby scripts right after a user installs your rubygem, you can abuse the extensions builder. To do so, put this into your `.gemspec` file

```ruby
Gem::Specification.new do |gem|
  ....
  gem.extensions = ['ext/extconf.rb']
end
```

Then create the `ext/extconf.rb` file in your gem's folder with the following content.

```ruby
GO_NUTS_HERE

# add this at the end of the file
require 'mkmf'
create_makefile('')
```

Basically the trick here is to make an empty extension definition and put your ruby code before that. Works like a charm!

PS: Use responsibly :)