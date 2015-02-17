var Layout = require("./components/layout");
var PostStore = require("./stores/post_store");
var posts = new PostStore();

var App = React.createClass({
  getInitialState() {
    return {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    "blah blah blah",
      sidebar: "blah"
    }
  },

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
});

React.render(<App></App>, document.documentElement);
