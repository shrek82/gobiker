<div class="title">内容标题</div>
<div class="grid-view">
<table id="viewTable" cellspacing="0" cellpadding="1" class="items">
        <thead>
                <th class="textcenter">序号</th>
                <th class="textcenter">姓名</th>
                <th class="textcenter">性别</th>
                <th class="textcenter">档案编号</th>
                <th class="textcenter">入学年份</th>
                <th class="textcenter">毕业年份</th>
                <th class="textcenter">专业</th>
                <th class="textcenter">更新日期</th>
                <th class="textcenter">编辑</th>
        </thead>
        <tbody>
        <?php foreach($alumnis AS $key=>$a):?>
        <tr class="<?=$key%2==0?'even':'odd';?>">
                <td class="textcenter"><?=$a['id']?></td>
                <td class="textcenter"><a href="/index.php?r=alumni/view&id=<?=$a['id']?>"><?=$a['name']?></a></td>
                <td class="textcenter"><?=$a['sex']?$a['sex']:'-';?></td>
                <td class="textcenter"><?=$a['file_no']?$a['file_no']:'-';?></td>
                <td class="textcenter"><?=$a['begin_year']?$a['begin_year']:'-';?></td>
                <td class="textcenter"><?=$a['graduation_year']?$a['graduation_year']:'-';?></td>
                <td ><?=$a['speciality']?$a['speciality']:'-';?></td>
                <td class="textcenter"><?=$a['update_date']?$a['update_date']:'-';?></td>
                <td class="textcenter"><a href="/index.php?r=alumni/update&id=<?=$a['id']?>" title="修改"><img src="/images/ico/edit_w16.png" /></a></td>
        </tr>
        <?php endforeach;?>
        </tbody>
</table>
</div>

<div class="pages">
<?php $this->widget('CLinkPager', array(
    'firstPageLabel'=>'第一页',
    'lastPageLabel'=>'最后一页',
    'prevPageLabel'=>'上一页',
    'nextPageLabel'=>'下一页',
    'pages' => $pages,
    'cssFile'=>false,
)) ?>
</div>