<?php

//活动
class ActivitieController extends Controller {

    /**
     * 活动首页
     */
    public function actionIndex() {
	$criteria = new CDbCriteria();
	$count = Activitie::model()->count($criteria);
	$pages = new CPagination($count);
	$pages->pageSize = 15;
	$pages->applyLimit($criteria);
	$records = Activitie::model()
		->findAll($criteria);

	$this->render('index', array(
	    'records' => $records, 'pages' => $pages
	));
    }

    /**
     * 活动详细页面
     */
    public function actionView($id) {
	$this->render('view', array(
	    'model' => $this->loadModel($id),
	));
    }

    /**
     * 发布一个活动
     */
    public function actionPost() {
	$model = new Activitie;

	// Uncomment the following line if AJAX validation is needed
	// $this->performAjaxValidation($model);

	if (isset($_POST['Activitie'])) {
	    $model->attributes = $_POST['Activitie'];
	    if ($model->save())
		$this->redirect(array('view', 'id' => $model->id));
	}

	$this->render('create', array(
	    'model' => $model,
	));
    }

    /**
     * 修改活动
     *
     * @返回
     */
    public function actionUpdate($id) {
	$model = $this->loadModel($id);

	// Uncomment the following line if AJAX validation is needed
	// $this->performAjaxValidation($model);

	if (isset($_POST['Activitie'])) {
	    $model->attributes = $_POST['Activitie'];
	    if ($model->save())
		$this->redirect(array('view', 'id' => $model->id));
	}

	$this->render('update', array(
	    'model' => $model,
	));
    }

    /**
     * 删除活动
     */
    public function actionDelete($id) {
	if (Yii::app()->request->isPostRequest) {
	    // we only allow deletion via POST request
	    $this->loadModel($id)->delete();

	    // if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
	    if (!isset($_GET['ajax']))
		$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}
	else
	    throw new CHttpException(400, 'Invalid request. Please do not repeat this request again.');
    }

    /**
     * 载入活动模型
     */
    public function loadModel($id) {
	$model = Activitie::model()->findByPk($id);
	if ($model === null)
	    throw new CHttpException(404, 'The requested page does not exist.');
	return $model;
    }

}
