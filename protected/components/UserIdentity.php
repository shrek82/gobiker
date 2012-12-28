<?php

/**
 * UserIdentity 用来验证一个用户.
 * 它包含已提供的数据能否验证用户的方法。
 */
class UserIdentity extends CUserIdentity {

    //自定义一个返回成员变量id
    private $_id;

    //添加一个登录帐号成员
    private $account;

    //重新定义构造函数，以使用account来登录
    public function __construct($account, $password) {
        parent::__construct($account, $password);
        $this->username='游客';
        $this->account = $account;
        $this->password = $password;

    }

    /**
     * 认证一个用户.
     * @如果验证成功返回一个布尔值。
     */
    public function authenticate() {

        //查找数据库记录
        $user = User::model()->find('email=?', array($this->account));

        //查无数据库记录
        if ($user === null) {
            $this->errorCode = self::ERROR_USERNAME_INVALID;
        }
        //调用user模型验证密码
        else if (!$user->validatePassword($this->password)) {
            $this->errorCode = self::ERROR_PASSWORD_INVALID;
        }
        //登录成功
        else {
            $this->_id = $user->id;
            $this->username = $user->username;
            $this->errorCode = self::ERROR_NONE;
        }

        //返回true或false
        return $this->errorCode == self::ERROR_NONE;
    }

    /**
     * @返回当前用户记录的ID（整数类型）
     */
    public function getId() {
        return $this->_id;
    }

}