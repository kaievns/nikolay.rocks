import PageStore from "../stores/pages";
import PagesList from "./pages";

export default class TaggedPages extends React.Component {
  render() {
    var tag = (this.props.params.tag || "unknown").replace(/\+/g, " ");
    var pages = this.findPages(tag);

    return (
      <article className="pages tagged">
        <h1>Pages tagged: {tag}</h1>

        <PagesList pages={pages} />
      </article>
    )
  }

  findPages(tag) {
    return PageStore.pages.filter(function(page) {
      return page.tags.indexOf(tag) !== -1;
    });
  }
}
