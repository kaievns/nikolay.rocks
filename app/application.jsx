import PagesStore from "./stores/pages_store";
import Layout from "./components/layout";

var pages_store = new PagesStore();

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    "blah blah blah",
      sidebar: "blah",
      pages:   pages_store.allPages()
    };
  }

  render() {
    return(
      <Layout
        title={this.state.title}
        body={this.state.body}
        author={this.state.author}
        sidebar={this.state.sidebar}
      ></Layout>
    );
  }
}

// waiting for the index to load
pages_store.on("change", function() {
  document.body.className = "";
  React.render(<App></App>, document.body);
});
