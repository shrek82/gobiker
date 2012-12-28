<?php
$this->breadcrumbs=array(
	'Activities'=>array('index'),
	'Manage',
);

$this->menu=array(
	array('label'=>'List Activities', 'url'=>array('index')),
	array('label'=>'Create Activities', 'url'=>array('create')),
);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('activities-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1>Manage Activities</h1>

<p>
You may optionally enter a comparison operator (<b>&lt;</b>, <b>&lt;=</b>, <b>&gt;</b>, <b>&gt;=</b>, <b>&lt;&gt;</b>
or <b>=</b>) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php echo CHtml::link('Advanced Search','#',array('class'=>'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search',array(
	'model'=>$model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id'=>'activities-grid',
	'dataProvider'=>$model->search(),
	'filter'=>$model,
	'columns'=>array(
		'id',
		'title',
		'club_id',
		'user_id',
		'start_date',
		'finish_date',
		/*
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
		*/
		array(
			'class'=>'CButtonColumn',
		),
	),
)); ?>
