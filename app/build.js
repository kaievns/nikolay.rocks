(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Layout = _interopRequire(require("./components/layout"));

var PostStore = _interopRequire(require("./stores/post_store"));

var App = (function (_React$Component) {
  function App() {
    _classCallCheck(this, App);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(App, _React$Component);

  _createClass(App, {
    getInitialState: {
      value: function getInitialState() {
        return {
          title: "Hello",
          author: "Nikolay Nemshilov",
          body: "blah blah blah",
          sidebar: "blah"
        };
      }
    },
    render: {
      value: function render() {
        return React.createElement(Layout, {
          title: this.state.title,
          body: this.state.body,
          author: this.state.author,
          sidebar: this.state.sidebar
        });
      }
    }
  });

  return App;
})(React.Component);

React.render("<App></App>", document.documentElement);

},{"./components/layout":2,"./stores/post_store":3}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Layout = (function (_React$Component) {
  function Layout() {
    _classCallCheck(this, Layout);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Layout, _React$Component);

  _createClass(Layout, {
    render: {
      value: function render() {
        return React.createElement(
          "html",
          null,
          React.createElement(
            "head",
            null,
            React.createElement(
              "title",
              null,
              "Hello"
            ),
            React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
            React.createElement("link", { rel: "stylesheet", type: "text/css", href: "./application.css" })
          ),
          React.createElement(
            "body",
            null,
            React.createElement(
              "header",
              null,
              React.createElement(
                "div",
                { className: "paddings" },
                React.createElement(
                  "a",
                  { href: "./", className: "logo" },
                  "Nikolay.TheOsom"
                )
              )
            ),
            React.createElement(
              "main",
              null,
              React.createElement(
                "div",
                { className: "paddings" },
                React.createElement(
                  "article",
                  null,
                  this.props.body
                ),
                React.createElement(
                  "aside",
                  null,
                  this.props.sidebar
                )
              )
            ),
            React.createElement(
              "footer",
              null,
              React.createElement(
                "div",
                { className: "paddings" },
                React.createElement(
                  "p",
                  null,
                  "Copyright (C) 2012-",
                  new Date().getFullYear(),
                  " Nikolay Nemshilov"
                )
              )
            )
          )
        );
      }
    }
  });

  return Layout;
})(React.Component);

module.exports = Layout;

},{}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Request = _interopRequire(require("../utils/request"));

var PostStore = (function () {
  function PostStore() {
    _classCallCheck(this, PostStore);

    this.posts = [];
    this.all();
  }

  _createClass(PostStore, {
    all: {
      value: function all() {
        var request = new Request("./index.json");
        request.getJSON(function (data) {
          console.log("data: ", data);
        });
      }
    }
  });

  return PostStore;
})();

module.exports = PostStore;

},{"../utils/request":4}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * A dumb simple XHR.get thing
 */

var Request = (function () {
  function Request(url) {
    _classCallCheck(this, Request);

    this.url = url;
  }

  _createClass(Request, {
    get: {
      value: function get(callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.url, true);

        xhr.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
          }
        };

        xhr.send();
      }
    },
    getJSON: {
      value: function getJSON(callback) {
        this.get(function (data) {
          callback(JSON.parse(data));
        });
      }
    }
  });

  return Request;
})();

module.exports = Request;

},{}]},{},[1]);
