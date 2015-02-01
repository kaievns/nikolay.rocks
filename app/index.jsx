var App = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>Hello</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <h1>Oh, hi there!</h1>
        </body>
      </html>
    )
  }
});

React.render(<App></App>, document.documentElement);
