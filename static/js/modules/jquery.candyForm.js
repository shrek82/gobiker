//我自己学习写的ajax提交表单插件
//这里是为了模块化而组织的代码格式
define(function(require) {
    require('jquery.form')($);
    return function(jQuery) {
        //插件开始
        (function($) {
            "use strict";

            //ajax提交
            $.fn.candyAjaxSubmit = function(options) {

                options = options || {};

                //以下表单引用名称
                var $form = this;

                //默认参数
                var defaults = {
                    url: $form.attr('url') || window.location.href || '',
                    type: $form.attr('url') || 'POST',
                    dataType: 'html',
                    data: null,
                    loading: true,
                    submitButton: null,
                    sendingLabel: '发送中',
                    successLabel: '发送成功',
                    errorLabel: '发送失败',
                    beforeSubmit:function(){},
                    success:function(){},
                    error:function(){}
                };

                //继承参数及方法
                var opts = $.extend({}, defaults, options);

                //获取提交按钮
                var $button;
                if(typeof opts.submitButton == 'Object') {
                    $button = opts.submitButton;
                } else if(typeof opts.submitButton == 'string') {
                    $button = $('#' + opts.submitButton);
                } else {
                    $button = $form.find('*[type=submit]');
                }

                //追加发送前后系统状态提示
                var sysAlert = {
                    //发送前
                    beforeSubmit: function() {
                        opts.beforeSubmit();
                        changeLabel($button, opts.sendingLabel, true);
                    },
                    //发送成功
                    success: function(data) { 
                        changeLabel($button, opts.successLabel, true);
                        opts.success(data);
                    },
                    //发送失败
                    error: function(data) {
                        changeLabel($button, opts.errorLabel, false);
                        opts.error(data);
                    }
                }

                //标签名称及状态即使修改方法
                var changeLabel = function($button, label, disabled) {
                    if($button[0].tagName == 'INPUT') {
                        $button.attr('value', label);
                    }
                    else {
                        $button.html(label);
                    }
                    return $button.attr('disabled', disabled);
                }

                //异步提交表单
                $form.ajaxSubmit($.extend({},opts,sysAlert));

            }

            //为form绑定ajax提交方法
            $.fn.candyForm = function(options) {
                if(this.length) {
                    var $form = this;
                    $form.bind('submit', function(e) {
                        e.preventDefault();
                        $form.candyAjaxSubmit(options);
                    })
                }
            }


        })(jQuery);
    //插件结束
    };
});