<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id), array('view', 'id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('title')); ?>:</b>
	<?php echo CHtml::encode($data->title); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('club_id')); ?>:</b>
	<?php echo CHtml::encode($data->club_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('user_id')); ?>:</b>
	<?php echo CHtml::encode($data->user_id); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('start_date')); ?>:</b>
	<?php echo CHtml::encode($data->start_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('finish_date')); ?>:</b>
	<?php echo CHtml::encode($data->finish_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('content')); ?>:</b>
	<?php echo CHtml::encode($data->content); ?>
	<br />

	<?php /*
	<b><?php echo CHtml::encode($data->getAttributeLabel('create_date')); ?>:</b>
	<?php echo CHtml::encode($data->create_date); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('address')); ?>:</b>
	<?php echo CHtml::encode($data->address); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('hits')); ?>:</b>
	<?php echo CHtml::encode($data->hits); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('comments_num')); ?>:</b>
	<?php echo CHtml::encode($data->comments_num); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('interested_num')); ?>:</b>
	<?php echo CHtml::encode($data->interested_num); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('tags')); ?>:</b>
	<?php echo CHtml::encode($data->tags); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_fixed')); ?>:</b>
	<?php echo CHtml::encode($data->is_fixed); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_closed')); ?>:</b>
	<?php echo CHtml::encode($data->is_closed); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_club_fixed')); ?>:</b>
	<?php echo CHtml::encode($data->is_club_fixed); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('is_recommended')); ?>:</b>
	<?php echo CHtml::encode($data->is_recommended); ?>
	<br />

	*/ ?>

</div>