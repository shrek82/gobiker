<?php

/**
 * This is the model class for table "qx_recommended".
 *
 * The followings are the available columns in table 'qx_recommended':
 * @property integer $id
 * @property string $title
 * @property integer $categroy_id
 * @property string $img_path
 * @property string $redirect
 * @property string $described
 * @property integer $order_num
 * @property string $remark
 * @property string $create_date
 * @property string $update_date
 */
class Recommended extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Recommended the static model class
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
		return 'qx_recommended';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('categroy_id, order_num', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>150),
			array('img_path, redirect', 'length', 'max'=>250),
			array('described, remark', 'length', 'max'=>255),
			array('create_date, update_date', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, title, categroy_id, img_path, redirect, described, order_num, remark, create_date, update_date', 'safe', 'on'=>'search'),
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
			'title' => 'Title',
			'categroy_id' => 'Categroy',
			'img_path' => 'Img Path',
			'redirect' => 'Redirect',
			'described' => 'Described',
			'order_num' => 'Order Num',
			'remark' => 'Remark',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
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
		$criteria->compare('title',$this->title,true);
		$criteria->compare('categroy_id',$this->categroy_id);
		$criteria->compare('img_path',$this->img_path,true);
		$criteria->compare('redirect',$this->redirect,true);
		$criteria->compare('described',$this->described,true);
		$criteria->compare('order_num',$this->order_num);
		$criteria->compare('remark',$this->remark,true);
		$criteria->compare('create_date',$this->create_date,true);
		$criteria->compare('update_date',$this->update_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}