import Router from "./components/router";
import Layout from "./components/layout";
import PagesStore from "./stores/pages_store";

class App extends React.Component {
  render() {
    return(
      <Layout body="Some body, anybody!" sidebar="Sidebar"></Layout>
    );
  }
}

// waiting for the index to load
PagesStore.inst().on("load", function() {
  Router.connect(App);
});
