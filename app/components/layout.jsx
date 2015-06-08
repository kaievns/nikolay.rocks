import Router from "./router";
import settings from "../stores/settings";

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      title:  settings.title,
      author: settings.author
    };
  }

  render() {
    document.title = this.state.title;

    return (
      <body>
        <header>
          <div className="paddings">
            <a href="/" className="logo">{settings.title}</a>
          </div>
        </header>
        <main>
          <div className="paddings">
            <article>
              <Router.Handler />
            </article>
            <aside>
              {this.props.sidebar}
            </aside>
          </div>
        </main>
        <footer>
          <div className="paddings">
            <p>Copyright (C) 2012-{new Date().getFullYear()} {settings.author}</p>
          </div>
        </footer>
      </body>
    );
  }
}
