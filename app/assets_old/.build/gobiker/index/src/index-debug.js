define("gobiker/index/src/index-debug", [ "gallery/jquery/1.8.2/jquery-debug" ], function(require, exports, module) {
    //引入jquery
    var jquery = require("gallery/jquery/1.8.2/jquery-debug");
    window.$ = window.jQuery = jquery;
});