<?php

/**
 * This is the model class for table "qx_forum".
 *
 * The followings are the available columns in table 'qx_forum':
 * @property string $id
 * @property string $name
 * @property string $club_id
 * @property integer $order_num
 * @property string $description
 * @property integer $threads_num
 * @property string $icon_path
 */
class Forum extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Forum the static model class
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
		return 'qx_forum';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('order_num, threads_num', 'numerical', 'integerOnly'=>true),
			array('name, description', 'length', 'max'=>255),
			array('club_id', 'length', 'max'=>20),
			array('icon_path', 'length', 'max'=>200),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, club_id, order_num, description, threads_num, icon_path', 'safe', 'on'=>'search'),
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
			'club_id' => 'Club',
			'order_num' => 'Order Num',
			'description' => 'Description',
			'threads_num' => 'Threads Num',
			'icon_path' => 'Icon Path',
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

		$criteria->compare('id',$this->id,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('club_id',$this->club_id,true);
		$criteria->compare('order_num',$this->order_num);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('threads_num',$this->threads_num);
		$criteria->compare('icon_path',$this->icon_path,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}