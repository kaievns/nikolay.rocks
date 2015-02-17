/**
 * A dumb simple XHR.get thing
 */
module.exports = class Request {
  constructor(url) {
    this.url = url;
  }

  get(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, true);

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callback(this.responseText);
      }
    };

    xhr.send();
  }

  getJSON(callback) {
    this.get(function(data) {
      callback(JSON.parse(data));
    });
  }
}
