import PagesStore from "../stores/pages_store";
import PagePreview from "./preview";

export default class PagesIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      pages: PagesStore.inst().pages
    };
  }

  render() {
    return (
      <div id="pages">
        {this.renderPreviews()}
      </div>
    );
  }

  renderPreviews() {
    return this.recentPages().map(function(page) {
      return <PagePreview page={page} />;
    });
  }

  recentPages() {
    return this.state.pages.sort(function(a,b) {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  }
}
