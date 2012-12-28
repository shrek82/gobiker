<?php
//网站通用类
class MainController extends Controller{
    public function init() {
        //注册加载见太文件
        //Yii::app()->clientScript->registerCssFile(Yii::app()->baseUrl . '/css/my.css');
        $this->_cs->registerCssFile(Yii::app()->theme->baseUrl.'/bootstrap/css/bootstrap.css');
        $this->_cs->registerCssFile(Yii::app()->theme->baseUrl.'/css/main.css');
        $this->_cs->registerScriptFile('/static/js/jquery-1.7.1.min.js');
        $this->_cs->registerScriptFile('/static/js/jquery.form.js');
        $this->_cs->registerScriptFile('/static/js/global.js');
        $this->_cs->registerScriptFile('/static/bootstrap/js/bootstrap-dropdown.js');
        //注册代码
        //$this->_cs->registerScript('f1','var chart=123;');
    }
}
?>
