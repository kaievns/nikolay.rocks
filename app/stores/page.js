export default class Page {
  constructor(params) {
    for (var key in params) {
      this[key] = params[key];
    }
  }
}
