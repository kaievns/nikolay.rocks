import Router from "./components/router";
import Layout from "./components/layout";
import PagesStore from "./stores/pages_store";

var pages_store = new PagesStore();

class App extends React.Component {
  render() {
    return(
      <Layout body="Some body, anybody!" sidebar="Sidebar"></Layout>
    );
  }
}

// waiting for the index to load
pages_store.on("change", function() {
  Router.connect(App);
});
