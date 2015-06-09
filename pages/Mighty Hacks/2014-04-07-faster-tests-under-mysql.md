# Faster Tests Under MySQL

So, here's a quick and rebellious one. If you have a large project in #ruby-on-rails that is still under #mysql and your tests are painfully slow, chances are you're using the [database_cleaner](https://github.com/bmabey/database_cleaner) gem, and I can help you to make your life easier.

## The Problem

The problem is that `database_cleaner` wipes your entire database after every test, and if your database has enough tables in it this process can be really expensive. This is especially noticeable and frustrating when you write really good, lightweight and very granular tests. The database cleaner will just drag you down.

To be fair there is a transactional mode for database_cleaner, which supposed to run a whole test in one transaction, unfortunately you cannot use it with #mysql, because mysql, unlike #postgresql doesn't support nested transactions. So, if your code uses any sort of SQL transactions, the database_cleaner transaction will fail.

## The Solution

Meanwhile there is a pretty simple and powerful solution. You can extract the list of tables where new rows were created, and then clean only those updated tables. Put this into any file under your `spec/support` folder (assuming you're under #rspec)

```ruby
module OsomCleaner
  def self.clean
    tables_to_delete.each do |table|
      execute "DELETE FROM #{table}"
    end
  end

  def self.tables_to_delete
    result = execute("SELECT table_name FROM information_schema.tables WHERE table_schema = '#{db_name}' AND table_rows > 0")
    result.map{ |row| row[0] } - tables_to_skip
  end

  def self.tables_to_skip
    @tables_to_skip ||= %w{ schema_migrations sessions }
  end

  def self.db_name
    @db_name ||= connection.instance_variable_get('@config')[:database]
  end

  def self.execute(query)
    connection.execute query
  end

  def self.connection
    ActiveRecord::Base.connection
  end
end
```

And then add the following instead of your database cleaner setup

```ruby
RSpec.configure do |config|
  config.use_transactional_fixtures = false

  config.before(:suite) do
    OsomCleaner.clean
  end

  config.after(:each) do
    OsomCleaner.clean
  end
end
```

## Results

The results are obviously contextual and will depend on the number of sql tables you have in your application. In my case, this simple hack dropped the overall tests run time from `~15min` to `~1.5min` (yes, `~8-10x` boost) . The difference even greater on really clean granular tests that don't create too much scaffolding around tested units.

You can optimize it even further by patching the #activerecord connection to execute multiple SQL statements in one query, but it was proven not to be reliable enough and created dead locks in the #mysql connection.

## Caveats

Although this is really neat and pleasant hack it has one small caveat. Deleting things from a table doesn't reset the auto-increment counter on it. Even if you truncate your tables in the cleaner there are still chances that your code deleted everything from the table, and then the cleaner will just skip it because there won't be any records.

But, as I see it, it's fine, your tests shouldn't rely on known record IDs anyways. Besides you can always reset the increment in a `before { }` block manually whenever you're really need it.

And that's the whole hack, Enjoy!