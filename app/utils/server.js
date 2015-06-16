var connect     = require("gulp-connect");
var compression = require('compression');
var one_year    = 60 * 60 * 24 * 365;

exports.start = function(options) {
  options.middleware = function() {
    var pipes = [
      compress_assets(/\.(css|js|xml|json)$/),
      kill_favicon,
      custom_fallback
    ];

    options.livereload && pipes.unshift(require('connect-livereload')());

    return pipes;
  };

  connect.server(options);
};

function compress_assets(regexp) {
  return compression({
    level:  9,
    filter: function(req, res) {
      return regexp.test(req.url);
    }
  });
}

function kill_favicon(req, res, next) {
  if (req.url === '/favicon.ico') {
    res.setHeader('Cache-Control', 'public, max-age='+one_year);
    res.writeHead(404, {'Content-Type': 'image/x-icon'} );
    res.end();
  } else {
    next();
  }
}

function custom_fallback(req, res, next) {
  if (!/.+?\.[a-z]+$/.test(req.url)) {
    res.setHeader("Content-type", "text/html");
    require('fs').createReadStream("index.html").pipe(res);
  } else {
    next();
  }
}
