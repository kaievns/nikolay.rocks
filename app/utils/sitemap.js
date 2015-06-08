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
  this.content  = '<?xml version="1.0" encoding="UTF-8"?>'+"\n";
  this.content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
}

Sitemap.prototype.push = function(index) {
  var url = this.hostname;

  index.slug != "index" && (url += "/"+ index.slug);

  this.content += "\n  <url>";
  this.content += "\n    <loc>"+ url +"</loc>";
  this.content += "\n    <lastmod>"+ JSON.stringify(index.date).replace(/"/g, "") +"</lastmod>";
  this.content += "\n    <fileloc>"+ index.path +"</fileloc>";
  this.content += "\n    <category>"+ index.category +"</category>";
  this.content += "\n    <tags>"+ index.tags.join(",") +"</tags>";
  this.content += "\n    <title>"+ index.title +"</title>";
  this.content += "\n    <extract>"+ index.extract +"</extract>";
  this.content += "\n  </url>";
};

Sitemap.prototype.toString = function() {
  return this.content + "\n</urlset>";
};

Sitemap.prototype.toFile = function() {
  return new gutil.File({
    base:     __dirname,
    path:     path.join(__dirname, './sitemap.xml'),
    contents: new Buffer(this.toString(), "utf-8")
  });
};
