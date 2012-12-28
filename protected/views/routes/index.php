<div style="text-align: right; margin: 10px; padding: 0px 20px"><a href="<?=$this->createUrl('activitie/post')?>" class="btn btn-success">+发起活动</a></div>
<div id="routes_list">
<?php if (count($records) > 0): ?>
    <?php foreach ($records AS $key => $r): ?>
        <div class="<?= $key % 2 == 0 ? 'even' : 'odd'; ?>" id="record_<?= $r['id'] ?>">
            <h1><a href="<?= $this->createUrl('routes/view',array('id'=>$r['id'])) ?>"><?=$r['title']?></a></h1>
            <div><?=$r['intro']?></div>
        </div>
    <?php endforeach; ?>
<?php else: ?>
    <div class="nodata">暂时还没有任何内容</div>
<?php endif; ?>
<div class="pages">
    <?php
    $this->widget('CLinkPager', array(
        'firstPageLabel' => '第一页',
        'lastPageLabel' => '最后一页',
        'prevPageLabel' => '上一页',
        'nextPageLabel' => '下一页',
        'pages' => $pages,
        'cssFile' => false,
    ))
    ?>
</div>
</div>