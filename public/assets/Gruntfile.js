module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  var default_opt={
    pkg: grunt.file.readJSON("package.json"),
    //定义标示了
    transport: {
      options: {
        paths: ['.'],
        alias: '<%= pkg.spm.alias %>',
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        }
      },
      lib: {
        options: {
          idleading: 'dist/lib/'
        },
        files: [
          {
            cwd: 'lib/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/lib/'
          }
        ]
      },
      gobiker: {
        options: {
          idleading: 'dist/gobiker/'
        },
        files: [
          {
            cwd: 'gobiker/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/gobiker/'
          }
        ]
      },
      global: {
        options: {
          idleading: 'dist/gobiker/'
        },
        files: [
          {
            cwd: 'gobiker/',
            src: 'global/**/*',
            filter: 'isFile',
            dest: '.build/gobiker/'
          }
        ]
      },
      styles: {
        options: {
          idleading: 'dist/styles/'
        },

        files: [
          {
            cwd: 'styles/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/styles'
          }
        ]
      },
      app1: {
        options: {
          idleading: 'app1/'
        },
        files: [
          {
            cwd: 'app',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/app'
          }
        ]
      }
    },
    //合并了
    concat: {
      options: {
        paths: ['.'],
        include: 'relative'
      },
      gobiker: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['gobiker/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      global: {
        options: {
          include: 'relative'
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['gobiker/global/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      lib: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['lib/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      styles: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['styles/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      app1: {
        options: {
          include: 'all'
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['app/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      styles: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['styles/**/*.js', '!styles/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      app1: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['app/**/*.js', '!app/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      lib: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['lib/**/*.js', '!lib/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      gobiker: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['gobiker/**/*.js', '!gobiker/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      global: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['gobiker/global/**/*.js', '!gobiker/global/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      spm: ['.build']
    }
  };

  grunt.initConfig(default_opt);

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-merge-json');

  grunt.registerTask('build-lib', ['transport:lib','concat:lib']);
  grunt.registerTask('build-gobiker', ['transport:gobiker','concat:gobiker', 'uglify:gobiker']);
  grunt.registerTask('build-global', ['transport:global','concat:global', 'uglify:global']);

  grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles', 'clean']);
  grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
  //    grunt.registerTask('default', ['clean']);
};