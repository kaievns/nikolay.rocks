var App = React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>Hello</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="./application.css" />
        </head>
        <body>
          <header>
            <div className="paddings">
              <a href="./" className="logo">Nikolay.TheOsom</a>
            </div>
          </header>
          <main>
            <div className="paddings">
              <article>
                <h1>Oh, hi there!</h1>
                <p>
                  {document_text}
                </p>
              </article>
            </div>
          </main>

          <footer>
            <div className="paddings">
              <p>Copyright (C) 2012-{new Date().getFullYear()} Nikolay Nemshilov</p>
            </div>
          </footer>
        </body>
      </html>
    )
  }
});

React.render(<App></App>, document.documentElement);
