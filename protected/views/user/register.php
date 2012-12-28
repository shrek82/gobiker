    <?php
    $this->pageTitle = Yii::app()->name . ' - 用户注册';
    ?>

    <?php $form = $this->beginWidget('CActiveForm', array('id' => 'register_form', 'htmlOptions' => array('class' => 'form-horizontal'))); ?>


    <fieldset>
        <legend>用户注册</legend>

        <div class="control-group">
            <?php echo $form->labelEx($model, 'username', array('class' => 'control-label')); ?>
            <div class="controls">
                <?php echo $form->textField($model, 'username', array('class' => 'span4')); ?>
                <p class="help-inline">您的大名</p>
            </div>
        </div>

        <div class="control-group">
            <?php echo $form->labelEx($model, 'email', array('class' => 'control-label')); ?>
            <div class="controls">
                <?php echo $form->textField($model, 'email', array('class' => 'span4')); ?>
                <p class="help-inline">将作为登录帐号</p>
            </div>
        </div>

        <div class="control-group">
            <?php echo $form->labelEx($model, 'password', array('class' => 'control-label')); ?>
            <div class="controls">
                <?php echo $form->passwordField($model, 'password', array('class' => 'span4')); ?>
                <p class="help-inline">输入6~12字符密码</p>
            </div>
        </div>

        <div class="control-group">
            <?php echo $form->labelEx($model, 'confirmPassword', array('class' => 'control-label')); ?>
            <div class="controls">
                <?php echo $form->passwordField($model, 'confirmPassword', array('class' => 'span4')); ?>
                <p class="help-inline">再次输入以上密码</p>
            </div>
        </div>

        <div class="control-group">

            <div class="controls">
                <?php echo $form->checkBox($model, 'agreement',array('checked'=>'checked')); ?>
                <p class="help-inline">同意注册协议</p>
            </div>
        </div>

        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn btn-success" onclick="register();return false;" id="submit_button" >立即注册</button>
            </div>
        </div>

    </fieldset>
    <?php $this->endWidget(); ?>


<script type="text/javascript">
    function register(){
        new ajaxForm('register_form',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '注册成功',callback:function(json){
                window.location.href='<?= $this->createUrl('site/index') ?>';
            }}).send();
    }
</script>