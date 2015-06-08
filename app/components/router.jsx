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
