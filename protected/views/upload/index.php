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
                'fileObjName' : 'file',
                'uploader': '<?= $this->createUrl('upload/uploadify') ?>',
                'formData': {'policy': '<?=$youpai['policy']?>','signature':'<?=$youpai['signature']?>'},
                //当每一个文件上传成功时触发
                'onUploadSuccess' : function(file, data, response) {
                    if(data){
                        var json = eval("(" + data + ")");
                        if(json.status==1){
                            pic_ids.val(pic_ids.val()+','+json['pic_path']);
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
