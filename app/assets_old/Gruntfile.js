module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  var default_opt = {
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
        include: 'relative',
        //文件内容的分隔符
        separator: ';',
        banner: '/*! version:<%= pkg.version %>  author:<%= pkg.author %>' +
          '  update:<%= grunt.template.today("yyyy-mm-dd H:MM:ss") %> */ \n \n'
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
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %> <%= pkg.author %> update \n\n */',
        footer: '',
        //美化代码
        beautify: {
          //中文ascii化，非常有用！防止中文乱码的神配置
          ascii_only: true
        }

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
    copy: {
      all: {
        files: [
          {expand: true, cwd: 'dist/', src: ['**'], dest: 'js/', filter: 'isFile'}//, // includes files in path
          //{src: ['path/**'], dest: 'dest/'}, // includes files in path and its subdirs
          //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'}, // makes all src relative to cwd
          //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'} // flattens results to a single level
        ]
      }
    },
    mincss: {
      alsl: {
        files: {
          'dist/base.css': [
            'css/bootstrap.min.css',
            'css/application-embed.css'
          ]
        }
      }
    },
    css_combo: {
      base: {
        files: {
          "css_src/base.css": ['css/base.css']
        }
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

  //拷贝目录
  grunt.loadNpmTasks('grunt-contrib-copy');

  //css压缩,用法相对于grunt-contrib-uglify简单很多：
  grunt.loadNpmTasks('grunt-contrib-mincss');

  //css合并的插件，用于css分模块书写时的合并（如果你不使用less、sass、stylus，建议使用这个插件）
  grunt.loadNpmTasks('grunt-css-combo');

  //js语法检查
  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-merge-json');

  grunt.registerTask('build-lib', ['transport:lib', 'concat:lib']);
  grunt.registerTask('build-gobiker', ['transport:gobiker', 'concat:gobiker', 'uglify:gobiker']);
  grunt.registerTask('build-global', ['transport:global', 'concat:global', 'uglify:global']);

  grunt.registerTask('build-styles', ['transport:styles', 'concat:styles', 'uglify:styles', 'clean']);
  grunt.registerTask('build-app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
  grunt.registerTask('build_copy', ['copy:all']);
  grunt.registerTask('build_clean', ['clean']);

  grunt.registerTask('mincss-all', ['mincss:alsl']);
  grunt.registerTask('combo-base', ['css_combo:base']);
};


