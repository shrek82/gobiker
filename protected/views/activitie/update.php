<?php
$this->breadcrumbs=array(
	'Activities'=>array('index'),
	$model->title=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Activities', 'url'=>array('index')),
	array('label'=>'Create Activities', 'url'=>array('create')),
	array('label'=>'View Activities', 'url'=>array('view', 'id'=>$model->id)),
	array('label'=>'Manage Activities', 'url'=>array('admin')),
);
?>

<h1>Update Activities <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>