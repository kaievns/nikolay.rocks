import PagesStore from "./stores/pages_store";
import Layout from "./components/layout";

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
  document.body.className = "";
  React.render(<App></App>, document.body);
});
