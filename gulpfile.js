var gulp       = require("gulp");
var browserify = require("browserify");
var babelify   = require("babelify");
var sourcemaps = require("gulp-sourcemaps");
var source     = require("vinyl-source-stream");
var connect    = require("gulp-connect");
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');

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

gulp.task("watch", function() {
  gulp.watch("./app/*.js"       , ["scripts"]);
  gulp.watch("./app/*.jsx"      , ["scripts"]);
  gulp.watch("./application.js" , ["livereload"]);
  gulp.watch("./application.css", ["livereload"]);
  gulp.watch("./*.html"         , ["livereload"]);
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
    fallback:   "404.html"
  });
});

gulp.task("build", ["scripts"]);
gulp.task("default", ["build", "connect", "watch"]);
