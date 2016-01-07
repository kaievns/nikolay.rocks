import connect from "unicorn-farts/store/connect";
import PagePreview from "./preview";

class PagesIndex extends React.Component {
  constructor() {
    super();
    this.state = { size: 8, page: 1 };
  }

  currentSize() {
    return this.state.page * this.state.size;
  }

  setPage(page) {
    this.setState({page: page});
  }

  nextPage() {
    this.setPage(this.state.page + 1);
  }

  render() {
    const all_pages = this.props.pages || [];
    const pages     = all_pages.slice(0, this.currentSize());
    const has_more  = this.currentSize() < all_pages.length;

    return (
      <article className="pages">
        {
          pages.map((page, i) => {
            return <PagePreview page={page} key={i} />;
          })
        }
        {
          has_more ?
            <button onClick={this.nextPage.bind(this)} className="load-more">
              Load more
            </button> : null
        }
      </article>
    );
  }
}

export default connect(PagesIndex, (state)=> {
  let { category, tag, pages } = state;

  pages = pages.filter(page => page.createdAt)
    .sort((a,b) => { return a.createdAt > b.createdAt ? -1 : 1; });

  if (category) {
    pages = pages.filter( page => page.category === category );
  } else if (tag) {
    pages = pages.filter( page => page.tags.indexOf(tag) !== -1 );
  }

  return { pages: pages };
});
