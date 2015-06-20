import PageStore from "./pages";

export default {
  all() {
    var tag_counts    = {};
    var weighted_tags = [];

    PageStore.pages.forEach(function(page) {
      page.tags.forEach(function(tag) {
        tag_counts[tag] = tag_counts[tag] || 0;
        tag_counts[tag] += 1;
      });
    });

    for (var tag in tag_counts) {
      weighted_tags.push({t: tag, c: tag_counts[tag]});
    }

    weighted_tags.sort(function(a, b) {
      return a.c > b.c ? -1 : a.c === b.c ? 0 : 1;
    });

    return weighted_tags.map(function(entry) {
      return entry.t;
    });
  }
}
