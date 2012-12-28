<?php

/**
 * LoginForm 类.
 * LoginForm 是一直使用的数据结构（就是会在多个地方使用）
 * 用户登录的表单数据.它被用作'SiteController'控制器的'login' 动作
 */
class LoginForm extends CFormModel {

    public $account;
    public $password;
    public $rememberMe;
    private $_identity;

    /**
     * 声明验证规则
     * 此规则声明用户名和密码是必须的,
     * 并且密码需要被认证
     */
    public function rules() {//表单提交时执行此规则（非Ajax验证）
        return array(
            // account 和 password 是必须的
            array('account, password', 'required'),
            array('account', 'email'),
            // rememberMe 是 boolean类型
            array('rememberMe', 'boolean'),
            // password 需要认证
            array('password', 'authenticate'),
        );
    }

    /**
     * 定义属性标签
     */
    public function attributeLabels() {
        return array(
            'account'=>'帐号',
            'password'=>'密码',
            'rememberMe' => '下次记住我',
        );
    }

    /**
     * 认证密码 password.
     * 这是在rules()中定义的验证程序authenticate，这里的authenticate调用UserIdentity里面的authenticate函数。
     */
    public function authenticate($attribute, $params) {//这两个参数在这里没用
        $this->_identity = new UserIdentity($this->account, $this->password);
        $this->_identity->authenticate();
    }

    /**
     * 用户使用模型中给定的用户名和密码登录
     * @返回是否登录成功的 boolean 值。
     */
    public function login() {
        //如果没有启用验证规则（也就是SiteController.php下面的actionlogin()动作下面的$model->validate()），则在这里要进行验证。
        if ($this->_identity === null) {
            $this->_identity = new UserIdentity($this->account, $this->password);
            $this->_identity->authenticate();
        }
        if ($this->_identity->errorCode === UserIdentity::ERROR_NONE) {
            $duration = $this->rememberMe ? 3600 * 24 * 30 : 0; // 30 天
            //此处是登录一个用户，具体可参考：sysytem.web.auth->CWebUser->login()方法。
            Yii::app()->user->login($this->_identity, $duration);
            return true;
        }
        elseif($this->_identity->errorCode === UserIdentity::ERROR_USERNAME_INVALID){
            $this->addError('account', '很抱歉，用户不存在，请检查后重试！');
            return false;
        }
        elseif($this->_identity->errorCode === UserIdentity::ERROR_PASSWORD_INVALID){
            $this->addError('password', '很抱歉，密码错误，请重新输入！');
            return false;
        }
        else{
            $this->addError('account', '很抱歉，用户名或密码不正确，请重新输入!');
            return false;
        }

    }

}
