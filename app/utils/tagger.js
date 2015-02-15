/**
 * Extracts the list of tags out of text
 */

var tag_re = /((&*)(\#)([^\s\{\}\[\]\(\)<>!@\#\$%\^&\*;:\?\/\|\\\.,"']+)(;*))/g;

exports.extract = function(text) {
  return text.match(tag_re);
};

exports.name = function(tag) {
  return tag
    .replace(/-|_|\s+/g, ' ')
    .replace(/^#/, '')
    .toLowerCase();
}
