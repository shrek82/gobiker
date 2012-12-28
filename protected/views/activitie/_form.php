<fieldset>
    <legend>发起活动</legend>

    <?php $form=$this->beginWidget('CActiveForm', array('id'=>'activitie_form','htmlOptions' => array('class' => 'form-horizontal'))); ?>


        <div class="control-group">
            <?php echo $form->labelEx($model,'club_id',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'club_id',array('class' => 'span4')); ?>
                 <p class="help-inline">选择发起的俱乐部</p>
             </div>
        </div>
    
        <div class="control-group">
            <?php echo $form->labelEx($model,'title',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'title',array('class' => 'span6')); ?>
                 <p class="help-inline">活动标题</p>
             </div>
        </div>


        <div class="control-group">
            <?php echo $form->labelEx($model,'address',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'address',array('class' => 'span4')); ?>
                 <p class="help-inline">填写出发地</p>
             </div>
        </div>




        <div class="control-group">
            <?php echo $form->labelEx($model,'tags',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'tags',array('class' => 'span4')); ?>
                 <p class="help-inline">活动标签</p>
             </div>
        </div>


        <div class="control-group">
            <?php echo $form->labelEx($model,'start_date',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'start_date',array('class' => 'span4')); ?>
                 <p class="help-inline">开始时间</p>
             </div>
        </div>


        <div class="control-group">
            <?php echo $form->labelEx($model,'finish_date',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'finish_date',array('class' => 'span4')); ?>
                 <p class="help-inline">大概结束时间</p>
             </div>
        </div>


        <div class="control-group">
            <?php echo $form->labelEx($model,'content',array('class' => 'control-label')); ?>
             <div class="controls">
                 <?php echo $form->textField($model,'content',array('class' => 'span4')); ?>
                 <p class="help-inline">活动详细介绍</p>
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
        new ajaxForm('activitie_form',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='Activitie/index';
            }}).send();
    }
</script>