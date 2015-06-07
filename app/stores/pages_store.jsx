import Request from "../utils/request";

export default class PagesStore {
  constructor() {
    this.posts = [];
    this.all();
  }

  all() {
    var request = new Request("/sitemap.xml");
    request.get(function(data, xhr) {
      var urls = xhr.responseXML.querySelectorAll("url");
      this.posts = [].slice.call(urls).map(function(url) {
        return new Post(url);
      });
    }.bind(this));
  }
}


class Post {
  constructor(url) {

  }
}
