/**
 * A gulp task that takes the indexed data
 * and converts it into a sitemap .xml string
 */

var path     = require('path');
var gutil    = require('gulp-util');
var through  = require('through2');
var Index    = require('./indexer');

module.exports = function(settings, options) {
  var atomfeed = new Atomfeed(settings);

  return through.obj(map, end);

  function map(file, env, cb) {
    atomfeed.push(new Index(file.path, file.contents.toString()));

    cb();
  }

  function end(cb) {
    this.push(atomfeed.toFile());
    cb();
  }
};

function Atomfeed(settings) {
  this.settings = settings;
  this.pages    = [];
}

Atomfeed.prototype.push = function(index) {
  this.pages.push(index);
};

Atomfeed.prototype.toFile = function() {
  return new gutil.File({
    base:     __dirname,
    path:     path.join(__dirname, './atom.xml'),
    contents: new Buffer(this.toString(), "utf-8")
  });
};

Atomfeed.prototype.toString = function() {
  var settings = this.settings;
  var hostname = "http://"+ settings.domain;
  var lastpost = this.pagesInOrder()[0] || {};
  var lastdate = JSON.stringify(lastpost.date).replace(/"/g, "");

  return (
    '<?xml version="1.0" encoding="utf-8"?>'     + "\n"+
    '<feed xmlns="http://www.w3.org/2005/Atom">' + "\n"+
    '  <title>'+ settings.title +'</title>'      + "\n"+
    '  <link href="'+ hostname +'" />'           + "\n"+
    '  <id>tag:'+ settings.domain +'</id>'       + "\n"+
    '  <author><name>'+ settings.author +'</name></author>' +"\n"+
    '  <updated>'+ lastdate +'</updated>'        + "\n"+

      this.urlBlocks().join("")                  + "\n"+

    '</feed>'
  );
};

Atomfeed.prototype.urlBlocks = function() {
  return this.pagesInOrder().map(function(index) {
    var url = "http://"+ this.settings.domain, content = "";

    index.slug != "index" && (url += "/"+ index.slug);

    return (
      "\n  <entry>" +
      "\n    <title>"+ index.title +"</title>" +
      "\n    <link href=\""+ url +"\" />" +
      "\n    <published>"+ JSON.stringify(index.date).replace(/"/g, "") +"</published>"+
      "\n    <summary type=\"markdown\"><![CDATA["+ index.extract +"]]></summary>"+
      (index.tags.length > 0 ? "\n    <tags>"+ index.tags.join(",") +"</tags>" : "")+
      "\n    <file>"+ index.path +"</file>"+
      "\n  </entry>"
    );
  }.bind(this));
};

Atomfeed.prototype.pagesInOrder = function() {
  return this.pages.sort(function(a, b) {
    return a.date > b.date ? -1 : 1;
  });
};
