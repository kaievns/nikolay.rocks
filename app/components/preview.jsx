import PostDate from "./date";

export default class PagePreview extends React.Component {
  render() {
    var page = this.props.page;

    return (
      <div className="page preview">
        <PostDate date={page.createdAt}/>
        
        <h2><a href={page.path}>{page.title}</a></h2>

        <div dangerouslySetInnerHTML={{__html: page.extract}}></div>
      </div>
    );
  }
}
