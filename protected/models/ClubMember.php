<?php

/**
 * This is the model class for table "qx_club_member".
 *
 * The followings are the available columns in table 'qx_club_member':
 * @property string $id
 * @property string $club_id
 * @property string $title
 * @property integer $is_chairman
 * @property integer $is_manager
 * @property string $user_id
 * @property string $join_date
 * @property string $visit_date
 */
class ClubMember extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return ClubMember the static model class
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
		return 'qx_club_member';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('is_chairman, is_manager', 'numerical', 'integerOnly'=>true),
			array('id, club_id, user_id', 'length', 'max'=>20),
			array('title', 'length', 'max'=>50),
			array('join_date, visit_date', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, club_id, title, is_chairman, is_manager, user_id, join_date, visit_date', 'safe', 'on'=>'search'),
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
			'club_id' => '俱乐部',
			'title' => '头衔',
			'is_chairman' => '创始人',
			'is_manager' => '管理员',
			'user_id' => '用户',
			'join_date' => '加入时间',
			'visit_date' => '访问时间',
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
		$criteria->compare('club_id',$this->club_id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('is_chairman',$this->is_chairman);
		$criteria->compare('is_manager',$this->is_manager);
		$criteria->compare('user_id',$this->user_id,true);
		$criteria->compare('join_date',$this->join_date,true);
		$criteria->compare('visit_date',$this->visit_date,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}