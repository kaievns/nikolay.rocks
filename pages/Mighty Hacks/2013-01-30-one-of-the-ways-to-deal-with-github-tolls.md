# One Of The Ways To Deal With GitHub Tolls

Today was a successful day, I pissed off some guy on the internet well enough for him to go to #github and make a pull request with some TL;DR comment that supposed to be offensive or something.

So, I've figured: "hey, i've got 5 mins of free time, i could make something out of it".

```
cd my-project
git remote add nice-dude https://github.com/nice-dude/my-project
git fetch nice-dude
git checkout -b hohoho
git merge nice-dude/master
git revert HEAD --no-commit
git commit --allow-empty --amend -m "Hey Nikolay, I'm sorry for being a dick to you"
git checkout master
git merge hohoho
git push
```

Now when people go to the #git commits log, they can see how this dude is saying sorry for being a dick on your project.

Enjoy! :)