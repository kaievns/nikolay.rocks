import Router from "../dispatchers/router";
import settings from "../stores/settings";
import PageStore from "../stores/pages";
import Sidebar from "./sidebar";
import CategoryLink from "./category";

export default class Layout extends React.Component {

  render() {
    document.title = settings.title;

    var page  = PageStore.currentPage();
    var intro = settings.promo;

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
