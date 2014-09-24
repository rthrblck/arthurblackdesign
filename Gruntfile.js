module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    devUpdate: {

      main: {
        options: {
          updateType: 'prompt', 
          reportUpdate: false, 
          semver: true
        }
      }
    },

    sass: {
      
      dist: {
        options: {
          outputStyle: 'expanded'
        },

        files: {
          'build/tmp-unprefixed.css': 'src/scss/app.scss'
        }        
      }
    },

    autoprefixer: {
      dist: {
        files: {
          'build/app.css': 'build/tmp-unprefixed.css'
        }
      }
    },

    concat: {

      js: {
        src : ['src/js/**/*.js'],
        dest : 'build/app.js',
      }
    },

    connect: {
      devServer: {
        options: {
          port: 8000,
          livereload: 35729,
          hostname: 'localhost',
          base: 'build/'
        }
      },

      testServer: {
        options: {
          port: 8000,
          base: 'dist/',
          hostname: 'localhost'
        }
      },

      livereload: {
        options: {
          livereload: true,
          base: 'build/'
        }
      },
    },

    watch: {

      grunt: { 
        files: ['Gruntfile.js']
      },

      src: {
        files: ['src/**/*'],
        options: { livereload: true }
      },

      styles: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },

      index: {
        files: 'src/index.html',
        tasks: 'copy:index'
      }
    },

    clean: {

      dev1: 'build/**/*',

      dev2: 'build/tmp-unprefixed.css',

      test: 'dist/**/*'
    },

    cssmin : {

      css: {
        src: 'buildc/app.css',
        dest: 'dist/app.css'
      }
    },

    uglify : {

      js: {
        files: {
          'build/app.js' : [ 'dist/app.js' ]
        }
      }
    },

    copy: {

      dev: {
        files: [
        {expand: true, cwd: 'src/', src: ['index.html', 'img/**'], dest: 'build/'},
        ]
      },

      index: {
        files: [
        {expand: true, cwd: 'src/', src: 'index.html', dest: 'build/'},

        ]
      },

      test: {
        files: [
        {expand: true, src: 'build/index.html', dest: 'dist/', filter: 'isFile'},
        ]
      }
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },

        files: [{
          expand: true,
          cwd: 'build/img/',
          src: ['**/*.png'],
          dest: 'dist/img/',
          ext: '.png'
        }]
      },

      jpg: {
        options: {
          progressive: true
        },

        files: [{
          expand: true,
          cwd: 'build/img/',
          src: ['**/*.jpg'],
          dest: 'dist/img/',
          ext: '.jpg'
        }
        ]
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },

      src: ['**/*']
    }

  });

grunt.registerTask('default', ['clean:dev1', 'devUpdate', 'sass', 'autoprefixer', 'concat', 'copy:dev', 'clean:dev2', 'connect:devServer', 'watch']);
grunt.registerTask('smash', ['clean:test', 'cssmin', 'uglify', 'copy:test', 'imagemin', 'connect:testServer:keepalive']);
grunt.registerTask('deploy', ['gh-pages']);

}
