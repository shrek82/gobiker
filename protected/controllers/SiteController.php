<?php
//网站首页
class SiteController extends MainController {

    public function init() {
        parent::init();
        $this->_cs->registerCssFile(Yii::app()->theme->baseUrl.'/css/index.css');
    }

    /**
     * This is the default 'index' action that is invoked
     * when an action is not explicitly requested by users.
     */
    public function actionIndex() {
        // renders the view file 'protected/views/site/index.php'
        // using the default layout 'protected/views/layouts/main.php'
        $this->render('index');
    }

    /**
     * This is the action to handle external exceptions.
     */
    public function actionError() {
        if ($error = Yii::app()->errorHandler->error) {
            if (Yii::app()->request->isAjaxRequest)
                echo $error['message'];
            else
                $this->render('error', $error);
        }
    }

    /**
     * Displays the contact page
     */
    public function actionContact() {
        $model = new ContactForm;
        if (isset($_POST['ContactForm'])) {
            $model->attributes = $_POST['ContactForm'];
            if ($model->validate()) {
                $headers = "From: {$model->email}\r\nReply-To: {$model->email}";
                mail(Yii::app()->params['adminEmail'], $model->subject, $model->body, $headers);
                Yii::app()->user->setFlash('contact', 'Thank you for contacting us. We will respond to you as soon as possible.');
                $this->refresh();
            }
        }
        $this->render('contact', array('model' => $model));
    }

    /**
     * 显示登录页（此动作也具有双重功能，一是显示表单，二是接收用户数据）
     */
    public function actionLogin() {

        $model = new LoginForm;

        // 搜集用户输入的数据
        if (isset($_POST['LoginForm'])) {
            $model->attributes = $_POST['LoginForm'];
            //登录成功
            if ($model->validate() && $model->login()) {
                //全站使用同一的成功输出或跳转方法，方便ajax或普通方式提交
                $this->success(null, array('admin/index'));
            }
            //输出错误，自动判断是什么方式请求
            else {
                $this->error($model->getErrors());
            }
        }
        // 显示登录表单
        $this->render('login', array('model' => $model));
    }

    /**
     * Logs out the current user and redirect to homepage.
     */
    public function actionLogout() {
        Yii::app()->user->logout();
        $this->redirect(Yii::app()->homeUrl);
    }

}