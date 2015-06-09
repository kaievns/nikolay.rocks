# Searching Through Non ActiveRecord Data

So, here is a situation many young developers are struggling with when working with #rails and #activerecord. Say you have a `User` model that has a status field. And the actual data in the status filed is mapped to a hash, like so.

```ruby
class User < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :status

  STATUS_LABELS  = {
    active:       'Active',
    suspended:    'Suspended',
    went_to_pub:  'Went To Pub',
    works_at_pub: 'Works At The Pub'
  }

  def status_text
    STATUS_LABELS[status] || status
  end
end
```

This situation appears in Rails development all the time in various ways and people do that for several reasons. Most of them is maintainability, if a manager wants to change the label, you can do so without changing the database table data. Or you want to support multiple languages. Whatever is the reason, it poses a problem.

## The Problem

When you present your data on an HTML table, you use those translated data and looks kinda like that

```text
+-------------+------------------+
| Name        | Status           |
+-------------+------------------+
| Chris       | Suspended        |
| Trung       | Went to pub      |
| Nikolay     | Works at the pub |
+-------------+------------------+
```

And when you add a search bar to that table, users will search entries by whatever they see in the table. So the question is how do you search a table by something that's not in there? Normally if you'd store those labels in a separated table, you could just join tables and make an ` ILIKE '%smth%'` query through all the fields, but you can't coz it's static data.

## The Solution

Solution is really super simple, all you want to do is to define a method that will look through your status labels and return a list of matching status values, say like so

```ruby
class User < ActiveRecord::Base

  def self.matching_statuses(word)
    STATUS_LABELS.map do |value, label|
      value if label.downcase.include?(word.downcase)
    end.compact
  end

end
```

Once you get this, you can write a normal ActiveRecord scope to search through your whole table

```ruby
class User < ActiveRecord::Base

  scope :search, ->(word) {
    where "users.name ILIKE ? OR users.status IN (?)",
      "%#{word}%", User.matching_statuses(word)
  }

end
```

See, nice and simple.

## The Conclusion

The reason why devs often struggle with such a simple thing is that SQL fries your brains and you start thinking tables instead of actual data and objects.

My dear friend, a word of advise, #ruby is awesome and #activerecord is a bloat. Ditch it. In the future, we all gonna wear colorful pajamas and use NoSQL.