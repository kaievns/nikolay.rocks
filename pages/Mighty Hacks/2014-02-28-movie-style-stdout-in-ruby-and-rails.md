# Movie Style STDOUT in Ruby And Rails

Ever wanted your programs output to look like a cool hacker's console output in a blockbuster movie? Add the following #ruby script into any of your #rails `config/initializers` files

```ruby
STDOUT.instance_eval do
  alias :original_write :write

  def write(text)
    mutex = Mutex.new

    @write_stack ||= "".tap do |stack|
      Thread.new do
        while true
          mutex.synchronize do
            stop = (m = @write_stack.match(/^\e\[[0-9]+m/)) ? m[0].size : 1
            STDOUT.original_write @write_stack.slice!(0, stop)
          end

          sleep 0.01
        end
      end
    end

    mutex.synchronize do
      @write_stack += text
    end
  end
end
```

Enjoy!