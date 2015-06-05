var gulp       = require("gulp");
var browserify = require("browserify");
var babelify   = require("babelify");
var source     = require("vinyl-source-stream");
var connect    = require("gulp-connect");

gulp.task("scripts", function() {
  browserify({entries: ["./app/app.jsx"], extensions: [".js", ".jsx"]})
    .transform(babelify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('app/'));
});

gulp.task("livereload", function() {
  gulp.src("./index.html")
    .pipe(connect.reload());
});

gulp.task("watch", function() {
  gulp.watch("./app/*.js",  ["scripts"]);
  gulp.watch("./app/*.jsx", ["scripts"]);
  gulp.watch("./*.html",    ["livereload"]);
});

gulp.task("connect", function() {
  connect.server({
    root:       "./public",
    port:       process.env.PORT || 8080,
    livereload: process.env.NODE_ENV != "production",
    fallback:   "404.html"
  });
});

gulp.task("build", ["scripts"]);
gulp.task("default", ["build", "connect", "watch"]);
