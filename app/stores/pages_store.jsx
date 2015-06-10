import {EventEmitter} from "events";
import Request from "../utils/request";
import Page from "./page";

export default class PagesStore extends EventEmitter {
  static inst() {
    !this._inst && (this._inst = new PagesStore());
    return this._inst;
  }

  static find(path) {
    return this.inst().pages.filter(function(page) {
      return page.path == path;
    })[0];
  }

  static currentPage() {
    return this.find(document.location.pathname);
  }

  constructor() {
    super();
    this.pages = null;
    this.load();
  }

  load() {
    new Request("/sitemap.xml").get(function(data, xhr) {
      var urls = xhr.responseXML.querySelectorAll("url");
      this.pages = [].slice.call(urls).map(function(url) {
        return new Page(this.extractData(url));
      }.bind(this));
      this.emit("load");
    }.bind(this));
  }

  extractData(url) {
    var data = {
      path:      (url.querySelector("loc")      || {}).textContent,
      createdAt: (url.querySelector("lastmod")  || {}).textContent,
      file:      (url.querySelector("fileloc")  || {}).textContent,
      tags:      (url.querySelector("tags")     || {}).textContent,
      title:     (url.querySelector("title")    || {}).textContent,
      extract:   (url.querySelector("extract")  || {}).textContent
    };

    try { data.path = data.path.split("nikolay.rocks").pop(); } catch(e) {}
    try { data.tags = data.tags.split(","); } catch(e) {}
    try { data.createdAt = new Date(data.createdAt); } catch(e) {}
    try { data.category = data.file.match(/\/pages\/(.+?)\//)[1]; } catch(e) {}

    return data;
  }
}
