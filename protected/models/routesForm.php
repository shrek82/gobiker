<?php
/**
 * RoutesForm 类.
 * RoutesForm 是一直使用的数据结构（就是会在多个地方使用）
 * 用户登录的表单数据.它被用作'SiteController'控制器的'login' 动作
 */
class RoutesForm extends CFormModel {

    public $username;
    public $email;
    public $password;
    public $confirmPassword;
    public $agreement;

    /**
     * 声明验证规则
     * 此规则声明用户名和密码是必须的,
     * 并且密码需要被认证
     */
    public function rules() {//表单提交时执行此规则（非Ajax验证）
        return array(
            // username 和 password 是必须的
            array('username, email,password,confirmPassword', 'required'),
            //输入邮箱地址必须正确
            array('username,email', 'safe'),
            //email格式是必须是正确的
            array('email', 'email'),
            //同意注册协议
            array('agreement', 'boolean'),
            array('username','length','min'=>2,'max'=>16),
            array('password','length','min'=>4,'max'=>12),
            array('password', 'compare', 'compareAttribute' => 'confirmPassword'),
            array('email', 'availableAccount'),
            array('agreement', 'agreement'),
        );
    }

    /**
     * 定义属性标签
     */
    public function attributeLabels() {
        return array(
            'email' => '邮件',
            'username' => '大名',
            'password' => '密码',
            'confirmPassword' => '确认密码',
        );
    }

    /**
     * 用户email是否注册过
     * @返回是否登录成功的 boolean 值。
     */
    public function availableAccount() {
        $user = User::model()->find('email=?', array($this->email));
        if ($user) {
            $this->addError('email','该email地址已被注册，请换用其他邮箱！');
        } else {
            return true;
        }
    }

    //同意接受协议
    public function agreement(){
        if($this->agreement){
            return false;
        }
        else{
            $this->addError('agreement','同意注册协议才可以注册哦');
        }
    }

}
