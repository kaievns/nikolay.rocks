var Router = ReactRouter;
var Route  = Router.Route;

import PagesIndex from "../components/index";
import PageView from "../components/page";
import TaggedPages from "../components/tagged";
import CategoryPages from "../components/categorized";
import LegacyPage from "../components/legacy";

export default {
  connect: function(App, callback) {
    var routes = (
      <Route handler={App} path="/">
        <Route path="/" handler={PagesIndex} />
        <Route path="/p/:sha" handler={LegacyPage} />
        <Route path="/tags/:tag" handler={TaggedPages} />
        <Route path="/categories/:category" handler={CategoryPages} />
        <Route path="*" handler={PageView} />
      </Route>
    );

    Router.run(routes, Router.HistoryLocation, function (Handler) {
      callback(Handler);
    });
  },

  Handler: Router.RouteHandler
};

// a work around links, so I didn't have to pass them through react all the time
document.addEventListener("click", function(event) {
  var link = event.target, url = link.getAttribute("href");
  var meta_key = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

  if (event.button === 0 && !meta_key && link.tagName === "A" && url[0] === "/") {
    event.preventDefault();
    fix_scrollers();

    var scroll = document.body.scrollTop;
    Router.HistoryLocation.push(url);
    document.body.scrollTop = scroll > 500 ? 500 : scroll;
    
    window.ga && ga('send', 'pageview', {page: url});
  }
}, false);


// HACK because the componentWillUnmount is not firing
function fix_scrollers() {
  window._scrollers_hack.forEach(function(instance) {
    instance.detachScrollListener();
  });
  window._scrollers_hack = [];
}
