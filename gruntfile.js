module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      options: {
        harmony: true
      },
      development: {
        files: {
          'app/build.js' : ['app/*.jsx']
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
        livereload: true,
        spawn: false
      },
      react: {
        files: ["./app/*.jsx"],
        tasks: ["react:development", "uglify"]
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
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['react', 'uglify', "less:development", "autoprefixer:development", "cssmin", "reindex"]);
  grunt.registerTask('default', ['build', 'connect', 'watch']);


  grunt.registerTask('reindex', 'Rebuilds the pages index', function() {
    var done = this.async();
    var glob = require("glob");
    var fs   = require("fs");

    glob("pages/**/*.md", null, function(err, files) {
      err && console.log(err);

      var pages = files.map(function(filename) {
        var data = fs.readFileSync(filename).toString();
        var name = filename.replace(/\.md$/, "").split('/').pop().split("-");
        var date = new Date(name.shift(), name.shift()-1, name.shift());

        console.log("Found: ", filename, date, name.join("-"));
      });

      done();
    });
  });
};
