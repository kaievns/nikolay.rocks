# Responsive Charts With d3 and ReactJS

Okay, so, today a bit of a lengthly post about the dark voodoo of #d3 and #ReactJS
that I wish someone told me about 6 months ago. It's been a thorny road to figure
this out, so I hope it will save you some time.

# React + d3 = ... I'm not sure

I love d3. It's a bit messy but it is such a powerful tool to build all sorts of
visualizations. d3 is not just about graphs, you can do all sorts of magical things
with it, like maps, infographics and so on.

ReactJS is also pretty magical. So, naturally you assume that when you smash
together two magical things, you get unicorns and rainbows. Unfortunately, one
of those two — React to be precise — turns into a control freak and messes with
d3 personal space and sense of Self.

To make them work together you need a bit of good old couples therapy. You need
a thing called [react-faux-dom](https://github.com/Olical/react-faux-dom). What
it does, it creates some boundaries between d3 and React. In the end your code
will look somewhat like so:

```js
import d3 from "d3";
import React from "react";
import ReactFauxDOM = require("react-faux-dom");

export default class Chart extends React.Component {
  render() {
    const boundaryElement = ReactFauxDOM.createElement('div');
    const svg = d3.select(boundaryElement);

    // do the normal d3 things to the `svg` element here

    return boundaryElement.toReact();
  }
}
```

What is happening here is that `react-faux-dom` creates a DOM element which
will be ignored by the React DOM sync-up process. Then within that boundary
element you can build a normal d3 graphs things the usual way. A bit of a hack
around, but it works and allows you to write d3 code in a regular way.

On the other end of the process you will have a regular react based `Chart`
component, which you can inject anywhere as a normal component.

## Do You Even...

If the nugget above seems like a good compromise between react-ness and d3-ness,
then here is the bad part. It's not responsive.

The problem is that d3 is not responsive by the nature. It needs hard predefined
numbers for dimensions upfront. Because d3 will calculate all its magic based on
those sizes. Something like this:

```js
export default class Chart extends React.Component {
  render() {
    const boundaryElement = ReactFauxDOM.createElement('div');
    const svg = d3.select(boundaryElement);

    const width = 800; // px
    const height = 200; // px

    const x = d3.scale.ordinal().rangeBands([0, width]);
    const y = d3.scale.linear().range([height, 0]);

    return boundaryElement.toReact();
  }
}
```

But, when you're rendering a react component you don't really know its sizes.
The width might depend on the browser window size, context, and god knows what
else.

## Use The State Luke!

Here is where the mighty hack of the day comes in. What you need to do is to have
the chart dimensions in the component's state. I'll explain in a second. It is
a two stages process. Firstly, you need to have the sizes in the state and have
them set to any default value that seem appropriate to you; it doesn't really
matter which.

```js
class Chart extends React.Component {
  constructor() {
    super();
    this.state = { width: 400, height: 100 };
  }

  render() {
    const { width, height } = this.state;
    // use the sizes above for the d3 calculations

    return <div className="chart" ref="mainElement">
      { boundaryElement.toReact() }
    </div>
  }
}
```

Now when you have that, you need to tap into `componentDidMount` lifecycle hook
and update those size values based on the real, mounted and rendered element in
the DOM:

```js
class Chart extends React.Component {
  constructor() {
    super();
    this.state = { width: 400, height: 100 };
  }

  componentDidMount() {
    const el = this.refs.mainElement;
    this.setState({ width: el.offsetWidth, height: el.offsetHeight });
  }

  render() {
    const { width, height } = this.state;
    // the rest of the code ....
  }
}
```

What happens here is that the d3 chart will be rendered twice. First time with
the default `400/100` pixels size, and the second time with the real, post render
sizes of the `div.chart` element in the browser. This might sound inefficient,
but in reality no one will notice a thing. The graph will look like it was
rendered for the right sizing in the first time.

Also this approach will make the graphs responsive. Because we read the true
element sizing on the second run, it doesn't matter in which form-factor it's
rendered. You can use normal `@meta` queries on that `div.chart` element, the
component guts will recalculate and follow whatevers.

## Final Touches

And the final piece is to add window resizing handling, so that the component
felt really responsive in every way. Luckily for us, it is very easy to do in
this setup. Just add the `componentWillMount`/`componentWillUnmount` methods that
will add and remove a `resize` event listener to the `window` object:

```js
class Chart extends React.Component {
  constructor() {
    super();
    this.state = { width: 400, height: 100 };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const el = this.refs.mainElement;
    this.setState({ width: el.offsetWidth, height: el.offsetHeight });
  }

  componentWillMount() {
    window.addEventListener("resize", this.componentDidMount);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.componentDidMount);
  }

  render() {
    const { width, height } = this.state;
    // the rest of the code ....
  }
}
```

And there you go. One fully responsive charts engine in #reactjs and #d3; done
and dusted!

Enjoy!
