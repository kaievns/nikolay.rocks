import {EventEmitter} from "events";
import Request from "../utils/request";

export default class PagesStore extends EventEmitter {
  static inst() {
    !this._inst && (this._inst = new PagesStore());
    return this._inst;
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
        return new Page(url);
      });
      this.emit("change");
    }.bind(this));
  }
}


class Page {
  constructor(url) {
    this.path      = (url.querySelector("loc")      || {}).textContent;
    this.createdAt = (url.querySelector("lastmod")  || {}).textContent;
    this.file      = (url.querySelector("fileloc")  || {}).textContent;
    this.category  = (url.querySelector("category") || {}).textContent;
    this.tags      = (url.querySelector("tags")     || {}).textContent;

    try { this.tags = this.tags.split(","); } catch(e) {}
    try { this.createdAt = JSON.parse('"'+this.createdAt+'"'); } catch(e) {}
  }
}
