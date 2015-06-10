import PagesStore from "../stores/pages_store";
import PagesList from "./pages";

export default class PagesIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      pages: PagesStore.inst().pages
    }
  }

  render() {
    return (
      <article className="pages">
        <PagesList pages={this.state.pages} />
      </article>
    );
  }
}
