marked.setOptions({
  renderer:    new marked.Renderer(),
  gfm:         true,
  tables:      true,
  breaks:      false,
  pedantic:    false,
  sanitize:    true,
  smartLists:  true,
  smartypants: false
});

export default {
  format(data) {
    return marked(data);
  }
}
