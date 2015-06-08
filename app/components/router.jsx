var Router = ReactRouter;
var Route  = Router.Route;

export default {
  connect: function(App) {
    var routes = (
      <Route handler={App} path="/">

      </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
      document.body.className = "";
      React.render(<Handler/>, document.body);
    });
  },

  Handler: Router.Handler
};
