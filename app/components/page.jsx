import PagesStore from "../stores/pages_store";
import PostContent from "./content";
import PostDate from "./date";
import Locker from "./locker";
import TagsList from "./tags";

export default class PageView extends React.Component {
  constructor() {
    super();

    var current_page = PagesStore.currentPage();
    current_page.on("load", this._pageLoaded.bind(this));
    current_page.load();

    this.state = { page: current_page };
  }

  render() {
    var page = this.state.page;

    return (
      <article className="page">
        <PostDate date={page.createdAt}/>
        <PostContent body={page.body||page.extract} />

        {!page.body && <Locker/>}

        <a href="/">&lt;- Other posts</a>
        <TagsList tags={page.tags} />
      </article>
    )
  }

  _pageLoaded() {
    this.setState({loaded: true});
  }
}
