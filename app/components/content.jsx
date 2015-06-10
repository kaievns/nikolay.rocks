export default class PostContent extends React.Component {
  componentDidMount() {
    this.highlightCode();
    this.rewrapImages();
  }

  componentDidUpdate() {
    this.highlightCode();
    this.rewrapImages();
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.body}}></div>
    );
  }

  highlightCode() {
    this.forEvery("pre code", function(code) {
      hljs.highlightBlock(code);
    });
  }

  rewrapImages() {
    this.forEvery("p a:only-child img:only-child, p img:only-child", function(img) {
      var caption   = img.getAttribute("alt");
      var figure    = document.createElement("figure");
      var paragraph = img.parentNode;
      var link;

      if (paragraph.tagName === "A") {
        link = paragraph;
        paragraph = link.parentNode;
        link.setAttribute("target", "_blank");
      }

      paragraph.replaceChild(figure, link || img);
      figure.appendChild(link || img);

      if (caption) {
        var figcaption = document.createElement("figcaption");
        figcaption.innerHTML = caption;
        figure.appendChild(figcaption);
      }
    });
  }

  forEvery(css_rule, callback) {
    var domNode = React.findDOMNode(this);
    var nodes = domNode.querySelectorAll(css_rule);

    for (var i=0; i < nodes.length; i++) {
      callback(nodes[i]);
    }
  }
}
