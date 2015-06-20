import PageStore from "./pages";

export default {
  all() {
    var category_counts     = {};
    var weighted_categories = [];

    PageStore.pages.forEach(function(page) {
      if (!page.category) { return; }

      var category = page.category;
      category_counts[category] = category_counts[category] || 0;
      category_counts[category] ++;
    });

    for (var category in category_counts) {
      weighted_categories.push({n: category, c: category_counts[category]});
    }

    weighted_categories.sort(function(a, b) {
      return a.c > b.c ? -1 : a.c === b.c ? 0 : 1;
    });

    return weighted_categories.map(function(entry) {
      return entry.n;
    });
  }
}
