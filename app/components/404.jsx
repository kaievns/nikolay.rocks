export default class NotFound extends React.Component {
  render() {
    return (
      <article className="page not-found">
        <h1>404 Error</h1>

        <p>
          Page is not found :(
        </p>

        <p>
          <a href="/">But there are pleny of other awesome pages!</a>
        </p>
      </article>
    );
  }
}
