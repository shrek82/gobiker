    <?php
    $this->pageTitle = Yii::app()->name . ' - 用户登录';
    $this->breadcrumbs = array('用户登录');
    ?>

    <?php $form = $this->beginWidget('CActiveForm', array('id' => 'login_form', 'htmlOptions' => array('class' => 'form-horizontal'))); ?>
    <fieldset>
	<legend>用户登陆</legend>
        <div class="control-group">
	    <?php echo $form->labelEx($model, 'account', array('class' => 'control-label')); ?>
            <div class="controls">
		<?php echo $form->textField($model, 'account', array('class' => 'span4')); ?>
            </div>
        </div>

        <div class="control-group">
	    <?php echo $form->labelEx($model, 'password', array('class' => 'control-label')); ?>
            <div class="controls">
		<?php echo $form->passwordField($model, 'password', array('class' => 'span4')); ?>
            </div>
        </div>

	        <div class="control-group">

            <div class="controls">
		<?php echo $form->checkBox($model, 'rememberMe'); ?>
                <p class="help-inline"><label for="LoginForm_rememberMe">记住我</label></p>
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
               <button type="submit" class="btn btn-success" onclick="login();return false;" id="submit_button" >登录</button>
            </div>
        </div>
    </fieldset>

    <?php $this->endWidget(); ?>


    <script type="text/javascript">
	function login(){
	    new ajaxForm('login_form',{data_type:'json',textSending: '登录中',textError: '重试',textSuccess: '登录成功',callback:function(json){
		    window.location.href='<?= $this->createUrl('site/index') ?>';
		}}).send();
	}
    </script>