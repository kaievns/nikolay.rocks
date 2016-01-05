import connect from "unicorn-farts/store/connect";
import TagLink from "unicorn-farts/components/tag_link";
import CategoryLink from "unicorn-farts/components/category_link";

class Sidebar extends React.Component {
  constructor() {
    super();

    this.state       = { open: false };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(event) {
    event.preventDefault();
    this.setState({open: !this.state.open});
  }

  render() {
    const tags       = this.props.tags || [];
    const categories = this.props.categories || [];

    return (
      <aside className={this.state ? 'open' : null}>
        <a href="#" className="toggler" onClick={this.toggleState}></a>

        <section className="about">
          <h3>About the author</h3>

          <div className="author"></div>

          <p>
            Nikolay Nemshilov<br/>
            Sydney, NSW
          </p>
        </section>

        <section className="contacts">
          <h3>Contacts</h3>

          <p>
            <a href="https://twitter.com/nemshilov" className="twitter" target="_blank">@nemshilov</a> <br/>
            <a href="https://github.com/MadRabbit" className="github" target="_blank">GitHub/MadRabbit</a> <br/>
            <a href="https://au.linkedin.com/pub/nikolay-nemshilov/14/78b/78" className="linkedin">LinkedIn</a><br/>
            <a href="/resume" className="resume">Resume</a>
          </p>
        </section>

        <section className="categories">
          <h3>Categories</h3>

          <ul className="categories">
            { categories.map((name,i) => {
              return <li>
                <CategoryLink name={name} key={i} />
              </li>
            }) }
          </ul>
        </section>

        <section className="tags">
          <h3>Tags</h3>

          <div className="tags">
            { tags.map((tag, i) => { return <TagLink name={tag} key={i} /> }) }
          </div>
        </section>
      </aside>
    );
  }
}

export default connect(Sidebar, (state)=> {
  return {
    categories: state.categories,
    tags:       state.tags.slice(0, 24)
  };
});
