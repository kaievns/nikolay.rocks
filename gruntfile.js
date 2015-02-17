module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      app: {
        options: {
          transform: [ function(filename, options) {
            options = options || {};
            options.harmony = true;
            return require('grunt-react').browserify(filename, options);
          } ],
          browserifyOptions: {
            extensions: ['.js', '.jsx']
          }
        },
        files: {
          'app/build.js': ['app/app.jsx']
        }
      }
    },
    uglify: {
      js: {
        src: ['app/build.js'],
        dest: 'app/build.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ["./app", "./bower_components/pain.less.css/src"]
        },
        files: {
          "./application.css": "./app/style.less"
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ["last 2 versions"]
      },
      development: {
        src: "./application.css"
      }
    },
    cssmin: {
      dist: {
        files: {
          './application.css' : ['./application.css']
        }
      }
    },
    watch: {
      options: {
        // livereload: true,
        spawn: false
      },
      react: {
        files: ["./app/**/*.jsx"],
        tasks: ["browserify", "uglify"]
      },
      less: {
        files: ["./app/*.less"],
        tasks: ["less:development", "autoprefixer:development", "cssmin"],
      },
      markdown: {
        files: ["./**/*.md"],
        tasks: ["reindex"]
      },
      html: {
        files: ["./*.html"]
      }
    },
    connect: {
      server: {
        options: {
          base: "./",
          livereload: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['browserify', 'uglify', "less:development", "autoprefixer:development", "cssmin", "reindex"]);

  grunt.registerTask('default', ['build', 'connect', 'watch']);


  grunt.registerTask('reindex', 'Rebuilds the pages index', function() {
    var done  = this.async();
    var fs    = require("fs");
    var glob  = require("glob");
    var index = require("./app/utils/indexer");

    glob("pages/**/*.md", null, function(err, files) {
      err && console.log(err);

      var pages = files.map(function(file) {
        return index(file);
      });

      fs.writeFile("./index.json", JSON.stringify(pages), function(err) {
        err && console.log(err);
        done();
      });
    });
  });
};
