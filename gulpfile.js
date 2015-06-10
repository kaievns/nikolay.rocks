var gulp         = require("gulp");
var browserify   = require("browserify");
var babelify     = require("babelify");
var sourcemaps   = require("gulp-sourcemaps");
var source       = require("vinyl-source-stream");
var connect      = require("gulp-connect");
var uglify       = require('gulp-uglify');
var buffer       = require('vinyl-buffer');
var less         = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var minifyCss    = require('gulp-minify-css');
var sitemap      = require('./app/utils/sitemap');

gulp.task("scripts", function() {
  browserify({
      entries: ["./app/application.jsx"],
      extensions: [".js", ".jsx"],
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({initMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./'));
});

gulp.task("stylesheets", function() {
  gulp.src("app/application.less")
    .pipe(sourcemaps.init())
    .pipe(less({paths: ["./app", "./bower_components/pain.less.css/src"]}))
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(minifyCss())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./"));
});

gulp.task("sitemap", function() {
  gulp.src(['./pages/**/*.md'])
    .pipe(sitemap("http://nikolay.rocks"))
    .pipe(gulp.dest("./"));
});

gulp.task("watch", function() {
  gulp.watch("./app/**/*.js"         , ["scripts"]);
  gulp.watch("./app/**/*.jsx"        , ["scripts"]);
  gulp.watch("./app/application.less", ["stylesheets"]);
  gulp.watch("./pages/**/*.md"       , ["sitemap"]);
  gulp.watch("./application.js"      , ["livereload"]);
  gulp.watch("./application.css"     , ["livereload"]);
  gulp.watch("./sitemap.xml"         , ["livereload"]);
  gulp.watch("./*.html"              , ["livereload"]);
});

gulp.task("livereload", function() {
  gulp.src("./index.html")
    .pipe(connect.reload());
});

gulp.task("connect", function() {
  connect.server({
    root:       "./",
    port:       process.env.PORT || 8080,
    livereload: process.env.NODE_ENV != "production",
    middleware: function() {
      return [
        function(req, res, next) {
          if (!/.+?\.[a-z]+$/.test(req.url)) {
            res.setHeader("Content-type", "text/html");
            require('fs').createReadStream("index.html").pipe(res);
          } else if (req.url === '/favicon.ico') {
            res.writeHead(404, {'Content-Type': 'image/x-icon'} );
            res.end();
          } else {
            next();
          }
        }
      ]
    }
  });
});

gulp.task("build", ["scripts", "stylesheets", "sitemap"]);
gulp.task("default", ["build", "connect", "watch"]);
