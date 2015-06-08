export default class PostContent extends React.Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.body}}></div>
    );
  }

  highlightCode() {
    var domNode = React.findDOMNode(this);
    var nodes = domNode.querySelectorAll('pre code');

    for (var i=0; i < nodes.length; i++) {
      hljs.highlightBlock(nodes[i]);
    }
  }
}
