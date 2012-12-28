<?php

//网站基本信息查询
class Base extends CActiveRecord {

    //现实省份下拉菜单
    public static function getProvinces() {
        $provinces = Yii::app()->db->createCommand()
                ->select('*')
                ->from('qx_province')
                ->order('province_id ASC')
                ->queryAll();
        return $provinces;
    }

}

?>
