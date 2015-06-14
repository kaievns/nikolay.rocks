import TagLink from "./tag";

export default class TagsList extends React.Component {
  render() {
    var tags = this.props.tags;

    if (tags && tags.length > 0) {
      return (
        <div className="tags">
          {
            tags.map(function(tag, i) {
              return <TagLink name={tag} key={i} />;
            })
          }
        </div>
      )
    } else {
      return null;
    }

  }
}
