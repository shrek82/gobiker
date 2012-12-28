<div class="box_title">
    <div class="box_title_name">分享路线</div>
</div>
<br>

<?php $form = $this->beginWidget('CActiveForm', array('id' => 'routes_form', 'htmlOptions' => array('class' => 'form-horizontal'))); ?>
<div class="control-group">
    <?php echo $form->labelEx($model, 'province_id', array('class' => 'control-label')); ?>
    <div class="controls">
        <select name="Routes[province_id]" id="Routes_province_id" style="width: 80px" onchange='changeProvince(this.options[this.selectedIndex].value)'>
            <option>选择...</option>
            <?php foreach (Base::getProvinces() AS $p): ?>
                <option value="<?= $p['province_id'] ?>" <?= $model->province_id == $p['province_id'] ? 'selected' : ''; ?>><?= $p['name'] ?></option>
            <?php endforeach; ?>
        </select>
        <span id="city_box"></span>
        <span id="district_box"></span>
        <span id="select_loading"></span>
        <p class="help-inline">例如 浙江 杭州 西湖区</p>
    </div>
</div>

<div class="control-group">
    <?php echo $form->labelEx($model, 'category_id', array('class' => 'control-label')); ?>
    <div class="controls">
        <select name="Routes[category_id]" id="Routes_category_id">
            <option>选择...</option>
            <?php foreach ($model->categorys() AS $key => $i): ?>
                <option value="<?= $key ?>" <?= $model->category_id == $key ? 'selected' : ''; ?>><?= $i ?></option>
            <?php endforeach; ?>
        </select>
        <p class="help-inline">选择路线分类</p>
    </div>
</div>

<div class="control-group">
    <?php echo $form->labelEx($model, 'title', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textField($model, 'title', array('class' => 'span6')); ?>
        <p class="help-inline">例如 杭州市区到千岛湖</p>
    </div>
</div>



<div class="control-group">
    <?php echo $form->labelEx($model, 'destination', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textField($model, 'destination', array('class' => 'span4')); ?>
        <p class="help-inline">例如 千岛湖风景区</p>
    </div>
</div>


<div class="control-group">
    <?php echo $form->labelEx($model, 'starting', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textField($model, 'starting', array('class' => 'span4')); ?>
        <p class="help-inline">例如 文儿西路古墩路口</p>
    </div>
</div>

<div class="control-group">
    <?php echo $form->labelEx($model, 'tags', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textField($model, 'tags', array('class' => 'span4')); ?>
        <p class="help-inline">例如 户外 野外 小清新</p>
    </div>
</div>

<div class="control-group">
    <?php echo $form->labelEx($model, 'content', array('class' => 'control-label')); ?>
    <div class="controls">
        <?php echo $form->textArea($model, 'content', array('class' => 'span6', 'style' => 'height:80px')); ?>
        <p class="help-inline"></p>
    </div>
</div>

<div class="control-group">
    <label class="control-label" for="Routes_img_path"></label>
    <div class="controls">
        <input name="Routes[img_path]" id="file_upload" type="file"  />
        <p class="help-inline"></p>
    </div>
</div>

<div id="upload_pics_box" class="control-group">
<div class="clear"></div>
</div>

<div class="control-group">
    <div class="controls">
        <button type="submit" class="btn btn-success" onclick="save();return false;" id="submit_button" >立即发布</button>
        &nbsp;<button type="button" class="btn" onclick="history.back();" >取消</button>
    </div>
</div>

<input type="hidden" class="span12" id="upload_pic_paths" name="upload_pic_paths">
<input type="hidden" class="span12" id="upload_pic_ids" name="upload_pic_ids">

<?php $this->endWidget(); ?>

<script type="text/javascript">
    var pic_ids=$('#upload_pic_ids');
    var pic_paths=$('#upload_pic_paths');
    var upload_pics_box=$('#upload_pics_box');
    $(document).ready(function() {
        $(function() {
            $("#file_upload").uploadify({
                'auto'     : true,
                'fileTypeExts' : '*.gif; *.jpg; *.png',
                'removeCompleted' : true,
                'fileSizeLimit' : '3MB',
                'width'    : 150,
                'queueSizeLimit':50,
                'uploadLimit' : 50,
                'method'   : 'post',
                'multi'    : true,
                'removeTimeout':0.5,
                'successTimeout' :30,
                'fileObjName':'',
                'buttonText' : '添加照片...',
                'swf'           : '/static/uploadify-v3.1/uploadify.swf',
                'uploader'      : '<?= $this->createUrl('upload/uploadify') ?>',
                //当每一个文件上传成功时触发
                'onUploadSuccess' : function(file, data, response) {
                    if(data){
                        var json = eval("(" + data + ")");
                        if(json.status==1){
                            pic_ids.val(pic_ids.val()+','+json['pic_id']);
                            pic_paths.val(pic_paths.val()+','+json['pic_path']);
                           upload_pics_box.append('<div style="width:100px;float:left;margin:5px"><img src="'+json['pic_path']+'"><div>');
                        }
                        else{
                            alert('很抱歉，照片上传失败，原因：\n\n'+json.error);
                        }
                    }
                },
                //队列完成时触发
                'onQueueComplete' : function(queueData) {
                }
            });
        });
    });

</script>

<script type="text/javascript">
    function save(){
        new ajaxForm('routes_form',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='<?= $this->createUrl('routes/index') ?>';
            }}).send();
    }

    //切换地区下拉菜单
    function changeProvince(pro_id){
        new Request({
            url: '<?= $this->createUrl('base/cityselect') ?>',
            method: 'get',
            data: 'pro_id='+pro_id,
            onRequest:function(){
                $('#select_loading').html('<img src="/static/images/loading.gif">');
            },
            onSuccess:function(data){
                $('#city_box').html(data);
                $('#district_box').html('');
                $('#select_loading').html('');
            }
        }).send();
    }

    function changeCity(city_id){
        new Request({
            url: '<?= $this->createUrl('base/districtselect') ?>',
            method: 'get',
            data: 'city_id='+city_id,
            onRequest:function(){
                $('#select_loading').html('<img src="/static/images/loading.gif">');
            },
            onSuccess:function(data){
                $('#district_box').html(data);
                $('#select_loading').html('');
            }
        }).send();
    }
</script>
