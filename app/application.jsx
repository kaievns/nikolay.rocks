import Router from "./dispatchers/router";
import Layout from "./components/layout";
import PagesStore from "./stores/pages_store";

class App extends React.Component {
  render() {
    return(
      <Layout></Layout>
    );
  }
}

// waiting for the index to load
PagesStore.inst().on("load", function() {
  Router.connect(App, function(Handler) {
    document.body.className = "";
    React.render(<Handler/>, document.body);
  });
});
