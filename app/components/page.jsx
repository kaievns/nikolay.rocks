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
    var body = page.body || page.extract;

    return (
      <div className="page">
        <PostDate date={page.createdAt}/>

        <div dangerouslySetInnerHTML={{__html: body}}></div>

        {!page.body && <Locker/>}
      </div>
    )
  }

  _pageLoaded() {
    this.setState({loaded: true});
  }
}
