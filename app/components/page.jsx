import PagesStore from "../stores/pages_store";
import PostContent from "./content";
import PostDate from "./date";
import Locker from "./locker";

export default class PageView extends React.Component {
  constructor() {
    super();

    var current_page = PagesStore.find(document.location.pathname);
    current_page.on("load", this._pageLoaded.bind(this));
    current_page.load();

    this.state = { page: current_page };
  }

  render() {
    var page = this.state.page;

    return (
      <div className="page">
        <PostDate date={page.createdAt}/>
        <PostContent body={page.body||page.extract} />

        {!page.body && <Locker/>}
      </div>
    )
  }

  _pageLoaded() {
    this.setState({loaded: true});
  }
}
