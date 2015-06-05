var gulp       = require("gulp");
var browserify = require("browserify");
var babelify   = require("babelify");
var source     = require("vinyl-source-stream");

gulp.task("scripts", function() {
  browserify({entries: ["./app/app.jsx"], extensions: [".js", ".jsx"]})
    .transform(babelify)
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('app/'));
});
