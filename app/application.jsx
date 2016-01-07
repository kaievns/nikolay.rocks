import boot from "unicorn-farts/application";
import Layout from "./components/layout";
import PagesIndex from "./components/index";
import PageView from "./components/page";

boot(Layout, {
  "/":                     PagesIndex,
  "/tags/:tag":            PagesIndex,
  "/categories/:category": PagesIndex,
  "*page":                 PageView
});
