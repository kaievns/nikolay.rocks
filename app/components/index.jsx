import PagesStore from "../stores/pages_store";
import PagesList from "./pages";

export default class PagesIndex extends React.Component {
  render() {
    var pages = PagesStore.inst().pages;

    return (
      <article className="pages">
        <PagesList pages={pages} />
      </article>
    );
  }
}
