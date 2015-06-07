import Layout from "./components/layout";
import PagesStore from "./stores/pages_store";

var pages = new PagesStore();

class App extends React.Component {
  state: {
    title:   "Hello",
    author:  "Nikolay Nemshilov",
    body:    "blah blah blah",
    sidebar: "blah"
  }

  render() {
    this.state = {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    "blah blah blah",
      sidebar: "blah"
    };

    return (
      <Layout
        title={this.state.title}
        body={this.state.body}
        author={this.state.author}
        sidebar={this.state.sidebar}
      ></Layout>
    );
  }
}

React.render(<App></App>, document.body);
