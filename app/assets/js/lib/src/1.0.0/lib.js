define(function(require, exports, module) {

  window.$=window.jQuery=require('./jquery');

  //定义基本功能
  var lib={};
  lib.popup=require("./popup");

  //ajax表单提交
  lib.ajaxForm=require("./ajaxForm");

  module.exports = lib;


});