import settings from "../stores/settings";
import Sidebar from "./sidebar";
import Intro from "./intro";

export default class Layout extends React.Component {

  render() {
    var Article = this.props.article;

    return (
      <body>
        <header>
          <div className="paddings">
            <a href="/" className="logo">{settings.title}</a>
            <Intro/>
          </div>
        </header>
        <main>
          <div className="paddings">
            <Article />
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
