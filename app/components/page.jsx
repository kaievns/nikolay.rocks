import PagesStore from "../stores/pages_store";
import PostContent from "./content";
import PostDate from "./date";
import Locker from "./locker";
import TagsList from "./tags";
import NotFound from "./404";

export default class PageView extends React.Component {

  componentWillMount() {
    var page = PagesStore.currentPage();

    if (this.props.hasOwnProperty("page")) {
      page = this.props.page;
    }

    if (page) {
      page.on("load", this._pageLoaded.bind(this));
      page.load();
    }

    this.setState({page: page});
  }

  render() {
    var page = this.state.page;

    if (page) {
      return (
        <article className="page">
          <PostDate date={page.createdAt}/>
          <PostContent body={page.body||page.extract} />

          {!page.body && <Locker/>}

          <a href="/">&lt;- Other posts</a>
          <TagsList tags={page.tags} />
        </article>
      );
    } else {
      return <NotFound />;
    }
  }

  _pageLoaded() {
    this.setState({loaded: true});
  }
}
