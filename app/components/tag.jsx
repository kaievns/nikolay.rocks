export default class TagLink extends React.Component {

  render() {
    var url = "/tags/"+ this.props.name.replace(/ /g, "+");
    var text = this.props.text || this.props.name;

    return (
      <a href={url} className="tag">{text}</a>
    );
  }

}
