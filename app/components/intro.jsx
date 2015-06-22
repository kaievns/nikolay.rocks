import settings from "../stores/settings";
import PageStore from "../stores/pages";
import CategoryLink from "./category";

export default class Intro extends React.Component {

  render() {
    var page  = PageStore.currentPage();
    var intro = settings.promo;

    document.title = settings.title;

    if (page && page.category) {
      intro = <CategoryLink name={page.category} />;
      document.title += " > "+ page.category;
    }

    return(
      <h1 className="intro">{intro}</h1>
    )
  }
}
