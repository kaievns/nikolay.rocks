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
  var atomfeed = require('./app/utils/atomfeed');
  var settings = require('./app/stores/settings');

  gulp.src(['./pages/**/*.md'])
    .pipe(atomfeed(settings))
    .pipe(gulp.dest("./"));
});


gulp.task("watch", function() {
  window.setTimeout(function() {
    gulp.watch("./app/**/*.js"         , ["scripts"]);
    gulp.watch("./app/**/*.jsx"        , ["scripts"]);
    gulp.watch("./app/application.less", ["stylesheets"]);
    gulp.watch("./pages/**/*.md"       , ["atomfeed"]);
    gulp.watch("./application.js"      , ["livereload"]);
    gulp.watch("./application.css"     , ["livereload"]);
    gulp.watch("./atom.xml"            , ["livereload"]);
    gulp.watch("./*.html"              , ["livereload"]);
  }, 1000); // waiting for the initial compile
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

gulp.task("shaify", function() {
  var fs          = require("fs");
  var crypto      = require("crypto");
  var scripts     = fs.readFileSync("./application.js");
  var styles      = fs.readFileSync("./application.css");
  var scripts_sha = crypto.createHash("sha1").update(scripts);
  var styles_sha  = crypto.createHash("sha1").update(styles);
  var scripts_id  = scripts_sha.digest("base64").replace(/[^a-z0-9]+/g, "").substr(0,6);
  var styles_id   = styles_sha.digest("base64").replace(/[^a-z0-9]+/g, "").substr(0,6);
  var new_scripts = "application-"+scripts_id+".js";
  var new_styles  = "application-"+styles_id+".css";


  fs.writeFile(new_scripts, scripts.toString().replace("\n//# sourceMappingURL=application.js.map", ""));
  fs.writeFile(new_styles, styles.toString().replace("\n/*# sourceMappingURL=application.css.map */", ""));

  fs.readFile("./index.html", function(err, data) {
    data = data.toString();
    data = data.replace("/application.js", "/"+ new_scripts);
    data = data.replace("/application.css", "/"+ new_styles);

    fs.writeFile("./index.html", data);
  });
});

gulp.task("build", ["scripts", "stylesheets", "atomfeed"]);
gulp.task("default", ["build", "connect", "watch"]);
