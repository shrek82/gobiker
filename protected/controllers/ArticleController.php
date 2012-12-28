<?php

class ArticleController extends MainController {

    public function actionIndex() {
        $this->layout=false;
        echo '1';
        $dataProvider = new CActiveDataProvider('Routes');
        $this->render('index', array(
            'dataProvider' => $dataProvider,
        ));
    }

}

?>
