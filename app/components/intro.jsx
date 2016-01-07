import settings from "../stores/settings";
import connect from "unicorn-farts/store/connect";
import TagLink from "unicorn-farts/components/tag_link";
import CategoryLink from "unicorn-farts/components/category_link";

const Intro = ({ category, tag }) => {
  let intro = settings.promo;
  let title = settings.title;

  if (category) {
    intro = <CategoryLink name={category} />;
    title = title +" » "+ category;
  } else if (tag) {
    intro = <TagLink name={tag} />;
    title = title +" » "+ tag;
  }

  document.title = title;

  return <h1 className="intro">{intro}</h1>;
};

export default connect(Intro, (state)=> {
  const { category, tag } = state;

  if (category) {
    return { category: category };
  } else if (tag) {
    return { tag: "#"+ tag };
  }
});
