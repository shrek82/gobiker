define("./main/1.0.0/main-debug", [], function(require, exports, module) {
    exports.getPub = function() {
        seajs.log("main function");
    };
});

define("./request/1.0.0/request-debug", [ "main/1.0.0/main-debug" ], function(require, exports, module) {
    require("main/1.0.0/main-debug");
    var Request = function() {
        seajs.log("Request");
    };
    exports.Requset = Request;
});