import App from "unicorn-farts/application";
import Layout from "./components/layout";
import PagesIndex from "./components/index";
import PageView from "./components/page";
import TaggedPages from "./components/tagged";
import CategoryPages from "./components/categorized";
import LegacyPage from "./components/legacy";

App.route({
  "/"                     : PagesIndex,
  "/p/:sha"               : LegacyPage,
  "/tags/:tag"            : TaggedPages,
  "/categories/:category" : CategoryPages,
  "*"                     : PageView
});

App.boot(function(Article) {
  return <Layout article={Article}></Layout>;
});
