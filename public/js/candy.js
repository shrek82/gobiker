var readyScript = {};

function readyRun() {
    var statrTime;
    $.each(readyScript, function (name, script) {
        statrTime = new Date().getTime();
        script();
        console.log('run ' + name + ':' + (new Date().getTime() - statrTime) / 1000 + 's');
    });
}

//获取城市下拉菜单
function get_cities(pid){
    $.ajax({
        url:'/common/cities_select',
        type:'post',
        dataType:'html',
        data:{province_id:pid},
        success:function(data){
            console.log(data);
            $('#city_select').html(data);
        }
    })
}

//获取城市下拉菜单
function get_areas(cid){
    $.ajax({
        url:'/common/areas_select',
        type:'post',
        dataType:'html',
        data:{city_id:cid},
        success:function(data){
            console.log(data);
            $('#area_select').html(data);
        }
    })
}

//打印log
function log(msg) {
    if (window.console && window.console.log) {
        window.console.log(msg);
    }
}

//判断变量是否定义
function is_defined(obj) {
    if (typeof(obj) != 'undefined' && obj != false) {
        return true;
    }
    else {
        return false;
    }
}
//返回一个jquery对象，没有则方法创建并再次返回
function fetchObj(id, createFun) {
    var obj = $('#' + id);
    if (obj.length) {
        return obj;
    }
    else if (typeof createFun == 'function') {
        createFun();
    }
    obj = $('#' + id);
    if (obj.length) {
        return obj;
    }
    else {
        log('对象' + id + '获取失败');
        return false;
    }
}


//ajaxForm表单提交
//jquery.form.js定义的方法检查没有再去定义
//原生的选项值有，此处不再做填充和检查
//url,action,method,type,success

function ajaxForm(form, opts) {

    var _this = this;

    //jquery表单对象
    this.form = form;
    //提交按钮
    this.btn = false;
    //提交状体提示框
    this.statusTools = false;

    //继承参数
    this.opts = $.extend({}, {
        dataType: 'json',
        timeout: 3000,
        clearForm: false,
        errorDisplayType: 'formError',
        loading: false,
        redirect: false,
        auto_redirect_to: true,
        auto_redirect_delay: 600,
        callback: false,
        before: false,
        error: false,
        submitButton: 'submit_button',
        successLabel: '成功发送',
        sendingLabel: '发送中',
        errorLabel: '重试'
    }, opts);

    //ajaxSubmit提交前执行
    this.opts.before = function () {

        //提交前先执行用户定义的方法
        if (typeof opts.before == 'function') {
            opts.before();
        }

        //提交按钮
        _this.btn = $('#' + _this.opts.submitButton);
        if (!_this.btn.length) {
            log('未找到提交按钮');
            return false;
        }

        //提交状态提示框
        _this.statusTools = fetchObj('statusTools', function () {
            _this.form.after('<div id="statusTools"></div>');
        })

        //指定rails返回格式
        _this.form.append('<input type="hidden" name="_format" value="' + _this.opts.dataType + '">');

        //载入loading提示符
        //_this.statusTools.removeClass('alert-block').removeClass('alert-error').removeClass('alert-success').html('<img src="/static/images/loading.gif">').fadeIn(200);

        //让提交按钮暂时不可用，并显示发送状态
        if (_this.btn.get(0).tagName == 'INPUT') {
            _this.btn.attr('disabled', true).attr('value', _this.opts.sendingLabel);
        }
        else if (_this.btn.get(0).tagName == 'BUTTON') {
            _this.btn.attr('disabled', true).html('<i class="icon-refresh icon-spin"></i>&nbsp;' + _this.opts.sendingLabel);
        }
    };

    //请求成功
    this.opts.success = function (data) {
        var is_error = false;
        var error_message = null;

        console.log(data);

        //判断请求结果是否包含警告或错误(用户错误)
        if (_this.opts.dataType == 'json' && data.error) {
            console.log(data.error);
            is_error = true;
            error_message = data.error;
        }

        //返回正确内容-----------------------------------------------------
        if (!is_error) {
            //重置按钮
            if (_this.btn.get(0).tagName == 'INPUT') {
                _this.btn.attr('value', _this.opts.successLabel);
            }
            else if (_this.btn.get(0).tagName == 'BUTTON') {
                _this.btn.html('<i class="icon-ok"></i>&nbsp;' + _this.opts.successLabel);
            }
            //移除消息框
            _this.statusTools.remove();
            //成功后调整到某一个页面
            if (_this.opts.redirect) {
                window.location.href = _this.opts.redirect;
                return false;
            }
            //用户自定义成功后方法
            if (typeof _this.opts.callback == 'function') {
                _this.opts.callback(data);
            }

            //json返回包含跳转地址，可自动调整
            if (_this.opts.dataType == 'json' && _this.opts.auto_redirect_to && data.redirect_to) {

                if (_this.btn.get(0).tagName == 'INPUT') {
                    _this.btn.attr('disabled', true);
                    _this.btn.attr('value', '跳转中...');
                }
                else if (_this.btn.get(0).tagName == 'BUTTON') {
                    _this.btn.attr('disabled', true);
                    _this.btn.html('跳转中...');
                }
                setTimeout(function () {
                    window.location.href = data.redirect_to;
                }, _this.opts.auto_redirect_delay);

                return false;
            }
        }
        //返回错误信息---------------------------------
        else {
            if (_this.btn.get(0).tagName == 'INPUT') {
                _this.btn.attr('disabled', false);
                _this.btn.attr('value', _this.opts.errorLabel);
            }
            else if (_this.btn.get(0).tagName == 'BUTTON') {
                _this.btn.attr('disabled', false);
                _this.btn.html(_this.opts.errorLabel);
            }

            //在表单底部提示错误
            if (_this.opts.errorDisplayType == 'formError') {
                _this.statusTools.addClass('alert alert-error');
                _this.statusTools.html(error_message);
                _this.statusTools.hide();
                _this.statusTools.fadeIn(500);
                setTimeout(function () {
                    _this.statusTools.fadeOut(400);
                }, 6000);
            }
            //系统弹出窗口
            else if (_this.opts.errorDisplayType == 'alert') {
                _this.statusTools.html('');
                alert(error_message);
            }
            //facebox弹出窗
            else if (_this.opts.errorDisplayType == 'dialogbox') {
                _this.statusTools.html('');
                alert(error_message);
            }
            else {
                alert(error_message);
            }
        }

        //重新激活重试提交
        _this.btn.attr('disabled', false);

    };

    //请求错误信息
    this.opts.error = function (xhr) {

        if (_this.btn.get(0).tagName == 'INPUT') {
            _this.btn.attr('disabled', false);
            _this.btn.attr('value', _this.opts.errorLabel);
        }
        else if (_this.btn.get(0).tagName == 'BUTTON') {
            _this.btn.attr('disabled', false);
            _this.btn.html(_this.opts.errorLabel);
        }

        _this.statusTools.addClass('alert alert-error');
        _this.statusTools.hide();
        if (xhr.readyState == 4 && xhr.status == 0) {
            _this.statusTools.html('很抱歉，请求超时，请重试或与管理员联系!');
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            _this.statusTools.html('程序出错，请重试或与管理员联系!');
        }
        else {
            _this.statusTools.html('很抱歉，数据发送失败，可能是程序有问题，请重试或与管理员联系！');
        }
        _this.statusTools.fadeIn(400);
        setTimeout(function () {
            _this.statusTools.fadeOut(400);
        }, 10000);
    };

};


//ajax提交表单
ajaxForm.prototype.send = function () {
    this.opts.before();
    this.form.ajaxSubmit(this.opts);
    return false;
};


//弹出框
var candyLayer=function(){
}

candyLayer.prototype.open=function(){
    $.layer({
        shade: false,
        area: ['auto', 'auto'],
        dialog: {
            msg: 'dffffff',
            btns: 2,
            type: 4,
            btn: ['确定', '取消'],
            yes: function () {
                layer.msg('您选择了重要。', 2, 1);
            },
            no: function () {
                layer.msg('奇葩!!!', 2, 4);
            }
        }
    });
}
//询问并删除记录
candyLayer.prototype.deleteRecord = function (cid,options) {
    var opts= $.extend({},{
        title:'删除确认',
        message:'确定要删除该条记录吗？注意删除后将不能再恢复!',
        data:{'_method':'delete',"_format":'json'},
        type:'POST',
        dataType:'json',
        error:false,
        beforeSend:false,
        success:function(data){
            var remove_tr=$('#record_'+cid);
            if(remove_tr.length){
                remove_tr.addClass("remove_tr").fadeOut(500);
                setTimeout(function(){
                    remove_tr.remove();
                },600)
            }
        },
        error:function(hxr){
            alert('程序出错，请重试或与管理员联系');
        }
    },options);

    return $.dialog({
        title:opts.title,
        id: 'Confirm',
        fixed: true,
        lock: false,
        content: opts.message,
        okValue: "确定",
        cancelValue: "取消",
        ok:function(){
           $.ajax(opts);
        },
        cancel:true
    });

}

//uploader
function go_uploader(options){

    var upload_file_ids='';
    var img_ids=$('#img_ids');
    var img_path=$('#img_path');
    var includBefore=$('#includBefore');
    var uploadify_preview=$('#uploadify_preview');
    var _this=this;

    var def={
        'auto': true,
        'fileTypeExts': '*.gif; *.jpg; *.png',
        'removeCompleted': true,
        'fileSizeLimit': '3MB',
        'width': 160,
        'queueSizeLimit': 20,
        'uploadLimit': 20,
        'method': 'post',
        'multi': true,
        'removeTimeout': 0.5,
        'successTimeout': 30,
        'buttonText': '添加照片...',
        'swf': '/static/uploadify/uploadify.swf',
        'uploader': '/attacheds/upload',
        'fileObjName':'attached[img]',
        'formData': {
            "_uploader":"uploadify",
            "_format":"json",
            "<%= key = Rails.application.config.session_options[:key] %>" : "<%= cookies[key] %>",
            "<%= request_forgery_protection_token %>" : "<%= form_authenticity_token %>"
        },
        //初始化完成
        'onInit': function(instance) {
        },
        //即将上传
        'onUploadStart' : function(file) {
        },
        //当每一个文件上传成功时触发
        'onUploadSuccess' : function(file, data, response) {
            uploadify_preview.css('display','block');
            if(data){
                var json = eval("(" + data + ")");
                if(json.state=="SUCCESS"){
                    upload_file_ids=upload_file_ids?upload_file_ids+','+json['file_id']:json['file_id'];
                    img_ids.val(img_ids.val().length>0?img_ids.val()+','+json['file_id']:json['file_id']);
                    img_path.val(img_path.val().length==0?json['url']:img_path.val());
                    includBefore.before('<li><img src="'+json['url']+'"></li>')
                }
                else{
                    alert('很抱歉，照片上传失败，原因：\n\n'+json.error);
                }
            }
        },
        //队列完成时触发
        'onQueueComplete' : function(queueData) {
            _this.preview();
        }
    };

    this.opt= $.extend({},def,options);

    //绑定上传事件
    this.uploadify=function(){
        $("#file_upload").uploadify(this.opt);
    }

    //绑定以预览图片事件
    this.preview=function(){
        var preview=uploadify_preview.find('li');
        preview.bind('click',function(e){
            preview.removeClass('cur');
            $('#img_path').val($(this).addClass('cur').find('img').attr('src'));
        })
    }

}