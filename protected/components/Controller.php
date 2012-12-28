<?php

/**
  +-----------------------------------------------------------------
 *  总控制器的子类，本App所有控制器都继承该类
  +-----------------------------------------------------------------
 */
class Controller extends CController {

    //默认模板
    public $layout = '//layouts/column1';
    public $_isAjax = false;
    public $_uid;
    public $_cs;

    /**
      +-----------------------------------------------------------------
     * 构造函数
      +-----------------------------------------------------------------
     */
    public function __construct($id, $module = null) {

        parent::__construct($id, $module);

        $this->_uid=  Yii::app()->user->id;
        $this->_cs=  Yii::app()->getClientScript();

        //是否为ajax请求
        //return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH']==='XMLHttpRequest';
        if (Yii::app()->request->isAjaxRequest) {
            $this->_isAjax = true;
        }
    }

    //管理控制
    public function beforeAction($action) {
        parent::beforeAction($action);
        return true;
        if (strstr('delete', $action->id)) {

        }
        //$con_id=Yii::app()->controller->action->id;
        //$action_name=Yii::app()->controller->action->id;
    }

    /**
      +-----------------------------------------------------------------
     * 输出model错误
      +-----------------------------------------------------------------
     */
    public function error($data) {

        //ajax请求,输出json格式错误
        if ($this->_isAjax) {
            $json = array();
            $json['status'] = 0;
            $item = null;
            if (is_array($data)) {
                foreach ($data as $key => $value) {
                    $item = is_numeric($key) ? $key + 1 : $key;
                    $json[$item] = $value;
                }
            } else {
                $json['error'] = $data;
            }
            echo json_encode($json);
            Yii::app()->end();
        }

        //普通请求
        else {
            $error_str = '';
            if (is_array($data)) {
                foreach ($data as $value) {
                    if (is_array($value)) {
                        foreach ($value AS $v) {
                            $error_str.=$v . '<br>';
                        }
                    } else {
                        $error_str.=$value . '<br>';
                    }
                }
            } else {
                $error_str = $data;
            }
            //输出Flash错误
            Yii::app()->user->setFlash('error', $error_str);
        }
    }

    /**
      +-----------------------------------------------------------------
     * 输出操作成功返回信息
     * backdata:string OR array
     * ajax暂时不输出flash提示
      +-----------------------------------------------------------------
     */
    public function success($backdata = null, $redirect = array(), $message = null) {
        //ajax请求，输出json数据
        if ($this->_isAjax) {
            $json = array();
            $json['status'] = 1;
            if (is_numeric($backdata)) {
                $json['id'] = $backdata;
            } elseif (is_array($backdata)) {
                foreach ($backdata as $key => $value) {
                    $json[$key] = $value;
                }
            } else {
                $json[0] = $backdata;
            }
            echo json_encode($json);
            Yii::app()->end();
        }

        //普通方式提交
        else {
            //增加Flash提示
            if ($message) {
                Yii::app()->user->setFlash('success', $message);
            }
            //增加跳转
            if ($redirect AND is_array($redirect)) {
                $this->redirect($redirect);
            }
        }
    }

    //获取cookie
    public function getCookie($name) {
        $cookie = Yii::app()->request->getCookies();
        return $cookie[$name]->value;
    }

    //设置cookie
    public function setCookie($name, $value, $exp = null) {
        $cookie = new CHttpCookie($name, $value);
        $cookie->expire = $exp ? $exp : time() + 3600 * 24 * 30;
        Yii::app()->request->cookies[$name] = $cookie;
    }

    //删除cookie
    public function delCookie($name) {
        $cookie = Yii::app()->request->getCookies();
        unset($cookie[$name]);
    }

    //获取GET值
    public function getValue($array,$key,$defalut=null) {
        if(isset($array[$key])){
            return trim($array[$key]);
        }
        else{
            return $defalut;
        }
    }

}