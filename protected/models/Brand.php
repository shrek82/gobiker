<?php

/**
 * This is the model class for table "qx_brand".
 *
 * The followings are the available columns in table 'qx_brand':
 * @property integer $id
 * @property string $name
 * @property string $homepage
 * @property string $logo_path
 * @property string $create_date
 * @property integer $is_fixed
 * @property integer $order_num
 * @property string $remark
 * @property string $intro
 * @property string $content
 * @property integer $hits
 */
class Brand extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Brand the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'qx_brand';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('is_fixed, order_num, hits', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>150),
			array('homepage, logo_path, remark, intro', 'length', 'max'=>255),
			array('create_date, content', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, homepage, logo_path, create_date, is_fixed, order_num, remark, intro, content, hits', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'homepage' => 'Homepage',
			'logo_path' => 'Logo Path',
			'create_date' => 'Create Date',
			'is_fixed' => 'Is Fixed',
			'order_num' => 'Order Num',
			'remark' => 'Remark',
			'intro' => 'Intro',
			'content' => 'Content',
			'hits' => 'Hits',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('homepage',$this->homepage,true);
		$criteria->compare('logo_path',$this->logo_path,true);
		$criteria->compare('create_date',$this->create_date,true);
		$criteria->compare('is_fixed',$this->is_fixed);
		$criteria->compare('order_num',$this->order_num);
		$criteria->compare('remark',$this->remark,true);
		$criteria->compare('intro',$this->intro,true);
		$criteria->compare('content',$this->content,true);
		$criteria->compare('hits',$this->hits);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}