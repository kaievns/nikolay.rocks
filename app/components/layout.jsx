import SettingsStore from "../stores/settings_store";

var settings = new SettingsStore();

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
            <a href="./" className="logo">Nikolay.TheOsom</a>
          </div>
        </header>
        <main>
          <div className="paddings">
            <article>
              <h1>{this.state.title}</h1>
              {this.props.body}
            </article>
            <aside>
              {this.props.sidebar}
            </aside>
          </div>
        </main>
        <footer>
          <div className="paddings">
            <p>Copyright (C) 2012-{new Date().getFullYear()} {this.state.author}</p>
          </div>
        </footer>
      </body>
    );
  }
}
