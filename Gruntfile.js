module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },

      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'css/tmp-unprefixed.css': 'scss/app.scss'
        }        
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'css/tmp.css': 'css/tmp-unprefixed.css'
        }
      }
    },

    devUpdate: {
      main: {
        options: {
          updateType: 'prompt', 
          reportUpdate: false, 
          semver: true
        }
      }
    },

    connect: {
      devServer: {
        options: {
          port: 8000,
          livereload: 35729,
          hostname: 'localhost',
          base: '.'
        }
      },

      testServer: {
        options: {
          port: 8000,
          base: 'build/',
          hostname: 'localhost'
        }
      },

      livereload: {
        options: {
          livereload: true,
          base: '.'
        }
      },
    },

    watch: {
      grunt: { 
        files: ['Gruntfile.js']
      },

      src: {
        files: ['*.html', 'scss/**/*.scss', 'js/**/*.js'],
        options: { livereload: true }
      },

      styles: {
        files: 'scss/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
    },

    concat: {
      css: {
        src: ['css/**/*.css'],
        dest: 'css/app.css'
      },

      js: {
        src : ['js/**/*.js'],
        dest : 'js/app.js',
      }
    },

    cssmin : {
      css: {
        src: 'css/app.css',
        dest: 'build/css/app.css'
      }
    },

    uglify : {
      js: {
        files: {
          'build/js/app.js' : [ 'js/app.js' ]
        }
      }
    },

    clean: {
      build: ['build/**/*']
    },

    copy: {
      main: {
        files: [{expand: true, src: ['*.html'], dest: 'build/', filter: 'isFile'},]
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },

        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.png'],
          dest: 'build/img/',
          ext: '.png'
        }]
      },

      jpg: {
        options: {
          progressive: true
        },

        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.jpg'],
          dest: 'build/img/',
          ext: '.jpg'
        }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },

      src: ['**/*']
    }

  });

grunt.registerTask('default', ['devUpdate','sass', 'autoprefixer', 'concat', 'connect:devServer', 'watch']);
grunt.registerTask('test', ['clean', 'cssmin', 'uglify', 'copy', 'imagemin', 'connect:testServer:keepalive']);
grunt.registerTask('deploy', ['gh-pages']);

}
