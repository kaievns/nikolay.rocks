import settings from "../stores/settings";
import Categories from "../stores/categories";
import CategoryLink from "./category";

export default class Intro extends React.Component {

  render() {
    var intro    = settings.promo;
    var category = Categories.current();

    document.title = settings.title;

    if (category) {
      intro = <CategoryLink name={category} />;
      document.title += " » "+ category;
    }

    return(
      <h1 className="intro">{intro}</h1>
    )
  }
}
