import boot from "unicorn-farts/application";
import Layout from "./components/layout";

const MainIndex     = () => { return <article>Index page!</article> };
const TaggedIndex   = () => { return <article>Tagged index</article> };
const CategoryIndex = () => { return <article>Category index</article> };
const PageView      = () => { return <article>page view</article> };

boot(Layout, {
  "/":                     MainIndex,
  "/tags/:tag":            TaggedIndex,
  "/categories/:category": CategoryIndex,
  "/*page":                PageView
});
