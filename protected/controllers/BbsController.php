<?php

class BbsController extends MainController {

    public function actionIndex() {
        $dataProvider = new CActiveDataProvider('Routes');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

}

?>
