import Request from "../utils/request";

export default class PostStore {
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
