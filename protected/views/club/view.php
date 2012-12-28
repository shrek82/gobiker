<button type="button" class="btn btn-success span2" onclick="join_club()" id="join_button">+加入俱乐部</button>

<?php
$this->breadcrumbs = array(
    'Club' => array('index'),
    $model->name,
);
?>

<?php
$this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        'name',
        'province_id',
        'city_id',
        'member_count',
        'create_date',
    ),
));
?>

<script type="text/javascript">
    function join_club() {
        var join_button=$('#join_button');
        new Request({
            url: '<?=$this->createUrl('club/join',array('id'=>$model->id))?>',
            method: 'post',
            onRequest:function(){
                join_button.attr('disabled',true).addClass('disabled').html('发送中...');
            },
            onSuccess:function(data){
                window.location.reload();
            },
            onError:function(){
            }
        }).send();
    }
</script>
