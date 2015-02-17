var Request = require("../utils/request");

module.exports = class PostStore {
  constructor() {
    this.posts = [];
    this.all();
  }

  all() {
    var request = new Request("./index.json");
    request.getJSON(function(data) {
      console.log("data: ", data);
    });
  }
}
