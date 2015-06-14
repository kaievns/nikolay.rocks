export default class CategoryLink extends React.Component {
  render() {
    var name = this.props.name;
    var url  = "/categories/"+ name.toLowerCase().replace(/ /g, "+");

    return (
      <a href={url} className="category">{name}</a>
    );
  }
}
