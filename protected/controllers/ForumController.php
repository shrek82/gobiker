<?php

//用户控制器
class ForumController extends MainController {

    public function init() {
        parent::init();
        $this->_cs->registerCssFile(Yii::app()->theme->baseUrl.'/css/forum.css');
    }

    //批量上传图片
    public function actionIndex() {
        $this->render('index', array());
    }
}