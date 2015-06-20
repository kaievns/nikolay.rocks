import LegacyMappings from "../stores/old_routes";
import PageStore from "../stores/pages";
import PageView from "../components/page";

export default class LegacyPage extends React.Component {
  render() {
    var file = LegacyMappings[this.props.params.sha];
    var page = this.findPage(file);

    return <PageView page={page} />;
  }

  findPage(file) {
    return PageStore.pages.filter(function(page) {
      return page.file.replace("/pages/", "") == file;
    })[0];
  }
}
