var gulp = require("gulp");

gulp.task("scripts", function() {
  var buffer     = require('vinyl-buffer');
  var browserify = require("browserify");
  var babelify   = require("babelify");
  var source     = require("vinyl-source-stream");
  var uglify     = require('gulp-uglify');
  var sourcemaps = require("gulp-sourcemaps");

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
  var less         = require("gulp-less");
  var autoprefixer = require("gulp-autoprefixer");
  var minifyCss    = require('gulp-minify-css');
  var sourcemaps   = require("gulp-sourcemaps");

  gulp.src("app/application.less")
    .pipe(sourcemaps.init())
    .pipe(less({paths: ["./app", "./bower_components/pain.less.css/src"]}))
    .pipe(autoprefixer({browsers: ['last 1 version']}))
    .pipe(minifyCss())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./"));
});

gulp.task("atomfeed", function() {
  var atomfeed = require('unicorn-farts/utils/atomfeed');
  var settings = require('./app/stores/settings');

  gulp.src(['./pages/**/*.md'])
    .pipe(atomfeed(settings))
    .pipe(gulp.dest("./"));
});


gulp.task("watch", function() {
  gulp.watch("./app/**/*.js"         , ["scripts"]);
  gulp.watch("./app/**/*.jsx"        , ["scripts"]);
  gulp.watch("./app/application.less", ["stylesheets"]);
  gulp.watch("./pages/**/*.md"       , ["atomfeed"]);
  gulp.watch("./application.js"      , ["livereload"]);
  gulp.watch("./application.css"     , ["livereload"]);
  gulp.watch("./atom.xml"            , ["livereload"]);
  gulp.watch("./*.html"              , ["livereload"]);
});

gulp.task("livereload", function() {
  var connect = require("gulp-connect");

  gulp.src("./index.html")
    .pipe(connect.reload());
});

gulp.task("connect", function() {
  var server = require('./app/utils/server');
  server.start({
    root:       "./",
    port:       process.env.PORT || 8080,
    livereload: process.env.NODE_ENV != "production"
  });
});

gulp.task("build", ["scripts", "stylesheets", "atomfeed"]);
gulp.task("default", ["build", "connect", "watch"]);
