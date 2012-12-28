<fieldset>
    <legend>Brand Form</legend>

    <?php $form=$this->beginWidget('CActiveForm', array('id'=>'brand__form_form','htmlOptions' => array('class' => 'form-horizontal'))); ?>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'is_fixed',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'is_fixed',array('class' => 'span4')); ?>
                 <p class="help-inline">is_fixed</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'order_num',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'order_num',array('class' => 'span4')); ?>
                 <p class="help-inline">order_num</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'hits',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'hits',array('class' => 'span4')); ?>
                 <p class="help-inline">hits</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'name',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'name',array('class' => 'span4')); ?>
                 <p class="help-inline">name</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'homepage',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'homepage',array('class' => 'span4')); ?>
                 <p class="help-inline">homepage</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'logo_path',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'logo_path',array('class' => 'span4')); ?>
                 <p class="help-inline">logo_path</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'remark',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'remark',array('class' => 'span4')); ?>
                 <p class="help-inline">remark</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'intro',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'intro',array('class' => 'span4')); ?>
                 <p class="help-inline">intro</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'create_date',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'create_date',array('class' => 'span4')); ?>
                 <p class="help-inline">create_date</p>
             </div>
        </div>

    
        <div class="control-group">
            <?php echo $form->labelEx($model,'content',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'content',array('class' => 'span4')); ?>
                 <p class="help-inline">content</p>
             </div>
        </div>

    
    <div class="control-group">
        <div class="controls">
            <button type="submit" class="btn btn-success" onclick="save();return false;" id="submit_button" >立即发布</button>
            &nbsp;<button type="button" class="btn" onclick="history.back();" >取消</button>
        </div>
    </div>

</fieldset>
<?php $this->endWidget(); ?>

<script type="text/javascript">
    function save(){
        new ajaxForm('brand__form_form',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='Brand/index';
            }}).send();
    }
</script>