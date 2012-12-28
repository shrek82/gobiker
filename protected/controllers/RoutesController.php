<?php

//线路
class RoutesController extends MainController {

    public function filters() {
        return array(
            'accessControl', // perform access control for CRUD operations
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules() {
        return array(
            array('allow', // allow all users to perform 'index' and 'view' actions
                'actions' => array('index', 'view'),
                'users' => array('*'),
            ),
            array('allow', // allow authenticated user to perform 'create' and 'update' actions
                'actions' => array('post', 'update'),
                'users' => array('@'),
            ),
            array('allow', // allow admin user to perform 'admin' and 'delete' actions
                'actions' => array('admin', 'delete'),
                'users' => array('admin'),
            ),
            array('deny', // deny all users
                'users' => array('*'),
            ),
        );
    }

    /**
     * Lists all models.
     */
    public function actionIndex() {
//        $dataProvider = new CActiveDataProvider('Routes');
//        $this->render('index', array(
//            'dataProvider' => $dataProvider,
//        ));

        $condition['province_id'] = $this->getValue($_GET, 'province_id');
        $query = RoutesQuery::getList($condition);
        $this->render('index', array(
            'records' => $query['records'],
            'pages' => $query['pages'],
        ));
    }

    /**
     * Displays a particular model.
     * @param integer $id the ID of the model to be displayed
     */
    public function actionView($id) {
        $this->render('view', array(
            'model' => $this->loadModel($id),
        ));
    }

    /**
     * Creates a new model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     */
    public function actionPost() {
        $model = new Routes;

        if (isset($_POST['Routes'])) {
            $model->attributes = $_POST['Routes'];
            $model->city_id = $_POST['city_id'];
            $upload_pic_ids = array_filter(explode(',', $_POST['upload_pic_ids']));
            $upload_pic_paths = array_filter(explode(',', $_POST['upload_pic_paths']));
            $model->img_path = isset($upload_pic_paths[1]) ? $upload_pic_paths[1] : null;
            if ($model->save()) {
                if ($upload_pic_ids) {
                    Pic::updatePicsFrom($upload_pic_ids, array('routes_id' => $model->id));
                }
                $this->success($model->id, array('view', 'id' => $model->id), '路线分享成功，感谢您的分享！');
            } else {
                $this->error($model->getErrors());
            }
        }

        $this->render('post', array(
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

        if (isset($_POST['Routes'])) {
            $model->attributes = $_POST['Routes'];
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
        $model = new Routes('search');
        $model->unsetAttributes();  // clear any default values
        if (isset($_GET['Routes']))
            $model->attributes = $_GET['Routes'];

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
        $model = Routes::model()->findByPk($id);
        if ($model === null)
            throw new CHttpException(404, 'The requested page does not exist.');
        return $model;
    }

    /**
     * Performs the AJAX validation.
     * @param CModel the model to be validated
     */
    protected function performAjaxValidation($model) {
        if (isset($_POST['ajax']) && $_POST['ajax'] === 'activities-form') {
            echo CActiveForm::validate($model);
            Yii::app()->end();
        }
    }

}
