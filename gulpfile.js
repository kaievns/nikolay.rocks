var gulp         = require("gulp");
var browserify   = require("browserify");
var babelify     = require("babelify");
var sourcemaps   = require("gulp-sourcemaps");
var source       = require("vinyl-source-stream");
var connect      = require("gulp-connect");
var uglify       = require('gulp-uglify');
var replace      = require('gulp-replace');
var buffer       = require('vinyl-buffer');
var less         = require("gulp-less");
var autoprefixer = require("gulp-autoprefixer");
var minifyCss    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var atomfeed     = require('./app/utils/atomfeed');
var settings     = require('./app/stores/settings');
var server       = require('./app/utils/server');

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

gulp.task("atomfeed", function() {
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
  gulp.src("./index.html")
    .pipe(connect.reload());
});

gulp.task("connect", function() {
  server.start({
    root:       "./",
    port:       process.env.PORT || 8080,
    livereload: process.env.NODE_ENV != "production"
  });
});

gulp.task("shaify", function() {
  var slug = Math.random().toString(36).substring(3, 8);

  gulp.src("application.js")
    .pipe(replace("\n//# sourceMappingURL=application.js.map", ""))
    .pipe(rename("application-"+ slug +".js"))
    .pipe(gulp.dest("./"));

  gulp.src("application.css")
    .pipe(replace("\n/*# sourceMappingURL=application.css.map */", ""))
    .pipe(rename("application-"+ slug +".css"))
    .pipe(gulp.dest("./"));

  gulp.src("index.html")
    .pipe(replace("/application.js", "/application-"+slug+".js"))
    .pipe(replace("/application.css", "/application-"+slug+".css"))
    .pipe(gulp.dest("./"));
});

gulp.task("build", ["scripts", "stylesheets", "atomfeed"]);
gulp.task("default", ["build", "connect", "watch"]);
