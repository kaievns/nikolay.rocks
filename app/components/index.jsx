import PageStore from "unicorn-farts/stores/pages";
import PagesList from "./pages";

export default class PagesIndex extends React.Component {
  render() {
    return (
      <article className="pages">
        <PagesList pages={this.blogPages()} />
      </article>
    );
  }

  blogPages() {
    return PageStore.pages.filter((page)=> !isNaN(page.createdAt) );
  }
}
