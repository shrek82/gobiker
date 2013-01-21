<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>我的JS框架</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="/themes/huaban/bootstrap/css/bootstrap.css" />
        <script type="text/javascript" src="/static/js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="/static/js/modules/jquery.ajaxForm.js?v=<?=time()?>"></script>
    </head>
    <body>
        <div style="margin: 100px auto;width: 800px;padding: 20px;border: 1px solid #eee">
            <form class="form-horizontal" id="myform" action="/member/login">
                <div class="control-group">
                    <label class="control-label" for="inputEmail">Email</label>
                    <div class="controls">
                        <input type="text" id="inputEmail" placeholder="Email" class="input-xxlarge">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="inputPassword" >Password</label>
                    <div class="controls">
                        <input type="text" id="inputPassword" placeholder="username" class="input-xxlarge">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="inputPassword">Password</label>
                    <div class="controls">
                        <textarea rows="3" class="input-xxlarge"></textarea>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox" style="color:#999;margin-bottom: 10px">
                            <input type="checkbox" name="remember" value="1"> Remember me
                        </label>
                        <button type="button" id="submitButton" class="btn btn-success" style="cursor: pointer">普通按钮</button>
                        <button type="submit" id="ajaxSubmit" class="btn btn-success" style="cursor: pointer">submit按钮</button>
                        <button type="submit" class="btn" style="cursor: pointer">普通发送</button>
                    </div>
                </div>
            </form>
        </div>

        <script type="text/javascript">
            $(document).ready(function() {
                $('#submitButton').click(function(){
                    $('#myform').ajaxForm({
                        target:'+333',
                        loadingLabel:'发送中',
                        successLabel:'发送成功',
                        errorLabel:'发送失败',
                        before:function(){},
                        success:function(){}
                    });
                });
            });
        </script>
    </body>
</html>