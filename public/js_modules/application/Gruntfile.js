module.exports = function (grunt) {

  grunt.initConfig({
    //提取模块中的依赖,并为每个模块设置模块ID
    transport: {
      options: {
        format: 'application/dist/{{filename}}'
      },
      //定义一个人物目标target
      application: {
        files: {
          '.build': ['application.js', 'util.js']
        }
      }
    },
    // 合并.build/application.js文件到dist/application.js中
    concat: {
      main: {
        options: {
          relative: true
        },
        files: {
          'dist/application.js': ['.build/application.js'],
          'dist/application-debug.js': ['.build/application-debug.js']
        }
      }
    },
    //压缩
    uglify: {
      main: {
        files: {
          'dist/application.js': ['dist/application.js'] //对dist/application.js进行压缩，之后存入dist/application.js文件
        }
      }
    },
    //清除.build文件
    clean: {
      build: ['.build']
    }
  });

  //加载grunt需要的插件：
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //执行这些任务：
  grunt.registerTask('build', ['transport', 'concat', 'uglify', 'clean'])
};