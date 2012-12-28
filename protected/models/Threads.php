<?php

/**
 * This is the model class for table "qx_threads".
 *
 * The followings are the available columns in table 'qx_threads':
 * @property string $id
 * @property integer $fid
 * @property string $subject
 * @property string $author_id
 * @property string $author
 * @property string $lastpost_id
 * @property string $lastposter
 * @property integer $is_fixed
 * @property integer $is_club_fixed
 * @property integer $is_locked
 * @property integer $is_close
 * @property integer $hits
 * @property integer $replies
 * @property string $create_date
 * @property string $update_date
 * @property integer $state
 * @property string $content
 */
class Threads extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Threads the static model class
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
		return 'qx_threads';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id, fid, subject, author_id, author, create_date', 'required'),
			array('fid, is_fixed, is_club_fixed, is_locked, is_close, hits, replies, state', 'numerical', 'integerOnly'=>true),
			array('id, author_id, author, lastpost_id, lastposter', 'length', 'max'=>20),
			array('subject', 'length', 'max'=>150),
			array('update_date, content', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, fid, subject, author_id, author, lastpost_id, lastposter, is_fixed, is_club_fixed, is_locked, is_close, hits, replies, create_date, update_date, state, content', 'safe', 'on'=>'search'),
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
			'fid' => 'Fid',
			'subject' => 'Subject',
			'author_id' => 'Author',
			'author' => 'Author',
			'lastpost_id' => 'Lastpost',
			'lastposter' => 'Lastposter',
			'is_fixed' => 'Is Fixed',
			'is_club_fixed' => 'Is Club Fixed',
			'is_locked' => 'Is Locked',
			'is_close' => 'Is Close',
			'hits' => 'Hits',
			'replies' => 'Replies',
			'create_date' => 'Create Date',
			'update_date' => 'Update Date',
			'state' => 'State',
			'content' => 'Content',
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
		$criteria->compare('fid',$this->fid);
		$criteria->compare('subject',$this->subject,true);
		$criteria->compare('author_id',$this->author_id,true);
		$criteria->compare('author',$this->author,true);
		$criteria->compare('lastpost_id',$this->lastpost_id,true);
		$criteria->compare('lastposter',$this->lastposter,true);
		$criteria->compare('is_fixed',$this->is_fixed);
		$criteria->compare('is_club_fixed',$this->is_club_fixed);
		$criteria->compare('is_locked',$this->is_locked);
		$criteria->compare('is_close',$this->is_close);
		$criteria->compare('hits',$this->hits);
		$criteria->compare('replies',$this->replies);
		$criteria->compare('create_date',$this->create_date,true);
		$criteria->compare('update_date',$this->update_date,true);
		$criteria->compare('state',$this->state);
		$criteria->compare('content',$this->content,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}