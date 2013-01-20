seajs.config({
	alias: {
		'jquery': '/static/js/modules/jquery-1.8.js',
		'jquery.form': '/static/js/jquery.form.js',
		'ajaxRequest': '/static/js/modules/ajaxRequest.js',
		'ajaxForm': '/static/js/modules/ajaxForm.js'
	}
});

define(function(require, exports, module) {
	var $ = require('jquery');
	window.$ = window.jQuery = $;
	module.exports.ajaxForm = require('ajaxForm');
})