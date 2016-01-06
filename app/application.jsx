import boot from "unicorn-farts/application";
import Layout from "./components/layout";
import PagesIndex from "./components/index";

const PageView = () => { return <article>page view</article> };

boot(Layout, {
  "/":                     PagesIndex,
  "/tags/:tag":            PagesIndex,
  "/categories/:category": PagesIndex,
  "/*page":                PageView
});
