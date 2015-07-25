import PagePreview from "./preview";

export default class PagesList extends React.Component {

  constructor() {
    super();

    this.state    = { size: 8, page: 1 };
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.setPage(1);
  }

  allPages() {
    return this.props.pages.sort(function(a,b) {
      return a.createdAt > b.createdAt ? -1 : 1;
    });
  }

  currentSize() {
    return this.state.page * this.state.size;
  }

  setPage(page) {
    this.setState({page: page, more: this.currentSize() < this.allPages().length});
  }

  getPages() {
    return this.allPages().slice(0, this.currentSize());
  }

  nextPage() {
    this.setPage(this.state.page + 1);
  }

  render() {
    return (
      <div>
        {
          this.getPages().map(function(page, index) {
            return <PagePreview page={page} key={index} />;
          })
        }
        {
          this.state.more ?
            <button onClick={this.nextPage} className="load-more">
              Load more
            </button> : null
        }
      </div>
    );
  }
}
