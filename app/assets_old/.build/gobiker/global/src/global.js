define("dist/gobiker/global/src/global", [ "gallery/jquery/1.8.2/jquery", "dist/lib/src/lib" ], function(require, exports, module) {
    //引入jquery
    var jquery = require("gallery/jquery/1.8.2/jquery");
    window.$ = window.jQuery = jquery;
    var lib = require("dist/lib/src/lib");
    console.log("hello world!");
});