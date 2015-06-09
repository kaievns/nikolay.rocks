# Rails dates and magic created_on hack

To demonstrate the problem I'd like to start with a little rant. There is a very common and very simple task of formatting dates, which people, lets not point the fingers, tend to solve in all sorts of different ways. Say like that

```erb
&lt;h1>User Profile</h1>

<dl>
  <dd>Registered At</dd>
  <dt>&lt;%= @user.created_at.strftime('%d %b %Y %H:%M') %></dt>
</dl>
```

Or, if the date might be missing, then like that

```erb
<dt>&lt;%= @user.created_at.strftime('%d %b %Y %H:%M') if @user.created_at %></dt>
```

Which then usually "optimized" into a helper method

```ruby
module DatesHelper
  def time(time)
    time.strftime('%d %b %Y %H:%M') if time
  end
end
```

Which then, often gets bettererized in something like that

```ruby
def time(time)
  time.strftime(TIME_FORMATTING_FROM_GOD_KNOWS_WHERE) if time
end
```

And if you need to support i18n, things might take some rather disturbing turn...


## Meanwhile

Meanwhile, #rails is actually built to take care of those things for you automatically. All you had to do is to write it in your template like that and go home happily

```erb
<dt><%= @user.created_at %></dt>
```

Because as long as you set your locale correctly in the rails config, it will export your times and dates to strings automatically according to that locale.

This approach is better on many levels. 1) It's a rails convention 2) It keeps the templates clean 3) It never crashes if the date's missing and you forgot to take care of that 4) You can keep the formatting consistent through your app.

And if you feel particularly evil and want your own formatting anyways, you can always configure it like so in any initializer

```ruby
Date::DATE_FORMATS[:default] = "%d/%m/%Y"
Time::DATE_FORMATS[:default] = "%d/%m/%Y %H:%M"
```

Rails is pretty awesome like that, isn't it?


## The Hack

That was the preamble, now to the hack. There is still one valid case when you want to mangle with the times, when you have the automatic `created_at` timestamp on a record and want to present it as a plain date. Say time doesn't really matter. For example

```erb
<dd>Registration Date</dt>
<dt><%= @user.created_at.to_date %></dt>
```

If you happened to do that a lot, you might find it a bit annoying. Firstly, it still can crash if the date is missing for some reason, and secondly you're adding extra noise to your code with explicit dates conversion. If that's the case you might find the following hack useful.

```ruby
class ActiveRecord::Base
  def created_on
    created_at && created_at.to_date
  end

  def created_on=(value)
    self.created_at = value
  end

  def updated_on
    updated_at && updated_at.to_date
  end

  def updated_on=(value)
    self.updated_at = value
  end

private

  def timestamp_attributes_for_create
    [:created_at]
  end

  def timestamp_attributes_for_update
    [:updated_at]
  end
end
```

Just put it somewhere in your `config/initializers` folder and you'll get the `created_on` and `updated_on` methods for free! Now you can say in your code what you really meant

```erb
<dt><%= @user.created_on %></dt>
```

The benefits are obvious, cleaner code, no crashes, and it's built on top of rails conventions, so, no weird stuff, all crystal clear!