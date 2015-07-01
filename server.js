/**
 * A basic server (not development)
 */
var http        = require("http");
var connect     = require("connect");
var compression = require('compression');
var favicon     = require('serve-favicon');
var statics     = require('serve-static');
var production  = process.env.PORT != null;
var one_year    = 60 * 60 * 24 * 365;
var app         = connect();

app.use(production_caching());
app.use(assets_compression());
app.use(serve_cached_data());
app.use(favicon(__dirname + "/app/assets/favicon.ico"));
app.use(statics('./'));

http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log("Listening localhost:"+ (process.env.PORT || 8080))
});

/////////////////////////////////////////////////////////
// private, middleware and stuff

// handles the caching settings
function production_caching() {
  var re = /(application-[a-z0-9]+\.(js|css))|(\.(jpg|jpeg|png|gif|ico))/;

  return function(req, res, next) {
    if (production && re.test(req.url)) {
      res.setHeader('Cache-Control', 'public, max-age='+one_year);
    }

    next();
  };
}

// compresses the assets
function assets_compression() {
  return compression({
    level:  9,
    filter: function(req, res) {
      return /\.(css|js|xml|json)$/.test(req.url);
    }
  });
}

// serves cached html/atom/css/js files
function serve_cached_data() {
  var cache = read_cacheable_data();

  return function(req, res, next) {
    !production && (cache = read_cacheable_data());

    if (/\/atom\.xml/.test(req.url)) {
      res.setHeader("Content-type", "application/atom+xml");
      res.write(cache['data']); res.end();
    } else if (/\/application-.+?\.js/.test(req.url)) {
      res.setHeader("Content-type", "text/javascript");
      res.write(cache['scripts']); res.end();
    } else if (/\/application-.+?\.css/.test(req.url)) {
      res.setHeader("Content-type", "text/css");
      res.write(cache['styles']); res.end();
    } else if (!/.+?\.[a-z]+$/.test(req.url)) {
      res.setHeader("Content-type", "text/html");
      res.write(cache['html']); res.end();
    } else {
      next();
    }
  }
}

// reads cached data
function read_cacheable_data() {
  var fs           = require("fs");
  var data         = fs.readFileSync("./atom.xml");
  var html         = fs.readFileSync("./index.html");
  var scripts      = fs.readFileSync("./application.js");
  var styles       = fs.readFileSync("./application.css");
  var scripts_path = '/application-'+ get_sha(scripts) +'.js';
  var styles_path  = '/application-'+ get_sha(styles) +'.css';

  return {
    data:    data.toString(),
    html:    html.toString().replace('/application.js', scripts_path).replace('/application.css', styles_path),
    styles:  styles.toString().replace("\n/*# sourceMappingURL=application.css.map */", ""),
    scripts: scripts.toString().replace("\n//# sourceMappingURL=application.js.map", "")
  };
}

// builds an url-safe sha of a stream data
function get_sha(stream) {
  var crypto = require("crypto");
  var sha    = crypto.createHash("sha1").update(stream);
  return sha.digest("base64").replace(/[^a-z0-9]+/g, "").substr(0,6);
}
