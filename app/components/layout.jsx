import settings from "../stores/settings";
// import Sidebar from "./sidebar";
import Intro from "./intro";

export default ({ Article }) => {
  Article = Article || "article";

  return (
    <body>
      <header>
        <div className="paddings">
          <a href="/" className="logo">{settings.title}</a>
          <Intro />
        </div>
      </header>
      <main>
        <div className="paddings">
          <Article />
          <aside>sidebar</aside>
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
