<fieldset>
    <legend><?= $this->modelClass ?> Form</legend>

    <?php echo "<?php \$form=\$this->beginWidget('CActiveForm', array('id'=>'" . $this->class2id($this->modelClass) . '_' . basename($this->viewName) . "_form','htmlOptions' => array('class' => 'form-horizontal'))); ?>\n"; ?>

    <?php foreach ($this->getModelAttributes() as $attribute): ?>

        <div class="control-group">
            <?php echo "<?php echo \$form->labelEx(\$model,'$attribute',array('class' => 'control-label')); ?>\n"; ?>
             <div class="controls">
                 <?php echo "<?php echo \$form->textField(\$model,'$attribute',array('class' => 'span4')); ?>\n"; ?>
                 <p class="help-inline"><?=$attribute?></p>
             </div>
        </div>

    <?php endforeach; ?>

    <div class="control-group">
        <div class="controls">
            <button type="submit" class="btn btn-success" onclick="save();return false;" id="submit_button" >立即发布</button>
            &nbsp;<button type="button" class="btn" onclick="history.back();" >取消</button>
        </div>
    </div>

</fieldset>
<?php echo "<?php \$this->endWidget(); ?>\n"; ?>

<script type="text/javascript">
    function save(){
        new ajaxForm('<?= $this->class2id($this->modelClass) . '_' . basename($this->viewName) . '_form' ?>',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='<?= $this->modelClass . '/index' ?>';
            }}).send();
    }
</script>