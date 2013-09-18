define("lib/latest/lib-debug", [ "gallery/jquery/1.8.2/jquery-debug", "./popup-debug", "./ajax_form-debug" ], function(require, exports, module) {
    var $ = require("gallery/jquery/1.8.2/jquery-debug");
    //基础弹出窗
    var popup = require("./popup-debug");
    //引入常用插件
    require("./ajax_form-debug")($);
    //定义基本功能
    var lib = {};
    lib.popup = popup;
    module.exports = lib;
});