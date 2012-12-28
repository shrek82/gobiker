<fieldset>
    <legend>创建俱乐部</legend>

    <?php $form = $this->beginWidget('CActiveForm', array('id' => 'club_form', 'htmlOptions' => array('class' => 'form-horizontal'))); ?>


    <div class="control-group">
        <?php echo $form->labelEx($model, 'province_id', array('class' => 'control-label')); ?>
        <div class="controls"><?= $model->province_id ?>
            <select name="Club[province_id]" id="Club_province_id" style="width: 80px" onchange='changeProvince(this.options[this.selectedIndex].value)'>
                <option>选择...</option>
                <?php foreach (Base::getProvinces() AS $p): ?>
                    <option value="<?= $p['serialId'] ?>" <?= $model->province_id == $p['serialId'] ? 'selected' : ''; ?>><?= $p['provinceName'] ?></option>
                <?php endforeach; ?>
            </select>
            <span id="city_box"></span>
            <span id="district_box"></span>
            <span id="select_loading"></span>
            <p class="help-inline">选择所在地区</p>
        </div>
    </div>

    <div class="control-group">
        <?php echo $form->labelEx($model, 'name', array('class' => 'control-label')); ?>
        <div class="controls">
            <?php echo $form->textField($model, 'name', array('class' => 'span5')); ?>
            <p class="help-inline">如 浩瀚俱乐部</p>
        </div>
    </div>

    <div class="control-group">
        <?php echo $form->labelEx($model, 'intro', array('class' => 'control-label')); ?>
        <div class="controls">
            <?php echo $form->textArea($model, 'intro', array('class' => 'span6', 'style' => 'height:80px')); ?>
            <p class="help-inline"></p>
        </div>
    </div>

    <div class="control-group">
        <div class="controls">
            <button type="submit" class="btn btn-success" onclick="save();return false;" id="submit_button" >立即创建</button>
            &nbsp;<button type="button" class="btn" onclick="history.back();" >取消</button>
        </div>
    </div>

</fieldset>
<?php $this->endWidget(); ?>

<script type="text/javascript">
    function save(){
        new ajaxForm('club_form',{data_type:'json',textSending: '发送中',textError: '重试',textSuccess: '发送成功',callback:function(json){
                window.location.href='<?= $this->createUrl('club/index') ?>';
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