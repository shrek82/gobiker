<div class="span9 pull-left" >

    <!--轮播-->
    <div class="flash">
        <img src="/static/uploads/pics/201212/07/d7afc98e5f9c8d5b314a2f5ee89ee981.jpg" style="border-width: 0;vertical-align: middle">
    </div>

   <div class="box_title">
        <div class="box_title_name">精彩路线</div>
        <div class="box_title_tags"><span class="label label-success">龙井</span> <a href="d">拉练</a> <a href="d">休闲</a> <a href="d">爬坡</a> <a href="d">比赛</a></div>
        <div class="box_title_right btn-group">
            <button class="btn btn-small">排序</button>
            <button class="btn btn-small dropdown-toggle" data-toggle="dropdown">
                <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another</a></li>
                <li><a href="#">Something</a></li>
            </ul>
        </div>
    </div>
    <div id="record_list">
        <?php if (count($records) > 0): ?>
            <?php foreach ($records AS $key => $r): ?>
                <div class="<?= $key % 2 == 0 ? 'even' : 'odd'; ?>" id="record_<?= $r['id'] ?>">
                    <h1><a href="<?= $this->createUrl('routes/view', array('id' => $r['id'])) ?>"><?= $r['title'] ?></a></h1>
                    <div><?= $r['intro'] ?></div>
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

<div class="sidebar pull-right" >
    <button class="btn btn-success btn-large span3" onclick="window.location.href='<?=$this->createUrl('routes/post')?>'"><i class="icon-plus icon-white"></i> 分享路线</button>

</div>
