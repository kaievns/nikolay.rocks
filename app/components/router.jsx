var Router = ReactRouter;
var Route  = Router.Route;

import PagesIndex from "./index"
import PageView from "./page"

export default {
  connect: function(App) {
    var routes = (
      <Route handler={App} path="/">
        <Route path="/" handler={PagesIndex} />
        <Route path="*" handler={PageView} />
      </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
      document.body.className = "";
      React.render(<Handler/>, document.body);
    });
  },

  Handler: Router.RouteHandler
};

document.addEventListener("click", function(event) {
  var link = event.target, url = link.getAttribute("href");
  var meta_key = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

  if (event.button === 0 && !meta_key && link.tagName === "A" && url[0] === "/") {
    event.preventDefault();
    Router.HistoryLocation.push(url);
  }
}, false);
