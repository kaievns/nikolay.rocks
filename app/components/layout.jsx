export default class Layout extends React.Component {
  render() {
    return (
      <body>
        <header>
          <div className="paddings">
            <a href="./" className="logo">Nikolay.TheOsom</a>
          </div>
        </header>
        <main>
          <div className="paddings">
            <article>
              {this.props.body}
            </article>
            <aside>
              {this.props.sidebar}
            </aside>
          </div>
        </main>
        <footer>
          <div className="paddings">
            <p>Copyright (C) 2012-{new Date().getFullYear()} Nikolay Nemshilov</p>
          </div>
        </footer>
      </body>
    );
  }
}
