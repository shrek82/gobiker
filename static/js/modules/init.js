seajs.config({
    alias : {
        'jquery' : '/static/js/jquery-1.7.1.min',
        'jquery.form' : '/static/js/jquery.form',
        'bootstrap':'/static/bootstrap/js/bootstrap.js',
        'artDialog':'/static/artDialog4.1.5/jquery.artDialog.source',
         'ajaxRequest':'/static/js/modules/ajaxRequest',
        'bootstrap-dropdown':'/static/bootstrap/js/bootstrap-dropdown.js'
    }
});

define(function(require, exports) {
    //设置全局jquery
    var $ = require('jquery');
    window.$ = window.jquery=$;

    //artDialog弹出窗口
    //var art=require('artDialog');

   // var ajaxRequest=require('ajaxRequest');

    //ajaxRequest.send({'url':'http://qixingtianxia/index.php?r=brand/index'});

    //导航下拉菜单
    require('bootstrap-dropdown');

});