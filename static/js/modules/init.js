seajs.config({
    alias : {
        'jquery' : '/static/js/jquery-1.7.1.min.js',
        'jquery.form' : '/static/js/jquery.form.js',
        'ajaxRequest':'/static/js/modules/ajaxRequest.js'
    }
});

define(function(require,exports) {
    //设置全局jquery
    var $ = require('jquery');
    window.$ = window.jquery=$;
    var ajaxRequest=require('ajaxRequest');
    console.log(typeof ajaxRequest);
    var abc=new ajaxRequest('http://www.taobao.com',{
        before:function(){
            
        }
    })

});