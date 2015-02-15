var document_text = "post text";

var App = React.createClass({
  getInitialState() {
    return {
      title:   "Hello",
      author:  "Nikolay Nemshilov",
      body:    document_text,
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
