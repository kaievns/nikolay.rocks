import {EventEmitter} from "events";
import Request from "../utils/request";
import Markdown from "../utils/markdown";

export default class Page extends EventEmitter {
  constructor(params) {
    super();

    for (var key in params) {
      this[key] = params[key];
    }

    this.extract = this.format(this.extract);
  }

  load() {
    new Request(this.file).get(function(data) {
      this.body = this.format(data);
      this.emit("load");
    }.bind(this));
  }

  format(text) {
    return Markdown.format(text);
  }
}
