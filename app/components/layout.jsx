import Router from "./router";
import settings from "../stores/settings";
import PagesStore from "../stores/pages_store";

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      title:  settings.title,
      author: settings.author
    };
  }

  render() {
    var page = PagesStore.currentPage();

    document.title = this.state.title;

    return (
      <body>
        <header>
          <div className="paddings">
            <a href="/" className="logo">{settings.title}</a>
            <h1 className="intro">{(page && page.category) || settings.title}</h1>
          </div>
        </header>
        <main>
          <div className="paddings">
            <Router.Handler />
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
