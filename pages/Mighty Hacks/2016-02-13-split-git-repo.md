# How To Split a Git Repo In Two

This is the thing I keep doing over and over again when my projects start to
grow too large. And then, I have to google it again, and the results can be
rather conflicting. So, I'll just write it down here, the easy way that works for
me best.

Lets say we have a repo called `super-duper` and I want to extract certain bits
of it into a repo named `super-pooper`. To begin with the task, go into the
parent to `super-duper` directory and just clone the repo locally as it is:

```
git clone super-duper super-pooper
cd super-pooper
```

That, as you might guessed, creates a local git clone of the original repo. Now
within that new copy, you need to run the following magic command:

```
git filter-branch -f --prune-empty --index-filter \
  'git rm --ignore-unmatch --cached -r file1 dir2 dir3' \
  -- --all
```

Note those `file1 dir2 dir3`? Those are things that you want to *remove* from
this new repo. Those are the files that are supposed to stay in the _original_
repo.

You can repeat this command as many times as you need with different file and
directory names, until you get rid of all the stuff you don't want in this new
half of the app.

Once you've done that, got back to the original repo and repeat the same process
but the other way around. Get rid of all the files that you want to go into the
_new repo_.

In the end you should end up with two local repos each containing files that you
want in them. Git histories will be preserved and cleared of the files that
were left or moved to another repo.

Once you have that, force push the original repo (because the history will be
completely different). And then go to the new repo and replace the remote origin
reference to the new git url:

```
cd ../super-pooper
git remote rm origin
git remote add origin git://new-repo/origin.git
git push origin master
```

That is pretty much it. That is how you split a repo in two.
