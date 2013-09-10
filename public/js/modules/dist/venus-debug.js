define("zhaojiangang/venus/1.0.0/venus-debug", [ "./vango-debug" ], function(require, exports, module) {
    var Vango = require("./vango-debug");
    exports.Vango = Vango;
});

// File: vango.js
define("zhaojiangang/venus/1.0.0/vango-debug", [], function(require, exports, module) {
    (function(root, factory) {
        if (typeof exports === "object") {
            // Node
            module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
            define(factory);
        } else {
            // Browser
            root.Vango = factory();
        }
    })(this, function() {});
});
