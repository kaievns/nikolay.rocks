import PagesStore from "../stores/pages_store";
import PostDate from "./date";
import Locker from "./locker";

export default class PageView extends React.Component {
  constructor() {
    super();

    var current_page = PagesStore.find(document.location.pathname);

    this.state = {
      page: current_page
    };

    current_page.on("load", this._pageLoaded.bind(this));
    current_page.load();
  }

  render() {
    var page = this.state.page;

    return (
      <div className="page">
        <h2 className="title">
          <PostDate date={page.createdAt}/>
          {page.title}
        </h2>
        <p>
          {page.body || page.extract}
        </p>

        {!page.body && <Locker/>}
      </div>
    )
  }

  _pageLoaded() {
    this.setState({loaded: true});
  }
}
