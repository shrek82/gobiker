/**
 * 名称 : 网站常用功能库
 * Author: seeyoup
 * 最后修改时间
 */
;
(function() {

    window.panda=new Object();

    //利用构造函数初始化表单对象
    panda.ajaxForm = function(formId, options) {
        var form = $('#' + formId);
    }
    //ajaxForm一些原型方法
    panda.ajaxForm.prototype = {
        opt: {
            loading: true,
            button: 'submit_button',
            sendLabel: '发送中',
            successLabel: '发送成功',
            errorLabel: '重试',
            before: function() {},
            success: function() {},
            error: function() {}
        },
        send: function() {
            alert(form.action);
            if(!form.length) {
                alert('提示：您还没有选择表单对象，请先选择检查');
                return false;
            }
            var opts = $.extend({}, this.opt);
        }
    };


})();