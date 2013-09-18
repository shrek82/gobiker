define(function(require, exports, module) {
  //引入jquery
  var jquery=require("jquery");
  window.$=window.jQuery=jquery;

  //基础弹出窗
  var popup=require("./popup");

  //引入常用插件
  require("./ajax_form")($);

  //定义基本功能
  var lib={};
  lib.popup=popup;

  module.exports = lib;


});