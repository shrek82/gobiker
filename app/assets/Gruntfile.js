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
          idleading: 'js_modules/lib/'
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
          idleading: 'js_modules/ajaxForm/'
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
      main: {
        options: {
          idleading: 'js_modules/main/'
        },
        files: [
          {
            cwd: 'main',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/main'
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
      main: {
        options: {
          //paths: ['.'],
          //include: 'all'
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['main/**/*.js'],
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
            dest: '../../public/js_modules/',
            ext: '.js'
          }
        ]
      },
      ajaxForm: {
        files: [
          {
            expand: true,
            cwd: 'concat/',
            src: ['ajaxForm/**/*.js', '!ajaxForm/**/*-debug.js'],
            dest: '../../public/js_modules/',
            ext: '.js'
          }
        ]
      },
      styles: {
        files: [
          {
            expand: true,
            cwd: 'concat/',
            src: ['styles/**/*.js', '!styles/**/*-debug.js'],
            dest: '../../public/js_modules/',
            ext: '.js'
          }
        ]
      },
      main: {
        files: [
          {
            expand: true,
            cwd: 'concat/',
            src: ['main/**/*.js', '!main/**/*-debug.js'],
            dest: '../../public/js_modules/',
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
  grunt.registerTask('build-main', ['transport:main', 'concat:main', 'uglify:main']);
  //grunt.registerTask('build-ajaxForm', ['transport:ajaxForm', 'concat:ajaxForm', 'uglify:ajaxForm']);

  //grunt.registerTask('default', ['clean']);
};