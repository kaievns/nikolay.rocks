# How To Convert Cron Schedules Between Time Zones

So, here is a bit tricky one. Say you have a service that performs some tasks for users on a schedule, and lets say you allow your users to add those tasks by using the [cron schedule format](http://en.wikipedia.org/wiki/Cron).

## The Problem

While it's a rock solid business idea, it has a tricky tech problem. Your server, the one that handles the tasks, is in one time zone, but the actual users are all over the globe. So, when a user in Moscow says `0 1 * * *` (every day at 1:00pm) your server in the  Silicon Valley will run it 10 hours later at `11:00pm` Moscow time, which, might not be what's expected.

So, you need to convert the cron schedule from a user's time zone, to the server's timezone. How do you even?...

## The Solution

Although it seems a bit tricky task, it has a rather simple solution. I've done it in #ruby and #rails, but it can be replicated in any language using the same principle. In a short, the idea is that you convert the schedule into a clean timestamp, then convert that timestamp into the target time zone, and then you convert the timestamp back into a schedule.

```ruby
# breaking it apart
min, hour, dom, month, dow = cron.split
dow = "7" if dow == "0" # in cron both 0 and 7 mean Sunday
```

That was easy, now we need to convert all those `min`, `hour` and stuff into a time stamp

```ruby
# converting the cron data into a timestamp
Time.zone = current_user_timezone # wherever it lives
t = Time.zone.now.beginning_of_month.end_of_week + 14.days + 1.second

t = t + min.to_i.minutes if min  != "*"
t = t + hour.to_i.hours  if hour != "*"
t = t + dow.to_i.days    if dow  != "*"
t = Time.zone.local(t.year, t.month, dom.to_i, t.hour, t.min, t.sec) if dom != "*"
```

There are two tricky moments here. Firstly, you need to make sure that you set `Time.zone` to the current user's timezone and then use `Time.zone.now` to get the current time sample. Secondly, you need to get a clean time stamp at a beginning of the second week of the month. The reason for that so we could move and transform the time without hitting the ends of the month and making things jump back and fourth.

So, this should build you a clean time stamp in the current user's timezone. All the important attributes of the original cron schedule should also be transferred onto this timestamp.

```ruby
# converting the timestamp back into a cron line
t = t.in_time_zone(your_server_timezone)

min  = t.min    if min  != "*"
hour = t.hour   if hour != "*"
dom  = t.day    if dom  != "*"
dow  = t.wday-1 if dow  != "*"

cron = [min, hour, dom, month, dow].compact.join(" ")
```

This is a pretty much routine part. We just convert the schedule timestamp into the server's timezone and then extract all the necessary data from that new timestamp. After that we just rebuild the cron line back into a string.

## Conclusion

It's a bit of a messy thing to do, but cron schedule lines can be converted between timezones, which yields in a much better end user experience than nagging users with mediocre solutions like say asking them to use UTC or something like that.

Also, this solution doesn't obviously handle the `*/num` cron formatting, but that's another story.