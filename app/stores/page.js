import {EventEmitter} from "events";
import Request from "../utils/request";

export default class Page extends EventEmitter {
  constructor(params) {
    super();

    for (var key in params) {
      this[key] = params[key];
    }
  }

  load() {
    new Request(this.file).get(function(data) {
      this.body = data;
      this.emit("load");
    }.bind(this));
  }
}
