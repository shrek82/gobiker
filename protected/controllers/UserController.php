<?php

//用户控制器
class UserController extends MainController {

    /**
     * 显示登录页（此动作也具有双重功能，一是显示表单，二是接收用户数据）
     */
    public function actionLogin() {

       $logoForm = new LoginForm;

        // 搜集用户输入的数据
        if (isset($_POST['LoginForm'])) {
            $logoForm->attributes = $_POST['LoginForm'];
            //登录成功
            if ($logoForm->validate() && $logoForm->login()) {
                //全站使用同一的成功输出或跳转方法，方便ajax或普通方式提交
                $this->success(null, array('site/index'));
            }
            //输出错误，自动判断是什么方式请求
            else {
                $this->error($logoForm->getErrors());
            }
        }
        // 显示登录表单
        $this->render('login', array('model' => $logoForm));
    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionLogout() {
        Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);
    }

    //用户注册
    public function actionRegister() {
        $model = new RegisterForm;

        // 搜集用户输入的数据
        if (isset($_POST['RegisterForm'])) {
            $model->attributes = $_POST['RegisterForm'];
            //验证通过
            if ($model->validate()) {
                $user = new User;
                $user->attributes=$_POST['RegisterForm'];
                $user->password=  md5($user->attributes['password']);
                $user->reg_date=date('Y-m-d H:i:s');
                $user->login_date=date('Y-m-d H:i:s');
                unset($_POST['RegisterForm']['confirmPassword']);
                //用false取消验证。
                if ($user->save(false)) {
                    $this->success(array('id'=>$user->id),'恭喜您，感谢成功！',array('homepage'));
                    $this->refresh(); //当用户刷新时去掉提示，而不是重复提交。
                }
            }
            //输入和验证不正确
            else {
                $this->error($model->getErrors());
            }
        }
        $this->render('register', array('model' => $model));
    }

}
