var document_text = document.body.innerText;

document.write(
  '<!doctype html>' +
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.min.js"></script>' +
  '<script src="./app/build.js" type="text/javascript"></script>'
);

if (location.hostname == 'localhost') {
  console.log("livereload")
  document.write('<script src="//localhost:35729/livereload.js?snipver=1"></script>');
}
