<?php

/**
 * This is the model class for table "qx_ads".
 *
 * The followings are the available columns in table 'qx_ads':
 * @property integer $id
 * @property string $title
 * @property string $img_path
 * @property string $start_date
 * @property string $end_date
 * @property integer $is_available
 * @property integer $type
 * @property string $targets
 * @property string $code
 */
class Ads extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Ads the static model class
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
		return 'qx_ads';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id, is_available, type', 'numerical', 'integerOnly'=>true),
			array('title', 'length', 'max'=>150),
			array('img_path', 'length', 'max'=>200),
			array('targets', 'length', 'max'=>50),
			array('start_date, end_date, code', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, title, img_path, start_date, end_date, is_available, type, targets, code', 'safe', 'on'=>'search'),
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
			'img_path' => 'Img Path',
			'start_date' => 'Start Date',
			'end_date' => 'End Date',
			'is_available' => 'Is Available',
			'type' => 'Type',
			'targets' => 'Targets',
			'code' => 'Code',
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
		$criteria->compare('img_path',$this->img_path,true);
		$criteria->compare('start_date',$this->start_date,true);
		$criteria->compare('end_date',$this->end_date,true);
		$criteria->compare('is_available',$this->is_available);
		$criteria->compare('type',$this->type);
		$criteria->compare('targets',$this->targets,true);
		$criteria->compare('code',$this->code,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}