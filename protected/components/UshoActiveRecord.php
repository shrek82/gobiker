<?php

// protected/components/UshoActiveRecord.php

class UshoActiveRecord extends CActiveRecord {

    public function getDbConnection() {

    }

    //设置cookie
    public function setCookie($name, $value, $exp = null) {
        $cookie = new CHttpCookie($name, $value);
        $cookie->expire = $exp ? $exp : time() + 3600 * 24 * 30;
        Yii::app()->request->cookies[$name] = $cookie;
    }

    //获取cookie
    public function getCookie($name) {
        $cookie = Yii::app()->request->getCookies();
        return $cookie[$name]->value;
    }

}