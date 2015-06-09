# The Story Of IfNot And Unless

So, kids, that's the bed story time. Please, my dears, gather around and listen to the story of `if !` and `unless`

Once upon a time, there was a little programmer, just like you, and he was growing and growing, becoming smarter and smarter until one day he figured

> Hm. `if !` and `unless` kinda do the same thing.

So, he stopped typing `unless` in his code, then stopped shaving, become dull and boring, then started eat too much pizza and died of a heart attack.

And all because he assumed that because `if !` and `unless` do the same thing, they are the same.

## There is a difference

There is a reason why `unless` was added into the language. Although it has the same exact effect as `if !` it has different meaning.

`if` (and `if !`) define the standard, default flow of the logic. And `unless` is for writing down the exceptional behavior. The first one is inclusive and the other is exclusive.

Lets say you've got a class `Taxpayer` and you wanna him to vote

```ruby
class Taxpayer
  def vote!
    #...
  end
end
```

And lets say you want prevent the same taxpayer from voting twice, coz those are the main rules

```ruby
class Taxpayer
  def vote!
    if ! voted?
      place_a_vote
    end
  end
end
```

But then someone said that they don't wanna non citizen taxpayers to vote, coz who cares about all those poor bastards? Here it's not really part of the voting logic, it's an exception to prevent the second class human beings from changing your cozy life.

In this case you should use `unless`, because it's just a filter before your main logic.

```ruby
class Taxpayer
  def vote!
    fuckoff unless citizen?  # <- exclusive

    place_a_vote if ! voted? # <- inclusive
  end
end
```

And that's the whole story. Now go to bed and dream of some pretty #ruby classes

```ruby
class Unicorn
  def shit
    :rainbows
  end
end
```

Tomorrow it'll be a new day