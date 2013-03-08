<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>我的JS框架</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="/themes/huaban/bootstrap/css/bootstrap.css" />
        <script type="text/javascript" src="/static/js/sea2.0.js"></script>
        <script type="text/javascript" src="/static/js/modules/config.js?v=<?=time()?>>"></script>
    </head>
    <body>
        <div style="margin: 100px auto;width: 800px;padding: 20px;border: 1px solid #eee">
            <form class="form-horizontal" id="myform" method='POST' action="ajaxsub.php" datatype="222222222">
                <div class="control-group">
                    <label class="control-label" for="inputEmail">Email</label>
                    <div class="controls">
                        <input type="text" id="inputEmail" name="email" placeholder="Email" class="input-xxlarge" value="37294812@qq.com">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="inputPassword" >Address</label>
                    <div class="controls">
                        <input type="text" id="inputPassword" name="address" placeholder="username" class="input-xxlarge">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="inputPassword">momo</label>
                    <div class="controls">
                        <textarea rows="3" class="input-xxlarge" name="momo"></textarea>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox" style="color:#999;margin-bottom: 10px">
                            <input type="checkbox" name="remember" value="1"> Remember me
                        </label>
                        <button type="button" id="submitButton" class="btn btn-success" style="cursor: pointer">普通按钮</button>
                        <button type="submit" id="ajaxSubmit" class="btn btn-success" style="cursor: pointer">确定添加</button>
                        <button type="reset" class="btn" style="cursor: pointer">重置</button>

                        &nbsp;&nbsp;<br><br><a href="/newjs/index.php/" style="color:#999">忘记密码了？</a>
                    </div>
                </div>
            </form>
        </div>

        <script type="text/javascript">
            seajs.use(['main','candyForm'],function(/*不需要暴露，引入模块就初始化好鸟*/){

                //绑定表单方法
                $('#myform').candyForm({
                    url:'/newjs/ajaxsub.php',
                    beforeSubmit:function(){
                        console.log('自定义提交前方法');
                    },
                    success:function(data){
                        console.log('自定义提交成功后方法');
                        console.log(data);
                    }
                });
            });


window.onerror = function(msg, url, line) {
    console.log(msg + ':' + line+url);
    // IE:"Object does't support this property or method:7"
    // FF:"Script error.:0"
    // Chrome:"Script error.:0"
};
        </script>

    </body>
</html>