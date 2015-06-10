/**
 * Rework of the `react-infinite-scroll` package into ES6 and sanity
 */

window._scrollers_hack = []; // HACK coz the componentWillUnmount is not working :(

export default class InfiniteScroll extends React.Component {

  constructor() {
    super();

    this.currentPage    = 1;
    this.scrollListener = this.scrollListener.bind(this);

    window._scrollers_hack.push(this);
  }

  componentDidMount() {
    this.attachScrollListener();
  }

  componentDidUpdate() {
    this.detachScrollListener();
    this.props.hasMore && this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
  }

  render() {
    return (
      <div>
        {this.props.children}
        {this.props.hasMore && this.props.loader}
      </div>
    )
  }

  attachScrollListener() {
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
  }

  detachScrollListener() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  }

  scrollListener() {
    var threshold = 200; // px

    if (this.nodeBottomPos() - this.scrollBottomPos() < threshold) {
      this.detachScrollListener();

      if (this.props.hasMore && this.props.setPage) {
        this.props.setPage(this.currentPage += 1);
      }
    }
  }

  nodeBottomPos() {
    var node          = React.findDOMNode(this);
    var offset_parent = node.offsetParent;
    var offset_top    = node.offsetTop + (offset_parent ? offset_parent.offsetTop : 0);

    return offset_top + node.offsetHeight;
  }

  scrollBottomPos() {
    var scroll_top = window.pageYOffset !== undefined ? window.pageYOffset : (
      document.documentElement || document.body.parentNode || document.body
    ).scrollTop;

    return scroll_top + window.innerHeight;
  }
}
