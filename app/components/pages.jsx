import PagePreview from "./preview";
import InfiniteScroll from "./scroller";
import Locker from "./locker";

export default class PagesList extends React.Component {

  constructor() {
    super();

    this.state   = { size: 8, page: 1 };
    this.setPage = this.setPage.bind(this);
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

  render() {
    return (
      <InfiniteScroll loader={<Locker/>} setPage={this.setPage} hasMore={this.state.more}>
        {
          this.getPages().map(function(page, index) {
            return <PagePreview page={page} key={index} />;
          })
        }
      </InfiniteScroll>
    );
  }
}
