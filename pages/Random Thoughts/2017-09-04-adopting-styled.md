# Adopting Styled Components at Shortlyster

I would like to share some positive experiences we had while adopting
[styled components](https://www.styled-components.com) at my current day job.
So far we've spent a month transitioning a rather large project from css-modules
into #styled. It wasn't all rainbows and roses, not everything completed yet, but
the team rather pleased with the dynamic and direction of the transformation.

But, a bit of a context first. I'm very comfortable with #css; to put it mildly.
I started in the days when you had to put `1x1.gif` files in empty table cells
to make layouts render properly in Netscape Navigator. And i'm still winging it
in the modern days of the flexbox magic. Which pretty much means that I was
opposing all attempts to write CSS in #javascript to this day.

I personally find the ubiquitous those days hate for CSS misguided. I see it
more as an immature tantrum than an attempt to solve a problem. And the problem
is that CSS scales poorly across teams and larger projects.

Until styled components css modules was the best attempt to mitigate the drawbacks
and enable a larger scale collaboration in a team. But, unfortunately, it didn't
solve the root of the problem, which, in my opinion, is the way the styles
composition works in CSS.

The problem with css modules is the same as it is with CSS. It provides _re-usable_
bits of styles that you sparkle here and there on top of your HTML to get the
pages look right. Now, re-usability per se is a wonderful idea. But, an option
to quickly build a lot of bad abstractions for the sake for re-usability is the
source of all evil in software engineering. Sadly, CSS excels at this; and
css modules follow the suit.

Where styled components are different in my view is that they make it rather
hard to use css classes. The whole point of styled components, as I see it is
to move you away from CSS classes as far as possible. In return, styled allows
to reason about your UI system in the familiar terms of components. Every time
you want to style something in styled components, it is a very direct and
immediate experience.

```js
const GreenButton = styled.button`
  background-color: green;
  color: white;
`;
```

Pause here for a second and consider the code above. It doesn't say: _"well it's
a pair of BUTTON tags with a className *green-button* which is composed of
two tachions green-bg and white-fg"_. All it says is that it's a `button` _component_
that has a green background and white text. See the difference? If tomorrow
someone says: _"we need another button, just like this one, but red"_, you do
the following:

```js
const RedButon = styled(GreenButton)`
  background-color: tomato;
`;
```

That's it. There is no this mental train like you had before:

```
HTML -> class names -> cascading rules -> styles
```

There is simply this:

```
Component -> styles
```

You don't build re-usable random pieces of styles and sprinkle them on your HTML
in a random pattern anymore. You make re-usable _components_. And that makes all
the difference.

So, this all great pieces of technology and it's all wonderful, but, what about
a team, I hear you asking. And I feel you. Really. And that's where it gets
really interesting.

If substandard abstractions is the biggest pain in the neck in software. Then
communication overhead is the biggest buzz killer in engineering teams. If you
successfully made a senior engineer to stare blankly for 30 minutes at random
pieces of CSS to figure out why a button is 3 pixels bigger than it needs to be,
you have a very serious problem. The best case scenario the engineer will quit
on you — and, frankly, rightly so. The worst case scenario they turn out to be
a hard working individual, and they will go and interrogate another three engineers
on the team to get to the bottom of it. Then they will call for an engineering
team meeting and spend another 1-2 human/days in treading water. See where
I'm going with this?

Styled components inadvertly remedy this problem by simplifying the whole construct.
There is just one file, one standard React component, and one very standard
piece of CSS. Everything in one place, no writes attached. In this situation it
turned out it is very hard to miscommunicate ones intentions. And this exact
feature worked magic for our team for the past month.

As the result, when a tester tells you that _"the sign in button is too wide"_.
You simply open up the `SignInButton.js` file and assert yourself to the code
in a civilized way. End of story.

Well, that is pretty much it for the story. I hope it helped to shed some light
into our experience with styled components and painted a picture for you.

In the end, my opinion is that whether you're a seasoned pro or just starting,
you might greatly benefit from what styled components have to offer. Tread
without fear my friend, the path is clear.
