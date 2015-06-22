import {EventEmitter} from "events";
import Request from "../utils/request";
import Page from "./page";

var pages = [];

export default class PageStore extends EventEmitter {

  static get pages() {
    return pages;
  }

  static inst() {
    return this._inst = this._inst || new PageStore();
  }

  static on(event, callback) {
    this.inst().on(event, callback);
  }

  static find(path) {
    return this.pages.filter(function(page) {
      return page.path == path;
    })[0];
  }

  static current() {
    return this.find(document.location.pathname);
  }

  constructor() {
    super();
    this.load();
  }

  load() {
    new Request("/atom.xml").get(function(data, xhr) {
      var urls = xhr.responseXML.querySelectorAll("entry");
      [].forEach.call(urls, function(url) {
        pages.push(new Page(this.extractData(url)));
      }.bind(this));
      this.emit("load");
    }.bind(this));
  }

  extractData(url) {
    var data = {
      path:      (url.querySelector("link")      || {}),
      createdAt: (url.querySelector("published") || {}).textContent,
      file:      (url.querySelector("file")      || {}).textContent,
      tags:      (url.querySelector("tags")      || {}).textContent,
      title:     (url.querySelector("title")     || {}).textContent,
      extract:   (url.querySelector("summary")   || {}).textContent
    };

    try { data.path = data.path.getAttribute("href"); } catch(e) {}
    try { data.path = data.path.split("nikolay.rocks").pop(); } catch(e) {}
    try { data.tags = data.tags.split(","); } catch(e) { data.tags = []; }
    try { data.createdAt = new Date(data.createdAt); } catch(e) {}
    try { data.category = data.file.match(/\/pages\/(.+?)\//)[1]; } catch(e) {}

    return data;
  }
}
