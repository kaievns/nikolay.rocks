import Layout from "./components/layout";
import PagesStore from "./stores/pages_store";

var pages_store = new PagesStore();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    "blah blah blah",
      sidebar: "blah"
    };
  }

  componentDidMount() {
    pages_store.on("change", this._pagesChanged.bind(this));
  }

  componentWillUnmount() {
    pages_store.on("change", this._pagesChanged.bind(this));
  }

  render() {
    return (
      <Layout
        title={this.state.title}
        body={this.state.pages}
        author={this.state.author}
        sidebar={this.state.sidebar}
      ></Layout>
    );
  }

  _pagesChanged() {
    this.setState({pages: pages_store.pages});
  }
}

React.render(<App></App>, document.body);
