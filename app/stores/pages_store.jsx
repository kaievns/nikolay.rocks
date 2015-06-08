import {EventEmitter} from "events";
import Request from "../utils/request";
import Page from "./page";

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
        return new Page(this.extractData(url));
      }.bind(this));
      this.emit("change");
    }.bind(this));
  }

  extractData(url) {
    var data = {
      path:      (url.querySelector("loc")      || {}).textContent,
      createdAt: (url.querySelector("lastmod")  || {}).textContent,
      file:      (url.querySelector("fileloc")  || {}).textContent,
      category:  (url.querySelector("category") || {}).textContent,
      tags:      (url.querySelector("tags")     || {}).textContent
    };

    try { data.tags = data.tags.split(","); } catch(e) {}
    try { data.createdAt = JSON.parse('"'+data.createdAt+'"'); } catch(e) {}

    return data;
  }
}
