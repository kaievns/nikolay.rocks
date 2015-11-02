import TagsList from "./tags";
import CategoryLink from "unicorn-farts/components/category_link";
import TagsStore from "unicorn-farts/stores/tags";
import CategoriesStore from "unicorn-farts/stores/categories";

export default class Sidebar extends React.Component {
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
    var tags       = TagsStore.all();
    var categories = CategoriesStore.all();

    return (
      <aside className={this.state.open ? 'open' : null}>
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

          <ul>
            {
              categories.map(function(category, i) {
                return <li>
                  <CategoryLink name={category} key={i} />
                </li>;
              })
            }
          </ul>
        </section>

        <section className="tags">
          <h3>Tags</h3>

          <TagsList tags={tags.slice(0, 25)} />
        </section>
      </aside>
    );
  }
}
