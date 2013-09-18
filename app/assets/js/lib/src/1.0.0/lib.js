define(function(require, exports, module) {

  window.$=window.jQuery=require('jquery');

  //弹出层
  var popup=require("./popup");

  //ajax提交插件
  require("./ajax_form")($);

  //定义基本功能
  var lib={};
  lib.popup=popup;

  module.exports = lib;


});