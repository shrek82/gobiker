
<div id="frameTop">
        <div id="frameTop_left">
                <a href="/"><img src="/static/images/logo.png" border="0"></a>
        </div>
</div>


<?php
$this->pageTitle = Yii::app()->name . ' - 用户登录';
$this->breadcrumbs = array('用户登录');
?>
<div style=" text-align: left; width: 700px;margin: 80px auto 0 auto">
    <h1>用户登录</h1>
    <div class="form">

<?php $form = $this->beginWidget('CActiveForm', array('id' => 'login-form')); ?>

        <div class="row">
            <?php echo $form->labelEx($model, 'username'); ?>
            <p class="textfield"><?php echo $form->textField($model, 'username'); ?></p>
        </div>

        <div class="row">
            <?php echo $form->labelEx($model, 'password'); ?>
            <p class="textfield"><?php echo $form->passwordField($model, 'password'); ?></p>
        </div>

        <div class="row">
            <label>记住我</label>
            <p class="textfield"><?php echo $form->checkBox($model, 'rememberMe'); ?></p>
        </div>

    <div class="row">
        <label></label>
        <button type="submit" class="button" onclick="login();return false;" id="submit_button" >登录</button>
    </div>

        <?php $this->endWidget(); ?>
    </div><!-- form -->
</div>

<script type="text/javascript">
    function login(){
        new ajaxForm('login-form',{data_type:'json',textSending: '登录中',textError: '重试',textSuccess: '登录成功',callback:function(json){
                window.location.href='<?=$this->createUrl('admin/index')?>';
            }}).send();
    }
</script>

<div style=" margin:10px 0; text-align: center">
    <br>Copyright &copy; 2012 by Usho.cn. Powered by <a href="http://www.yiichina.com/" rel="external">Yii Framework</a>.
</div>