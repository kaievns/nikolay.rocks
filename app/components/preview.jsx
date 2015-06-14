import PostDate from "./date";
import PostContent from "./content";
import TagsList from "./tags";

export default class PagePreview extends React.Component {
  render() {
    var page = this.props.page;

    return (
      <section className="page preview">
        <PostDate date={page.createdAt}/>

        <h2><a href={page.path}>{page.title}</a></h2>

        <PostContent body={page.extract} />

        <a href={page.path}>Keep reading -&gt;</a>
        <TagsList tags={page.tags} />
      </section>
    );
  }
}
