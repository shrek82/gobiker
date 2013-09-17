define("dist/gobiker/global/src/global-debug", [ "gallery/jquery/1.8.2/jquery-debug", "dist/lib/src/lib-debug" ], function(require, exports, module) {
    //引入jquery
    var jquery = require("gallery/jquery/1.8.2/jquery-debug");
    window.$ = window.jQuery = jquery;
    var lib = require("dist/lib/src/lib-debug");
    console.log("hello world!");
});