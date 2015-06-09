# Imageless Icons In CSS

This is not the kinda stuff you should do in production, but there is a little #CSS trick that might help you.

The problem with us developers is that it's much quicker and easier for us to write couple of lines of code than find an appropriate image and place it on a page. If that's about you, then here is a little css hack for you that will make your life easier.

Say you make all sorts of action links on your page, thins like `edit`, `delete`, `add new` and so on. Normally you would just add related css classes to them like so

```html
<a href="/stuff/new" class="add">New stuff</a>
<a href="/stuff/123/edit" class="edit">Edit stuff</a>
<a href="/stuff/123" data-method="delete" class="delete">Delete</a>
```

The basic idea is that you create some semantically correct links in your #HTML and then paint them with CSS. Often people use icons and so on

```css
a.add {
  padding-left: 20px;
  background: url('/icons/add.png') no-repeat left center;
}
```

The problem is that you will need to bother with the icon images, drag around a collection of some default pictures or something like that and it usually a bit annoying because in early stages of development it doesn't matter what you put in there, later on your boss will hire a designer who will screw everything anyways.

To save yourself a bit of time and feel more hardcore, you actually can use a simple css hack with the `:before` constructions and utf-8 symbols. Like that

```css
a.add:before {
  content: "\u271A  ";
}
a.edit {
  color: gren;
}
a.edit:before {
    content: "\u270E  ";
}
a.delete {
  color: red;
}
a.delete:before {
    content: "\u2718  ";
}
```

Those weird numbers are the UTF-8 codes of various symbols. You can find them in the Internet, or if you're under OSX, then you can open up the character viewer, find an UTF-8 icon you like and get your code from the character info. In the end it will look kinda like that

![utf-8 based imageless icons](/images/2012/03/utf-8-symbols-tBVN.png)

The nice thing about this approach is that it's really quick to implement. You just get an UTF-8 code from the character viewer, paste it in your CSS and that's it.

Later on, when you have an actual design, you always can replace those things with proper images.

__NOTE__: your page have to be in UTF-8 encoding, otherwise you'll see squares in place of the icons