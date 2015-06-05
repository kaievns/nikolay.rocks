import Layout from "./components/layout";
import PostStore from "./stores/post_store";

class App extends React.Component {
  getInitialState() {
    return {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    "blah blah blah",
      sidebar: "blah"
    };
  }

  render() {
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

React.render('<App></App>', document.documentElement);
