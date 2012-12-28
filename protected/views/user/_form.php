<div class="form">

<?php $form=$this->beginWidget('CActiveForm', array(
	'id'=>'users-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="note">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<div class="row">
		<?php echo $form->labelEx($model,'username'); ?>
		<?php echo $form->textField($model,'username',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'username'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model,'password',array('size'=>50,'maxlength'=>50)); ?>
		<?php echo $form->error($model,'password'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'email'); ?>
		<?php echo $form->textField($model,'email',array('size'=>60,'maxlength'=>60)); ?>
		<?php echo $form->error($model,'email'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'reg_date'); ?>
		<?php echo $form->textField($model,'reg_date'); ?>
		<?php echo $form->error($model,'reg_date'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'login_date'); ?>
		<?php echo $form->textField($model,'login_date'); ?>
		<?php echo $form->error($model,'login_date'); ?>
	</div>

	<div class="row">
		<?php echo $form->labelEx($model,'avatar_path'); ?>
		<?php echo $form->textField($model,'avatar_path',array('size'=>60,'maxlength'=>150)); ?>
		<?php echo $form->error($model,'avatar_path'); ?>
	</div>

	<div class="row buttons">
		<?php echo CHtml::submitButton($model->isNewRecord ? 'Create' : 'Save'); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- form -->