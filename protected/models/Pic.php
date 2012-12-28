<?php

/**
 * This is the model class for table "qx_pic".
 *
 * The followings are the available columns in table 'qx_pic':
 * @property string $id
 * @property string $user_id
 * @property string $album_id
 * @property integer $routes_id
 * @property string $name
 * @property string $thumbnail_path
 * @property string $create_date
 */
class Pic extends CActiveRecord {

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return Pic the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return 'qx_pic';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('routes_id', 'numerical', 'integerOnly' => true),
            array('id, user_id, album_id', 'length', 'max' => 20),
            array('name', 'length', 'max' => 50),
            array('thumbnail_path', 'length', 'max' => 200),
            array('create_date', 'safe'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, user_id, album_id, routes_id, name, thumbnail_path, create_date', 'safe', 'on' => 'search'),
        );
    }

    /**
     * @return array relational rules.
     */
    public function relations() {
        // NOTE: you may need to adjust the relation name and the related
        // class name for the relations automatically generated below.
        return array(
        );
    }

    /**
     * @return array customized attribute labels (name=>label)
     */
    public function attributeLabels() {
        return array(
            'id' => 'ID',
            'user_id' => '用户',
            'album_id' => '所属相册',
            'routes_id' => '所属路线',
            'name' => '名称',
            'thumbnail_path' => '缩略图地址',
            'create_date' => '上传日期',
        );
    }

    /**
     * Retrieves a list of models based on the current search/filter conditions.
     * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
     */
    public function search() {
        // Warning: Please modify the following code to remove attributes that
        // should not be searched.

        $criteria = new CDbCriteria;

        $criteria->compare('id', $this->id, true);
        $criteria->compare('user_id', $this->user_id, true);
        $criteria->compare('album_id', $this->album_id, true);
        $criteria->compare('routes_id', $this->routes_id);
        $criteria->compare('name', $this->name, true);
        $criteria->compare('thumbnail_path', $this->thumbnail_path, true);
        $criteria->compare('create_date', $this->create_date, true);

        return new CActiveDataProvider($this, array(
                    'criteria' => $criteria,
                ));
    }

    //批量更新照片归属
    public static function updatePicsFrom($pic_ids, $update = array()) {
        $c = new CDbCriteria;
        $c->condition = 'id in(' . implode(',', $pic_ids) . ')';
        Pic::model()->updateAll($update, $c);
    }

}