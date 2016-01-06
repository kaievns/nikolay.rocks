import connect from "unicorn-farts/store/connect";
import PagePreview from "./preview";

class PagesIndex extends React.Component {
  constructor() {
    super();

    this.state    = { size: 8, page: 1 };
    this.nextPage = this.nextPage.bind(this);
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
            <button onClick={this.nextPage} className="load-more">
              Load more
            </button> : null
        }
      </article>
    );
  }
}

export default connect(PagesIndex, (store)=> {
  let { category, tag } = store.route.params;
  let pages = store.pages.sort(function(a,b) {
    return a.createdAt > b.createdAt ? -1 : 1;
  });

  if (category) {
    pages = pages.filter( page => {
      return page.category == category;
    });
  } else if (tag) {
    pages = pages.filter( page => {
      return page.tags.indexOf(tag) !== -1;
    });
  }

  return { pages: pages };
});
