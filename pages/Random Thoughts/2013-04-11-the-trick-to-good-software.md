# The Trick To Good Software

The funny thing about programmers is that we spend years of our professional lives believing that our job is to tell computers what to do.


## The Reality

Reality is that computers do what they were told to do just fine. No matter whether you write `"Hello World"` or kill someone with a drone. Computers do precisely what they were told to.

Your job, your real job is to tell _programmers_, and you yourself in the first place, _what you told computers_ to do. The idea of modern software development is in structuring and cleanly describing task that a computer will perform.

The truth is that #computers don't read what you wrote in your programs, people do. Computers compile your code down to bits and bites and the only ones who see what you actually wrote are other #humans.


## Story Telling

If you start to look at your job and code you produce this way, it becomes immediately apparent that #programming is much like story telling.

Now think of it. How do you know that a guy can't tell stories for squad? It's really simple, when a story teller deviates from the story line all the time, get stuck with unimportant details, constantly jumps back and fourth between the points, etc. you immediately know that the story is gonna suck.

In the end you can understand what happened in the story, you even can retell it, but did you enjoy the story? did you get inspired to retell and maybe extend it?

Same exact thing happens in software. When you write cryptic, full of noise piece of code, no one is going to enjoy it. No one will think of it twice. And you're the first to suffer.


## The Trick

Well, you're here for a simple secret sauce don't you? So here it is

> The less noise your code has the better

Note that I'm not talking about explicit vs. implicit code, convention over configuration, meta-programming evils or any other things of this sort.

The trick to good software is to write in your code exactly what makes sense for the story your code tells. If it's good for the story to be explicit, do it. If the stuff you write has nothing to do with the story, kick it out. Kick it out for good. If it's vaguely coupled, use meta-programming and conventions.


## Examples

Some classical examples to prove the point. Say a post has an author.

```ruby
class Post < ActiveRecord::Base
  belongs_to :author, class_name: 'User', foreign_key: :authored_by
end
```

See? All this noise about class name and foreign keys. Get it out

```ruby
class Post < ActiveRecord::Base
  belongs_to :user
end
```

The second version doesn't have the nice `author` naming in it, but it is much better because it goes straight to the point and in a short sentence tells you everything you need to know.

Another example, say a class needs to set a reference to users who created/edited its records

```ruby
class Setting < ActiveRecord::Base
  belongs_to :creator
  belongs_to :editor

  attr_accessor :editing_user

  before_create :set_creator
  before_update :set_editor

private

  def set_creator
    self.creator = @editing_user
  end

  def set_editor
    self.editor = @editing_user
  end

end
```

Noise, all those callbacks and attr_acessors it's just rubbish that doesn't have much to do with what you're trying to accomplish. Much more explicit and nice way to do it would be say like so.

```ruby
class Setting < ActiveRecord::Base
  belongs_to :creator
  belongs_to :editor

  def editing_user=(user)
    if new_record?
      self.creator = user
    else
      self.editor = user
    end
  end
end
```

See how it now tells exactly what's going on? This code says, we have a creator and an editor and we _assign_ them from the _editing user_. No middle noise about callbacks. No extra noise from having _two_ methods in _private_ namespace.

One more classical example. Massaging your data in a controller

```ruby
class PostsController < ApplicationController
  def create
    if params[:post][:text].present?
      if params[:post][:text] =~ /fuck|cock|shit/
        flash[:error] = "Be nice"
        @achtung = true
      end
    end

    if !@achtung
      @post = Post.new(params[:post])

      if @post.save
        flash[:success] = "Yoo hoo!"
        redirect_to :index
      else
        render :new
      end
    else
      redirect_to :index
    end
  end
end
```

All those conditions have nothing really to do with your controller. To be precise all this logic does not belongs to the controller level at all. Yeah, you can do that and it will work, but it's not good software.

Try this.

```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new(params[:post])

    if @post.save
      flash[:success] = "Yoo hoo!"
      redirect_to :index
    else
      render :new
    end
  end
end

class Post < ActiveRecord::Base
  validate :bad_language_check

private

  def bad_language_check
    if text =~ /fuck|shit|cock/
      errors.add(:text, "has some pretty bad language")
    end
  end
end
```

Now your controller clearly says what's going on. And you can easily see what happens in both cases when it can and cannot create a record. Same of the `Post` class, you can clearly see that it validates the text for bad language. And the checker itself is in the private section, just to hint you that its implementation is not that important for the post itself.


## Conclusion

It's really simple. Want to write good software? Stop writing it for the computers and start writing it for humans.

It is that simple.