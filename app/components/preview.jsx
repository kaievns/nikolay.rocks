import PostDate from "./date";

export default class PagePreview extends React.Component {
  render() {
    var page = this.props.page;

    return (
      <div className="post preview">
        <h2 className="title">
          <PostDate date={page.createdAt}/>
          <a href={page.path}>{page.title}</a>
        </h2>
        <p>
          {page.extract}
        </p>
      </div>
    );
  }
}
