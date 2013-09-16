define("js_modules/lib/src/lib-debug", [ "gallery/jquery/1.8.2/jquery-debug", "./popup-debug", "./ajax_form-debug" ], function(require, exports, module) {
    //引入jquery
    var jquery = require("gallery/jquery/1.8.2/jquery-debug");
    window.$ = window.jQuery = jquery;
    //基础弹出窗
    var popup = require("./popup-debug");
    //引入常用插件
    require("./ajax_form-debug")($);
    //定义基本功能
    var lib = {};
    lib.popup = popup;
    module.exports = lib;
});