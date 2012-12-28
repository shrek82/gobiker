<?php

//用户控制器
class UploadController extends MainController {

    public function init() {
        parent::init();
        $this->_cs->registerCssFile('/static/uploadify-v3.1/uploadify.css');
        $this->_cs->registerScriptFile('/static/uploadify-v3.1/jquery.uploadify-3.1.min.js');
    }

    //批量上传图片
    public function actionIndex() {
        $this->render('index', array());
    }

    //通过uploadify上传图片
    public function actionUploadify() {
        $upload = new Upload('file');
        $return = $upload->uploadImages();
        $json = array();
        if (!$return['error']) {
            $json['status'] = 1;
            $pic = new Pic();
            $pic->thumbnail_path = $return['file_path'];
            $pic->user_id = Yii::app()->user->id;
            $pic->create_date = date('Y-m-d H:i:s');
            if ($pic->save()) {
                $json['pic_id'] = $pic->id;
                $json['pic_path'] = $return['file_path'];
            }
        } else {
            $json['status'] = 0;
            $json['error'] = $return['error'];
        }
        echo json_encode($json);
    }

}