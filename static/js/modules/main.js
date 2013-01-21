seajs.config({
	alias: {
		'jquery': '/static/js/modules/jquery-1.8.js',
		'jquery.ajaxForm': '/static/js/modules/jquery.ajaxForm.js',
		'ajaxRequest': '/static/js/modules/ajaxRequest.js',
		'ajaxForm': '/static/js/modules/ajaxForm.js',
		'jquery.popup': '/static/js/modules/jquery-popup.js',
		'cookie': '/static/js/modules/cookie',
		'jquery-validate' : '/static/js/modules/jquery.validate.js'
	}
});

define(function(require, exports, module) {
	var $ = require('jquery');
	window.jQuery=window.$=$;
	require('jquery.ajaxForm')($);
	$('#submitButton').click(function(){
		$('#myform').ajaxForm({
			action:'http://www.taobao.com'
		}).send();
	})

})