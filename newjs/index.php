<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>我的JS框架</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="/themes/huaban/bootstrap/css/bootstrap.css" />
        <script type="text/javascript" src="/static/js/sea.js"></script>
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
                        <button type="button" id="ajaxSubmit" class="btn btn-success" style="cursor: pointer">ajax发送</button>
                        <button type="submit" class="btn" style="cursor: pointer">普通发送</button>
                    </div>
                </div>
            </form>
        </div>

        <a href="/newjs/index.php/">index.php</a>
        <script type="text/javascript">
            seajs.use('/static/js/modules/main',function(main){
                $('#ajaxSubmit').click(function(){
                    new main.ajaxForm('myform',{}).submit();
                })
            });
        </script>

    </body>
</html>