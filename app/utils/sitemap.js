/**
 * A gulp task that takes the indexed data
 * and converts it into a sitemap .xml string
 */

var path    = require('path');
var gutil   = require('gulp-util');
var through = require('through2');
var Index   = require('./indexer');

module.exports = function(hostname, options) {
  var sitemap = new Sitemap(hostname);

  return through.obj(map, end);

  function map(file, env, cb) {
    sitemap.push(new Index(file.path, file.contents.toString()));

    cb();
  }

  function end(cb) {
    this.push(sitemap.toFile());
    cb();
  }
};

function Sitemap(hostname) {
  this.hostname = hostname;
  this.pages    = [];
}

Sitemap.prototype.push = function(index) {
  this.pages.push(index);
};

Sitemap.prototype.toFile = function() {
  return new gutil.File({
    base:     __dirname,
    path:     path.join(__dirname, './sitemap.xml'),
    contents: new Buffer(this.toString(), "utf-8")
  });
};

Sitemap.prototype.toString = function() {
  var content  = '<?xml version="1.0" encoding="UTF-8"?>'+"\n";
  content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

  content += this.urlBlocks().join("");

  return content + "\n</urlset>";
};

Sitemap.prototype.urlBlocks = function() {
  return this.pagesInOrder().map(function(index) {
    var url = this.hostname, content = "";

    index.slug != "index" && (url += "/"+ index.slug);

    content += "\n  <url>";
    content += "\n    <loc>"+ url +"</loc>";
    content += "\n    <lastmod>"+ JSON.stringify(index.date).replace(/"/g, "") +"</lastmod>";
    content += "\n    <fileloc>"+ index.path +"</fileloc>";
    if (index.tags.length > 0) {
      content += "\n    <tags>"+ index.tags.join(",") +"</tags>";
    }
    content += "\n    <title>"+ index.title +"</title>";
    content += "\n    <extract><![CDATA["+ index.extract +"]]></extract>";
    content += "\n  </url>";

    return content;
  }.bind(this));
};

Sitemap.prototype.pagesInOrder = function() {
  return this.pages.sort(function(a, b) {
    return a.date > b.date ? -1 : 1;
  });
};
