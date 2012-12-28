<?php

/**
 * This is the model class for table "clubs".
 *
 * The followings are the available columns in table 'clubs':
 * @property string $id
 * @property string $name
 * @property string $create_date
 * @property integer $province_id
 * @property integer $city_id
 * @property integer $member_count
 */
class Club extends CActiveRecord {

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return Clubs the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return 'qx_club';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('name,province_id,intro', 'required'),
            array('member_count', 'numerical', 'integerOnly' => true),
            array('name', 'length', 'max' => 200),
            array('create_date', 'safe'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, name, create_date, province_id, city_id, member_count', 'safe', 'on' => 'search'),
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
            'name' => '俱乐部名称',
            'create_date' => '创建日期',
            'province_id' => '所在地区',
            'city_id' => '所在城市',
            'district_id'=>'所在区域',
            'member_count' => '成员总数',
            'logo_path'=>'Logo',
            'intro' => '描述',
        );
    }


}