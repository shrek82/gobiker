define(function (require, exports, module) {

  var lib = require('lib');

  module.exports = {
    test: function () {
      console.log('comments');
      new lib.popup({title: '登录'}).ajax('/seajs-grunt-build/ajax.html', '500px', function () {
        console.log('popup generate success!');
      })
    }
  };

})
;