/**
 * Builds an index of all an article
 *
 */

var slug   = require("slug");
var tagger = require("./tagger");

module.exports = function(filename, data) {
  var file = filename.replace(process.cwd(), "");
  var name = file.replace(/\.(md|html)$/, "").split('/').pop();

  return {
    path:     file,
    slug:     build_slug(name),
    date:     figure_date(name),
    title:    get_title(data),
    category: get_category(file),
    tags:     find_tags(data),
    extract:  get_extract(data, 100)
  };
};

function build_slug(filename) {
  return slug(filename);
}

function get_title(text) {
  var m = text.match(/^\s*#\s*(.+?)\n/m);
  return m && m[1];
}

function get_category(filename) {
  var m = filename.match(/^\/?pages\/([^\/]+?)\//);
  return m && m[1];
}

function figure_date(filename) {
  var m = filename.match(/^(\d{4})-(\d{2})-(\d{2})-/);
  return m && new Date(m[1], m[2]-1, m[3])
}

function get_extract(text, size) {
  var body   = text.replace(/\r\n/g, "\n").replace(/\n\s+\n/g, "\n").replace(/\n+/g, "\n").trim();
  var blocks = body.split("\n").slice(1); // without the header
  var head   = "";

  while (head.length < size && blocks.length > 0) {
    if (blocks[0].match(/^#+\s*.+?/)) { // subheader
      break;
    }

    head += blocks.shift() + "\n";
  }

  return head.trim();
}

function find_tags(data) {
  return tagger.extract(data).map(function(tag) {
    return tagger.name(tag);
  });
}
