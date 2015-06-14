import Router from "../dispatchers/router";
import settings from "../stores/settings";
import PagesStore from "../stores/pages_store";
import Sidebar from "./sidebar";
import CategoryLink from "./category";

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

    var page  = PagesStore.currentPage();
    var intro = settings.title.replace(".", " . ");

    if (page && page.category) {
      intro = <CategoryLink name={page.category} />;
    }

    return (
      <body>
        <header>
          <div className="paddings">
            <a href="/" className="logo">{settings.title}</a>
            <h1 className="intro">{intro}</h1>
          </div>
        </header>
        <main>
          <div className="paddings">
            <Router.Handler />
            <Sidebar />
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
