module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    //提取
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
            dest: '.build/lib'
          }
        ]
      },
      ajaxForm: {
        options: {
          idleading: 'dist/ajaxForm/'
        },

        files: [
          {
            cwd: 'ajaxForm/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/ajaxForm'
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
    //合并
    concat: {
      options: {
        paths: ['.'],
        include: 'relative'
      },
      lib: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['lib/**/*.js'],
            dest: 'concat/',
            ext: '.js'
          }
        ]
      },
      ajaxForm: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['ajaxForm/**/*.js'],
            dest: 'concat/',
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
            dest: 'concat/',
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
            dest: 'concat/',
            ext: '.js'
          }
        ]
      }
    },
    //压缩
    uglify: {
      lib: {
        files: [
          {
            expand: true,
            cwd: 'concat/',
            src: ['lib/**/*.js', '!lib/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
      ajaxForm: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['ajaxForm/**/*.js', '!ajaxForm/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },
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
      }
    },

    clean: {
      spm: ['.build']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build-lib', ['transport:lib', 'concat:lib', 'uglify:lib']);
  //grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles']);
  //grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1']);
  //grunt.registerTask('build-ajaxForm', ['transport:ajaxForm', 'concat:ajaxForm', 'uglify:ajaxForm']);

  //grunt.registerTask('default', ['clean']);
};