module.exports = function(grunt) {
  grunt.initConfig({
    react: {
      development: {
        files: {
          'index.js' : ['app/*.jsx']
        }
      }
    },
    uglify: {
      js: {
        src: ['./index.js'],
        dest: './index.js'
      }
    },
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      react: {
        files: ["./**/*.jsx"],
        tasks: ["react", "uglify"]
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

  grunt.registerTask('default', ['react', 'uglify', 'connect', 'watch']);
};
