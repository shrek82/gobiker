<?php

//重写的CActiveForm的
class UshoCActiveForm extends CActiveForm {

    public static function validate($models, $attributes = null, $loadInput = true) {
        $result = array();
        if (!is_array($models))
            $models = array($models);
        foreach ($models as $model) {
            if ($loadInput && isset($_POST[get_class($model)]))
                $model->attributes = $_POST[get_class($model)];
            $model->validate($attributes);

            //自定义了一个错误标识符
            if(count($model->getErrors()>0))
                $result['status'] = 0;
            foreach ($model->getErrors() as $attribute => $errors)
                $result[CHtml::activeId($model, $attribute)] = $errors;
        }
        return function_exists('json_encode') ? json_encode($result) : CJSON::encode($result);
    }

}

?>
