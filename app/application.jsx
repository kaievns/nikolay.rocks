import Router from "./dispatchers/router";
import Layout from "./components/layout";
import PageStore from "./stores/pages";

class App extends React.Component {
  render() {
    return(
      <Layout></Layout>
    );
  }
}

// waiting for the index to load
PageStore.on("load", function() {
  Router.connect(App, function(Handler) {
    document.body.className = "";
    React.render(<Handler/>, document.body);
  });
});
