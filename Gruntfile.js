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
          'tmp/tmp-unprefixed.css': 'src/scss/app.scss'
        }        
      }
    },

    autoprefixer: {

      dist: {
        files: {
          'build/app.css': 'tmp/tmp-unprefixed.css'
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
        files: ['build/**/*'],
        options: { livereload: true }
      },

      html: {
        files: 'src/index.html',
        tasks: 'copy:html'
      },

      styles: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'clean:dev2']
      },

      js: {
        files: 'src/js/**/*.js',
        tasks: 'concat'
      }


    },

    clean: {

      dev1: 'build/**/*',

      dev2: 'tmp/',

      smash: 'dist/**/*'
    },

    cssmin : {

      css: {
        src: 'build/app.css',
        dest: 'dist/app.css'
      }
    },

    uglify : {

      js: {
        files: {
          'dist/app.js' : 'build/app.js'
        }
      }
    },

    copy: {

      dev: {
        files: [
        {expand: true, cwd: 'src/', src: ['index.html', 'img/**'], dest: 'build/'},
        ]
      },

      html: {
        files: [
        {expand: true, cwd: 'src/', src: 'index.html', dest: 'build/'},
        ]
      },

      smash: {
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
grunt.registerTask('smash', ['clean:smash', 'cssmin', 'uglify', 'copy:test', 'imagemin', 'connect:testServer:keepalive']);
grunt.registerTask('deploy', ['gh-pages']);

}
