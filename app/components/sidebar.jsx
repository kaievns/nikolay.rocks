export default class Sidebar extends React.Component {
  render() {
    return (
      <aside>
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
            <a href="https://twitter.com/nemshilov" target="_blank">@nemshilov</a> <br/>
            <a href="https://github.com/MadRabbit" target="_blank">GitHub/MadRabbit</a>
          </p>
        </section>
      </aside>
    );
  }
}
