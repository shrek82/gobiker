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
      curfile: {
        options: {
          idleading: '<%= pkg.name %>/'
        },
        files: [
          {
            cwd: 'src/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/'
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
        banner: '/*! <%= pkg.name %>(<%= pkg.version %>) - <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %>*/\n'
      },
      curfile: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %>(<%= pkg.version %>) - <%= pkg.author %> - <%= grunt.template.today("yyyy-mm-dd H:MM:ss") %>*/\n',
        footer: '',
        beautify: {
          ascii_only: true
        }
      },
      curfile: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['*.js', '!*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },
    copy: {
      curfile: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: '../../../../public/assets/js_modules/<%= pkg.name %>',
            filter: 'isFile'
          }
        ]
      }
    },
    clean: {
      spm: ['.build']
    }
  };

  //定义项目
  grunt.initConfig(default_opt);

  //载入grunt插件
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  //任务
  grunt.registerTask('build', ['transport:curfile','concat:curfile','uglify:curfile','copy:curfile']);
  grunt.registerTask('build-tran', ['transport:curfile']);
  grunt.registerTask('build-concat', ['concat:curfile']);
  grunt.registerTask('build-uglify', ['uglify:curfile']);
  grunt.registerTask('build-copy', ['copy:curfile']);
  grunt.registerTask('build-clean', ['clean']);

};


