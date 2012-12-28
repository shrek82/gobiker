//判断变量是否定义
function is_defined(obj){
    if(typeof(obj)!='undefined' && obj!=false){
        return true;
    }
    else{
        return false;
    }
}

var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

//jquery ajax 请求
var Request=function(json){
    this.send=function(){
        //this所在的函数是当做哪个对象的方法调用的，则该对象就是this所引用的对象
        //alert(this.name);
        if(json.onRequest){
            json.onRequest();
        }
        $.ajax({
            url: json.url?json.url:null,
            type:json.method?json.method:'get',
            processData: false,
            data:json.data?json.data:'&ajax=true',
            success: json.onSuccess?function(data){
                json.onSuccess(data);
            }:null,
            error:json.onError?function(data){
                json.onError(data);
            }:null,
            dataType:json.dataType?json.dataType:'html'
        });
    }
}

//设置按钮(input或者button)标签文字
function setTagLabel($obj,str){
    var tagName=$obj.get(0).tagName.toLowerCase();
    if(tagName==='button'){
        $obj.html(str);
    }
    else if(tagName==='input'){
        $obj.attr('value',str);
    }
    else{
    }
}

//ajaxForm表单提交
var ajaxForm=function(form_id,json,time){

    //定义在子类中调用的变量名称
    var self=this;
    this.options={//默认值
    }

    //是否成功
    this.is_success=false;
    //成功后延迟执行回执函数时间
    this.time=time||300;
    //错误提示
    this.error_string='';
    //form id
    this.formId=form_id;
    //form表单对象
    this.form=$('#'+form_id);
    this.data_type=json.data_type?json.data_type:'html';
    //facebox确认按钮
    this.faceboxButton=null;
    //错误提示方式
    this.errorDisplayType=json.errorDisplayType?json.errorDisplayType:'formError';
    //提交方式
    this.method=json.method?json.method:'post';
    //显示loading
    this.loading=json.loading?json.loading:false;
    //提交地址
    this.action=json.action?json.action:this.form.attr('action');
    //提交按钮
    this.submitButton=json.submitButton?$('#'+json.submitButton):$("#submit_button");
    //没有定义的按钮寻找facebox确认按钮
    if(this.submitButton.length==0){
        var $aui_buttons=$("#aui_buttons");
        this.faceboxButton=$aui_buttons.find(".aui_state_highlight");
    }
    //状态提示条
    this.flash_message=null;
    //按钮原来文字
    this.old_text=this.submitButton.attr('value');
    //发送状态提示的文字
    this.textSuccess=json.textSuccess?json.textSuccess:'成功发送',
    this.textSending=json.textSending?json.textSending:'正在发送';
    this.textError=json.textError?json.textError:'重试',
    //提交前方法
    this.before_submit=function(){
        if(json.before){
            json.before();
        }
        //状态提示框
        if($('#flash_message').length<=0){
            self.form.after('<div id="flash_message" style="clear:both;margin:10px;"><img src="/static/images/loading.gif"></div>');
            self.flash_message=$('#flash_message');
        }
        else{
            self.flash_message=$('#flash_message');
            self.flash_message.removeClass('flash-error');
            self.flash_message.html('<img src="/static/images/loading.gif">')
        }

        //按钮暂时不可用，并显示发送状态
        //faceboxButton按钮
        if(self.faceboxButton){
            self.faceboxButton.attr('disabled',true);
            self.faceboxButton.html(self.textSending);
        }
        else{
            self.submitButton.attr('disabled',true);
            setTagLabel(self.submitButton,self.textSending);
        }

    }
    //提交过程能够中
    this.submitting=function(){
    }

    //回执方法
    this.success=function(data){

        //判断返回结果并执行下一步
        //返沪json格式
        if(self.data_type=='json'){
            if(data.status==1){
                self.is_success=true;
            }
            else{
                if(typeof data.status!='undefined'){
                    delete data.status;
                }
                $.each(data,function(key,item){
                    self.error_string+=item+'<br>';
                })
            }
        }
        //返回html格式
        else if(self.data_type=='html'){
            if (data.indexOf("err#")>=0){
                self.error_string=data.replace("err#","");
            }
            else{
                self.is_success=true;
            }
        }
        else{
            self.is_success=true;
        }

        //处理成功信息
        if(self.is_success==true){

            //移除消息框
            self.flash_message.remove();

            //成功后调整到某一个页面
            if(json.redirect){
                window.location.href=json.redirect;
                return false;
            }
            //成功后操作
            if(json.callback){
                setTimeout(function(){
                    if(self.faceboxButton){
                        self.faceboxButton.attr('disabled',false);
                        self.faceboxButton.html(self.textSuccess);
                    }
                    else{
                        self.submitButton.attr('disabled',false);
                        setTagLabel(self.submitButton,self.textSuccess);
                    }
                    json.callback(data);
                },self.time);

            }
        }
        //请求失败提示
        else{
            if(self.faceboxButton){
                self.faceboxButton.attr('disabled',false);
                self.faceboxButton.html(self.textError);
            }
            else{
                self.submitButton.attr('disabled',false);
                setTagLabel(self.submitButton,self.textError);
            }
            //在表单底部提示错误
            if(self.errorDisplayType=='formError'){
                self.flash_message.addClass('flash-error');
                self.flash_message.html(self.error_string);
                self.flash_message.hide();
                self.flash_message.fadeIn(400);
                setTimeout(function(){
                    self.flash_message.fadeOut(400);
                },6000);
            }
            //系统弹出窗口
            else if(self.errorDisplayType=='alert'){
                self.flash_message.html('');
                alert(self.error_string);
            }
            //facebox弹出窗
            else if(self.errorDisplayType=='dialogbox'){
                self.flash_message.html('');
                errorAlert(self.error_string);
            }
            else{
            }
        }
    }
    //请求错误
    this.error=function(xhr){
        $("#usho_form_loading").html('');
        if(xhr.readyState==4 && xhr.status==0){
            $("#flash_message").html('<span style="color:#f00">很抱歉，请求超时，请重试或与管理员联系!</span>');
        }

        if(xhr.readyState==4 && xhr.status==200){
            $("#flash_message").html('<span style="color:#f00">程序出错，请重试或与管理员联系!</span>');
        }
        else{
            $("#flash_message").html('<span style="color:#f00">很抱歉，数据发送失败，可能是程序有问题，请重试或与管理员联系！</span>');
        }
        $("#usho_form_loading").html('');
        $('#flash_message').fadeIn(400);
        self.submitButton.attr('disabled',false);
        setTagLabel(self.submitButton,self.textError);
    }

    this.send=function(){
        this.form.ajaxSubmit({
            beforeSubmit:this.before_submit,
            success:this.success,
            error:this.error,
            dataType:this.data_type,
            data:json.data?json.data:{
                'ajax':'1'
            },
            url:this.action,
            type:this.method
        })
    }

};
//Facebox对话框
function Facebox(json){

    var self=this;
    //待返回的dialogbox对象
    this.obj=null;
    //窗口对象
    this.cancel=json.cancel?json.cancel:true;
    this.cancel=this.cancel=='hidden'?null:this.cancel;
    //打开artdialog窗口
    this.show=function(){

        //初始化窗口
        this.obj=art.dialog({
            id:json.id?json.id:'my_dialogbox',
            padding: json.padding?json.padding:'10px',
            title:json.title?json.title:'消息提示',
            top:json.top?json.top:'40%',
            left:json.left?json.left:'45%',
            icon:json.icon?json.icon:false,
            width:json.width?json.width:'320px',
            height:json.height?json.height:'100px',
            minWidth:json.minWidth?json.minWidth:null,
            minHeight:json.minHeight?json.minHeight:null,
            button:json.button?json.button:null,
            lock:json.lock?json.lock:false,
            follow:json.follow?json.follow:null,
            ok:json.ok?json.ok:null,
            okVal:json.okVal?json.okVal:'确定',
            cancel:self.cancel,
            cancelVal:json.cancelVal?json.cancelVal:'取消',
            time:json.time?json.time:null,
            content: '<img src="/static/images/loading.gif">'
        });

        //初始化内容
        if(json.message){
            this.obj.content(json.message);
        }

        //加载网页视图
        else if(json.url){
            new Request({
                url: json.url,
                method: 'get',
                onSuccess: function(data){
                    self.obj.content(data);
                }
            }).send();
        }
        else{
            this.obj.content('您想做什么呢？');
        }

        //返回窗口对象，以便其他对象操作artdialog窗口
        return this.obj;

    }
    this.close=function(){
        this.obj.close();
    }
}

//普通警告提示框
function Alert(message,time){
    var closeTime=time||2;
    new Facebox({
        id:'alert_dialogbox',
        padding:'15px',
        title: '温馨提示',
        icon:'warning',
        cancel:'hidden',
        cancelVal:'关闭',
        message:'<div style="text-align:left;color:#f60;width:100%">'+message+'</div>',
        time:closeTime
    }).show();
}

//成功提示框
function okAlert(message,time){
    var closeTime=time||2;
    new Facebox({
        id:'alert_dialogbox',
        padding:'15px',
        title: '操作成功',
        icon:'succeed',
        cancelVal:'关闭',
        message:message,
        time:closeTime
    }).show();
}

//错误提示框
function errorAlert(message,time){
    var closeTime=time||2;
    new Facebox({
        id:'alert_dialogbox',
        padding:'15px',
        title: '操作失败',
        icon:'error',
        cancelVal:'关闭',
        message:message,
        time:closeTime
    }).show();
}

//删除
function ushoDel(id){
    var removeObj=$('#'+id);
    document.getElementById(id).style.backgroundColor='#FCB4C6';
    removeObj.fadeOut(400);
    setTimeOut(function(){
        removeObj.remove();
    },500)
}

//删除
function ushoOk(id){
    var removeObj=$('#'+id);
    document.getElementById(id).style.backgroundColor='#A2E3A2';
    removeObj.fadeOut(400);
    setTimeOut(function(){
        removeObj.remove();
    },500)
}

//删除确认
function flash(data){
    art.dialog({
        id: 'ams_dialog',
        title:'操作提示',
        padding:'15px 30px',
        time:2000,
        content:data.message,
    });
}

//facebook询问框
var faceboxConfirm=function(json){
    var self=this;
    this.textSuccess=json.textSuccess?json.textSuccess:'发送成功',
    this.textSending=json.textSending?json.textSending:'发送中';
    this.open=function(){
        new Facebox({
            title: json.title?json.title:'删除确认！',
            message:json.message?json.message:'确定要删除该内容吗？注意删除后不可再恢复！',
            icon:json.icon?json.icon:'question',
            ok: function(){
                var $aui_buttons=$("#aui_buttons");
                var faceboxButton=$aui_buttons.find(".aui_state_highlight");
                faceboxButton.html(self.textSending);
                new Request({
                    url: json.url,
                    method: 'post',
                    onSuccess: function(){
                        faceboxButton.html(self.textSuccess);
                        if(json.removeDom){
                            ushoDel(json.removeDom);
                        }
                        if(json.redirect){
                            window.location.href=json.redirect;
                        }
                        if(json.callback){
                            json.callback();
                        }
                    }
                }).send();
            }
        }).show();
    }
}

//关闭顶部提示框
function closeFlashBox(id,time){
    var $div=jQuery('#'+id);
    $div.fadeTo(time,0,function(){
        $div.remove();
    });
}

//普通全选按钮
function selectAll(check_id,name){
    if($('#'+check_id).attr("checked")){
        $("input[name='"+name+"']").each(function(){
            $(this).attr("checked",'true');
        })
    }
    else{
        $("input[name='"+name+"']").each(function(){
            $(this).removeAttr("checked");
        })
    }
}


//文件下载提示
function saveFile()
{
    var obj = window.frames("jia");
    obj.document.open();
    obj.document.write (document.getElementById("content").value);
    obj.document.close();
    obj.document.execCommand("SaveAs");
}

//友笑网络
var usho={};

//重置表单
usho.resetForm=function(form_id){
    $('#'+form_id+' input[type="text"]').each(function(index){
        $(this).attr('value','');
        if(index===0) $(this).focus();
    })
}

//记录操作
usho.record={};

//已经选择的档案序号
usho.selectedAlumnisArray=new Array();

//获取已经勾选的记录id数组
usho.getSelectedCheckboxVals=function(checkboxName,alertMessage){
    var selected_cids =[];
    var alertMessage=alertMessage||false;
    $('input[name="'+checkboxName+'"]:checked').each(function(){
        selected_cids.push($(this).val());
    })

    //判断导出方式
    if(selected_cids.length==0){
        if(alertMessage){
            Alert(alertMessage);
        };
        return false;
    }
    else{
        return selected_cids;
    }

}

//保存已选记录到cookies(目标数组，选择的记录id)
usho.addSelectedRecord=function(pushTo,cid){

    //从cookie获取已选记录
    var tempArray = $.cookies.get(pushTo);

    //初始化cookie
    if(!tempArray){
        tempArray={};
    }

    //追加数据并保存cookie
    if(cid.constructor===Array){
        for(i in cid){
            tempArray['c'+cid[i]]=parseInt(cid[i]);
        }
    }
    else{
        tempArray['c'+cid]=parseInt(cid);
    }
    $.cookies.set(pushTo,tempArray);
    this.updateSelectedCount(tempArray);
}

//从cookies移除已选记录(目标cookie名称，选择中的记录id)
usho.removeSelectedRecord=function(pushTo,cid){

    //从cookie获取已选记录
    var tempArray = $.cookies.get(pushTo);

    if(tempArray){
        if(cid.constructor===Array){
            for(i in cid){
                delete tempArray['c'+cid[i]];
            }
        }
        else{
            delete tempArray['c'+cid];
        }
    }
    $.cookies.set(pushTo,tempArray);
    this.updateSelectedCount(tempArray);
}

//更新选择按钮已选择数
usho.updateSelectedCount=function(tempArray){
    var counter = 0;
    for(var i in tempArray){
        counter++;
    }
    $('#total_selected_records').html(counter);
}

//选择全部记录(保存到目标cookie)
usho.selectAllRecords=function(is_select,name,pushTo){
    var cid=null;
    var cids=new Array;

    //清除全部
    if(is_select=='clearAll'){
        $("#viewTable input[name='"+name+"']").each(function(){
            cid=$(this).attr('record_id');
            $(this).removeAttr("checked");
            $('#tr'+cid).removeClass('selected');
        })
        $.cookies.set(pushTo,{});
        this.updateSelectedCount(new Array);
    }

    //取消本页全部
    else if(is_select===false){
        $("#viewTable input[name='"+name+"']").each(function(){
            cid=$(this).attr('record_id');
            cids.push(cid);
            $(this).removeAttr("checked");
            $('#tr'+cid).removeClass('selected');
        })
        //删除取消的记录
        usho.removeSelectedRecord(pushTo,cids);
    }

    //选择本页全部
    else{
        $("#viewTable input[name='"+name+"']").each(function(){
            cid=$(this).attr('record_id');
            cids.push(cid);
            $(this).attr("checked",'true');
            $('#tr'+cid).addClass("selected");
        })
        //增加新记录到cookie
        usho.addSelectedRecord(pushTo,cids);
    }
}

//点选单个tr选择该行复选框
usho.selectRecordOnClickTr=function(pushTo){
    $('#viewTable tr').click(function(){
        //当右键菜单显示时不执行
       // if(showContextMenu==false){
            var cid=$(this).attr('record_id');
            var checkbox=$('#checkbox'+cid);
            if(checkbox.attr("checked")){
                $(this).removeClass('selected');
                checkbox.removeAttr("checked");
                //删除取消的记录
                usho.removeSelectedRecord(pushTo,cid);
            }
            else{
                $(this).addClass("selected");
                checkbox.attr("checked",'true');
                //增加新记录到cookie
                usho.addSelectedRecord(pushTo,cid);
            }
       // }
    });
}

//点击某个单选框选择表格行
usho.selectRecordOnClickCheckbox=function(pushTo){
    $("#viewTable input[name='selecRecord[]']").click(function(e){
        var tr=$('#tr'+$(this).attr('record_id'));
        var cid=$(this).attr('record_id');
        if($(this).attr("checked")){
            tr.addClass("selected");
            usho.addSelectedRecord(pushTo,cid);
        }
        else{
            tr.removeClass('selected');
            usho.removeSelectedRecord(pushTo,cid);
        }
        e.stopPropagation();
    });
}

//取消链接冒泡
usho.stopPropagation=function(){
    $("#viewTable a").each(function(){
        $(this).click(function(e){
            e.stopPropagation();
        });
    })
}

//从cookie读取并已选记录并自动选择
usho.autoSelectedRecord=function(cookieName){
    var tempArray = $.cookies.get(cookieName);
    if(tempArray){
        $("#viewTable tr").each(function(){
            var cid=$(this).attr('record_id');
            if(typeof tempArray['c'+cid]!='undefined'){
                $(this).addClass("selected");
                $('#checkbox'+cid).attr("checked",'true');
            }
        });
        this.updateSelectedCount(tempArray);
    }
}

