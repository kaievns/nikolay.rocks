import TagsList from "./tags";
import PagesStore from "../stores/pages_store";
import CategoryLink from "./category";

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
    return (
      <aside className={this.state.open ? 'open' : null}>
        <a href="#" className="toggler" onClick={this.toggleState}></a>

        <section className="about">
          <h3>About the author</h3>

          <img src="/app/assets/author.jpg" className="author" />

          <p>
            Nikolay Nemshilov
          </p>
        </section>

        <section className="contacts">
          <h3>Contacts</h3>

          <p>
            <a href="https://twitter.com/nemshilov" className="twitter" target="_blank">@nemshilov</a> <br/>
            <a href="https://github.com/MadRabbit" className="github" target="_blank">GitHub/MadRabbit</a>
          </p>
        </section>

        <section className="categories">
          <h3>Categories</h3>

          <ul>
            {
              this.allCategories().map(function(category, i) {
                return <li>
                  <CategoryLink name={category} key={i} />
                </li>;
              })
            }
          </ul>
        </section>

        <section className="tags">
          <h3>Tags</h3>

          <TagsList tags={this.allTags().slice(0, 25)} />
        </section>
      </aside>
    );
  }

  allTags() {
    var tag_counts    = {};
    var weighted_tags = [];

    PagesStore.inst().pages.forEach(function(page) {
      page.tags.forEach(function(tag) {
        !tag_counts[tag] && (tag_counts[tag] = 0);
        tag_counts[tag] += 1;
      });
    });

    for (var tag in tag_counts) {
      weighted_tags.push({t: tag, c: tag_counts[tag]});
    }

    weighted_tags.sort(function(a, b) {
      return a.c > b.c ? -1 : a.c === b.c ? 0 : 1;
    });

    return weighted_tags.map(function(entry) {
      return entry.t;
    });
  }

  allCategories() {
    var category_counts     = {};
    var weighted_categories = [];

    PagesStore.inst().pages.forEach(function(page) {
      if (!page.category) { return; }

      var category = page.category;
      !category_counts[category] && (category_counts[category] = 0);
      category_counts[category] += 1;
    });

    for (var category in category_counts) {
      weighted_categories.push({n: category, c: category_counts[category]});
    }

    weighted_categories.sort(function(a, b) {
      return a.c > b.c ? -1 : a.c === b.c ? 0 : 1;
    });

    return weighted_categories.map(function(entry) {
      return entry.n;
    });
  }
}
