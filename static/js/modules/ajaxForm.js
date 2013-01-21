define(function(require, exports, module) {

	//var jqueryForm = require('jquery.form');
	var ajaxForm = function(formId, options) {
			this.form = $('#'+formId);
			this.options = options || {};
		}

	ajaxForm.prototype.submit = function() {        
		console.log(this.form.attr('action'));
	}

	module.exports = ajaxForm;
});