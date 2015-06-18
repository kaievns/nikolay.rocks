var connect     = require("gulp-connect");
var compression = require('compression');
var one_year    = 60 * 60 * 24 * 365;

exports.start = function(options) {
  options.middleware = function() {
    var pipes = [
      compress_assets(/\.(css|js|xml|json)$/),
      custom_fallback(!options.livereload),
      kill_favicon
    ];

    if (options.livereload) {
      pipes.unshift(require('connect-livereload')());
    } else {
      // means we are in producion
      pipes.unshift(production_caching);
    }

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

function custom_fallback(production) {
  var data = production ? require("fs").readFileSync("index.html") : null;

  return function(req, res, next) {
    if (!/.+?\.[a-z]+$/.test(req.url)) {
      res.setHeader("Content-type", "text/html");

      if (production) {
        res.write(data);
        res.end();
      } else {
        data = require('fs').readFileSync("./index.html").toString();
        res.write(data.replace('</html>', '<script src="//localhost:35729/livereload.js?snipver=1"><\/script>\n</html>'));
        res.end();
      }
    } else {
      next();
    }
  }
}

function production_caching(req, res, next) {
  var re = /(application-[a-z0-9]+\.(js|css))|(\.(jpg|jpeg|png|gif))/;
  if (re.test(req.url)) {
    res.setHeader('Cache-Control', 'public, max-age='+one_year);
  }

  next();
}
