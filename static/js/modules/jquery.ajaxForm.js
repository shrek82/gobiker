//我自己学习写的ajax提交表单插件
//这里是为了模块化而组织的代码格式
define(function(require) {
	return function(jQuery) {
		//插件开始
		(function($) {
			"use strict";
			var ajaxForm = function(options) {
					//默认参数
					var defaults = {
						action: null,
						type: 'POST',
						loading: true,
						sendingLabel: '发送中',
						successLabel: '发送成功',
						errorLabel: '发送失败',
						before: null,
						success: null,
						error: null
					};


					//检验表单
					if(!this.length) {
						console.log('没有绑定或指定表单对象，请检查');
						return false;
					}

					//原始表单提交地址
					defaults.action = this.attr('action') ? this.attr('action') : window.location.href;

					//没有进行任何配置
					if(typeof options == 'undefined') {
						console.log('没有定义参数或回执函数');
					}
					//只定义了回调函数
					else if(typeof options == 'function') {
						defaults.success = options;
						options = {};
					} else {

					}

					//提交参数
					this.options = $.extend({}, defaults, options);

				};

			//测试发送表单
			ajaxForm.prototype.test = function() {

			}

			//正式发送表单
			ajaxForm.prototype.send = function() {
				console.log('defaults.action=' + this.options.action);
				console.log('defaults.success=' + this.options.action);
			}

			$.fn.ajaxForm = ajaxForm;


		})(jQuery);
		//插件结束
	};
});