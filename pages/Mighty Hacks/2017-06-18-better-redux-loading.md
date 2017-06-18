# A Better Way To Handle Loading State In Redux

Loading data into single page apps—for example in react/redux—had become pretty
much the standard trick in everyone skillset. Yet, there are more than one way
to do this simple task. So, I'd like to share the one I've been using consistently
in my #redux setups.

Lets say you have a react/redux app feature that loads up a list of items from an
API endpoint. Lets pretend it's a list of cat pictures. In this case your code might
looks somewhat like this:

```js
const PICS_REQUEST = 'pics/REQUEST';
const PICS_SUCCESS = 'pics/SUCCESS';
const PICS_FAILURE = 'pics/FAILURE';

const fetchPics = () => dispatch => {
  dispatch({ type: PICS_REQUEST });

  return api.get('/pics')
    .then(list => dispatch({ type: PICS_SUCCESS, payload: list })
    .catch(error => dispatch({ type: PICS_FAILURE, error }));
};

const picsReducer = (state, action) => {
  switch (action.type) {
    case PICS_REQUEST: return // ...;
    case PICS_FAILURE: return // ...;
    case PICS_SUCCESS: return action.payload;
    default: return state;
  }
};

class PicsContainer extends React.Component {
  // react-redux setup...
  render() {
    const { pics } = this.context.store.getState();

    if (/* loading */) {
      return <Spinner />;
    } else if (/* failed */) {
      return <LoadFailure />;
    } else {
      return <PicsList pics={pics} />;
    }
  }
}
```

As you can see that's a very standard looking setup. And the topic I'm discussing
here is how to represent the `feching` and `failure` states in the redux state
tree.

In my experience, there are two ways people normally go about this problem.

## Option 1: Use a string or null/false data

In this case the reducer returns a non-array value as a marker that the actual
data has not arrived yet. For example like so:

```js
const picsReducer = (state, action) => {
  switch (action.type) {
    case PICS_REQUEST: return 'fetching';
    case PICS_FAILURE: return 'failed';
    case PICS_SUCCESS: return action.payload;
    default: return state;
  }
};

class PicsContainer extends React.Component {
  render() {
    const { pics } = this.context.store.getState();

    if (pics === 'fetching') {
      return <Spinner />;
    } else if (pics === 'failed') {
      return <LoadFailure />;
    } else {
      return <PicsList pics={pics} />;
    }
  }
}
```

This kind of works, but it also produces a problem. The type of the data in the
state tree is changing. It goes from the initial `undefined` to a `string` and
then to an `array`. If you're using a type checker like #flow, it will yell
at you and for a good reason: data type changes are hard to reason about and
very error prone in practice. Let's say an engineer forgot to handle the failure
case in the component. This happens all the time in larger teams:

```js
if (pics === 'fetching') {
  return <Spinner />;
} else {
  // BUG will explode on API failures
  return <PicsList pics={pics} />;
}
```

It will work fine in a happy path situation, and can easily leak through the QA
into the production environment. But, in case of an API failure, this piece of
code with throw an exception and crash the app.

Not so good.

## Option 2: use an object with two props

Another solution I often see looks somewhat like this. The list of pictures
represented as an object which has two properties: `list` and `state`:

```js
const INITIAL_STATE = { status: 'initial', list: [] };
const picsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PICS_REQUEST: return { status: 'fetching', list: [] };
    case PICS_FAILURE: return { status: 'failed', list: [] };
    case PICS_SUCCESS: return { status: 'fetched', list: action.payload };
    default: return state;
  }
};

class PicsContainer extends React.Component {
  render() {
    const { pics: { status, list } } = this.context.store.getState();

    if (status === 'fetching') {
      return <Spinner />;
    } else if (status === 'failed') {
      return <LoadFailure />;
    } else {
      return <PicsList pics={list} />;
    }
  }
}
```

On one side it's a better solution. The entire structure represented by objects
which property types are stable. This is good for avoiding hard failures,
exceptions and such. Unfortunately, the side effect of this approach is that
the state and the data are represented by two separate properties, which means
that in some circumstances it can go split brain.

For example the reducer becomes more complex than the rudimentary implementation
I have above, and then someone accidentally changes the status without changing
the data. Or the other way around. This will result in nasty and hard to debug
issues where the state and data don't match visually.

## Option 3: The Better Way

Here is a slightly better way that I've been using in my apps a fair bit. What
I do is I represent the fetching and failure states by a separate Array instances:

```js
const LOADING_STATE = [];
const FAILURE_STATE = [];

const picsReducer = (state = [], action) => {
  switch (action.type) {
    case PICS_REQUEST: return LOADING_STATE;
    case PICS_FAILURE: return FAILURE_STATE;
    case PICS_SUCCESS: return action.payload;
    default: return state;
  }
};

class PicsContainer extends React.Component {
  render() {
    const { pics } = this.context.store.getState();

    if (pics === LOADING_STATE) {
      return <Spinner />;
    } else if (pics === FAILURE_STATE) {
      return <LoadFailure />;
    } else {
      return <PicsList pics={pics} />;
    }
  }
}
```

The trick here is that no matter what the data is represented by an expected data
type; in this case an empty `Array`. Which means, that no matter what happens
with the reducer data consumer it will work. If someone forgets to add the
`fetching` or `failure` state handles and will attempt to render the data directly,
the worst thing that will happen is that they render an empty list.

On the other hand, because all the arrays are separate instances, I can easily
and inexpensively determine the current state of the data.

As the bonus point, if there are multiple lists that need to be loaded in an app
I can reuse those instances and create smart components that act like filters
in the app. For example:

```js
function Loader({ items, children }) {
  switch (items) {
    case LOADING_STATE: return <Spinner />;
    case FAILURE_STATE: return <LoadingFailure />;
    default: return children;
  }
}

class PicsContainer extends React.Component {
  // react-redux setup...
  render() {
    const { pics } = this.context.store.getState();

    return (
      <Loader items={pics}>
        <PicsList pics={pics} />
      </Loader>
    );
  }
}
```

This makes for good composable and re-usable architecture in the app, which pays
well in the long run when the app becomes more complex.

Well, there is that. I hope this might come handy some day.
