define(function(require, exports, module) {
  //引入jquery
  var jquery=require("jquery");
  window.$=window.jQuery=jquery;

  var lib=require("lib");

  console.log('hello world!');
});