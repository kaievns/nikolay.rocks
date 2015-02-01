module.exports = function(grunt) {
  grunt.initConfig({
    react: {
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
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      react: {
        files: ["./app/*.jsx"],
        tasks: ["react:development", "uglify"]
      },
      // markdown: {
      //   files: ["./**/*.md"]
      // },
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

  grunt.registerTask('build', ['react', 'uglify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
