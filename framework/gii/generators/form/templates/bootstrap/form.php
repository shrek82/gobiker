<fieldset>
    <legend>用户注册</legend>

    <div class="form">

        <?php echo "<?php \$form=\$this->beginWidget('CActiveForm', array(
	'id'=>'" . $this->class2id($this->modelClass) . '-' . basename($this->viewName) . "_form','htmlOptions' => array('class' => 'form-horizontal')
	'enableAjaxValidation'=>false,
)); ?>\n"; ?>

        <p class="note">Fields with <span class="required">*</span> are required.</p>

        <?php echo "<?php echo \$form->errorSummary(\$model); ?>\n"; ?>

        <?php foreach ($this->getModelAttributes() as $attribute): ?>
            <div class="row">
                <?php echo "<?php echo \$form->labelEx(\$model,'$attribute'); ?>\n"; ?>
                <?php echo "<?php echo \$form->textField(\$model,'$attribute'); ?>\n"; ?>
                <?php echo "<?php echo \$form->error(\$model,'$attribute'); ?>\n"; ?>
            </div>

        <?php endforeach; ?>

        <div class="row buttons">
            <?php echo "<?php echo CHtml::submitButton('Submit'); ?>\n"; ?>
        </div>

        <?php echo "<?php \$this->endWidget(); ?>\n"; ?>

    </div><!-- form -->

<script type="text/javascript">
    function save(){
        new ajaxForm('<?=$this->class2id($this->modelClass) . '-' . basename($this->viewName) . '_form'?>',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='<?= $this->createUrl($this->modelClass.'/index') ?>';
            }}).send();
    }
</script>