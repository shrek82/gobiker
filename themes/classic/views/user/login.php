<?php $form = $this->beginWidget('CActiveForm', array('id' => 'login_form', 'htmlOptions' => array('class' => 'form-horizontal'))); ?>

<div class="control-group2">
    <?php echo $form->labelEx($model, 'account', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textField($model, 'account', array('class' => 'span4')); ?>
    </div>
</div>

<div class="control-group2">
    <?php echo $form->labelEx($model, 'password', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->passwordField($model, 'password', array('class' => 'span4')); ?>
    </div>
</div>

<div class="control-group2">

    <div class="controls">
        <?php echo $form->checkBox($model, 'rememberMe'); ?>
        <p class="help-inline"><label for="LoginForm_rememberMe">记住我</label></p>
    </div>
</div>
<div class="control-group2">
    <div class="controls">
        <button type="submit" class="btn btn-success" onclick="login();return false;" id="submit_button" >登录</button>
    </div>
</div>

<?php $this->endWidget(); ?>
