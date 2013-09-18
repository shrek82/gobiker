define("lib/latest/lib", [ "gallery/jquery/1.8.2/jquery", "./popup", "./ajax_form" ], function(require, exports, module) {
    var $ = require("gallery/jquery/1.8.2/jquery");
    //基础弹出窗
    var popup = require("./popup");
    //引入常用插件
    require("./ajax_form")($);
    //定义基本功能
    var lib = {};
    lib.popup = popup;
    module.exports = lib;
});