/**
 * Extracts the list of tags out of text
 */

var tag_re = /((&*)(\#)([^\s\{\}\[\]\(\)<>!@\#\$%\^&\*;:\?\/\|\\\.,"']+)(;*))/g;

exports.replace = function(text, callback) {
  return text.replace(tag_re, function(match) {
    var tag  = match.toString();
    var name = exports.name(tag);

    return callback(tag, name);
  });
};

exports.extract = function(text) {
  return text.match(tag_re) || [];
};

exports.name = function(tag) {
  return tag
    .replace(/-|_|\s+/g, ' ')
    .replace(/^#/, '')
    .toLowerCase();
}
