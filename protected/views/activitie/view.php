<?php
$this->breadcrumbs=array(
	'Activities'=>array('index'),
	$model->title,
);

$this->menu=array(
	array('label'=>'List Activities', 'url'=>array('index')),
	array('label'=>'Create Activities', 'url'=>array('create')),
	array('label'=>'Update Activities', 'url'=>array('update', 'id'=>$model->id)),
	array('label'=>'Delete Activities', 'url'=>'#', 'linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Activities', 'url'=>array('admin')),
);
?>

<h1>View Activities #<?php echo $model->id; ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'title',
		'club_id',
		'user_id',
		'start_date',
		'finish_date',
		'content',
		'create_date',
		'address',
		'hits',
		'comments_num',
		'interested_num',
		'tags',
		'is_fixed',
		'is_closed',
		'is_club_fixed',
		'is_recommended',
	),
)); ?>
