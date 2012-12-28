<?php

class ClubController extends MainController {


   //俱乐部首页
    public function actionIndex() {
        $condition['province_id'] = $this->getValue($_GET, 'province_id');
        $query = ClubQuery::getList($condition);
        $this->render('index', array(
            'records' => $query['records'],
            'pages' => $query['pages'],
        ));
    }

    //俱乐部详情页面
    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id),
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionCreate() {
        $model = new Club;

        if (isset($_POST['Club'])) {
            $model->attributes = $_POST['Club'];
            $model->create_date = date('Y-m-d H:i:s');
            $model->city_id = isset($_POST['city_id']) ? $_POST['city_id'] : null;
            if ($model->save()) {
                $this->success($model->id, array('view', 'id' => $model->id), '恭喜您，俱乐部创建成功!');
            }
            else{
                $this->error($model->getErrors());
            }
        }

        $this->render('create', array(
            'model' => $model,
        ));
    }

    /**
     * Updates a particular model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param integer $id the ID of the model to be updated
     */
    public function actionUpdate($id) {
        $model = $this->loadModel($id);

        // Uncomment the following line if AJAX validation is needed
        // $this->performAjaxValidation($model);

        if (isset($_POST['Clubs'])) {
            $model->attributes = $_POST['Clubs'];
            if ($model->save())
                $this->redirect(array('view', 'id' => $model->id));
        }

        $this->render('update', array(
            'model' => $model,
        ));
    }

    /**
     * Deletes a particular model.
     * If deletion is successful, the browser will be redirected to the 'admin' page.
     * @param integer $id the ID of the model to be deleted
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
     * Manages all models.
     */
    public function actionAdmin() {
        $model = new Clubs('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Clubs']))
            $model->attributes = $_GET['Clubs'];

        $this->render('admin', array(
            'model' => $model,
        ));
    }

    /**
     * Returns the data model based on the primary key given in the GET variable.
     * If the data model is not found, an HTTP exception will be raised.
     * @param integer the ID of the model to be loaded
     */
    public function loadModel($id) {
        $model = Club::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param CModel the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'clubs-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

    //加入俱乐部
    public function actionJoin(){

        $club_member=new ClubMember();

    }

}
