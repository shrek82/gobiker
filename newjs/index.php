<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>seeyou.jsss</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <link rel="stylesheet" type="text/css" href="/themes/huaban/bootstrap/css/bootstrap.css" />
        <link href="http://todc.github.com/css3-google-buttons/assets/css/google-bootstrap.css" rel="stylesheet">
            <script type="text/javascript" src="/static/js/jquery-1.7.1.min.js"></script>
            <script type="text/javascript" src="/static/js/jquery.form.js"></script>
            <script type="text/javascript" src="/newjs/panda.js?v=<?=time()?>"></script>
    </head>
    <body>
        <div style="margin: 100px auto;width: 800px;;padding: 20px;border: 1px solid #eee">
            <form class="form-horizontal" id="form1" action="/member/login">
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
                        <button type="button" class="btn btn-success" onclick="save()" style="cursor: pointer">ajax发送</button>
                        <button type="submit" class="btn" style="cursor: pointer">普通发送</button>
                    </div>
                </div>
            </form>
        </div>

        <script type="text/javascript">
            function save(){
                new panda.ajaxForm('form1').send();
            }
        </script>

    </body>
</html>