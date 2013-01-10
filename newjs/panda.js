/**
 * 名称 : 网站常用功能库
 * Author: seeyoup
 * 最后修改时间
 */
;
(function(){

    window.panda=new Object();

    //ajax提交表单
    panda.ajaxForm=function(formId,options){
        this.form=$('#'+formId);
    }
    //ajaxForm一些原型方法
    panda.ajaxForm.prototype={
        opt:{
            loading:true,
            button:'submit_button',
            sendLabel:'发送中',
            successLabel:'发送成功',
            errorLabel:'重试',
            before:function(){},
            success:function(){},
            error:function(){}
        },
        send:function(){
            var opts=$.extend({},this.opt);
            alert(opts);
            alert(this.form.attr('action'));
           //alert('panda version:'+panda.version);
           //alert(this.opt.button);
        }
    };


})();

window.name='meiming';
function bbcash(){
    alert(this.name);
}
bbcash();
