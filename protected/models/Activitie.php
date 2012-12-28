<?php

/**
 * This is the model class for table "zy_activities".
 *
 * The followings are the available columns in table 'zy_activities':
 * @property string $id
 * @property string $title
 * @property string $start_date
 * @property string $finish_date
 * @property string $content
 * @property string $address
 * @property string $club_id
 * @property string $user_id
 * @property string $create_date
 * @property integer $comments_num
 * @property integer $hits
 * @property integer $is_fixed
 * @property string $tags
 */
class Activitie extends CActiveRecord {

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return Activities the static model class
     */
    public static function model($className = __CLASS__) {
	return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
	return 'qx_activitie';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
	// NOTE: you should only define rules for those attributes that
	// will receive user inputs.
	return array(
	    array('comments_num, hits, is_fixed', 'numerical', 'integerOnly' => true),
	    array('title, address', 'length', 'max' => 200),
	    array('club_id, user_id', 'length', 'max' => 20),
	    array('tags', 'length', 'max' => 150),
	    array('start_date, finish_date, content, create_date', 'safe'),
	    // The following rule is used by search().
	    // Please remove those attributes that should not be searched.
	    array('id, title, start_date, finish_date, content, address, club_id, user_id, create_date, comments_num, hits, is_fixed, tags', 'safe', 'on' => 'search'),
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
	    'title' => '标题',
	    'start_date' => '开始时间',
	    'finish_date' => '结束时间',
	    'content' => '活动介绍',
	    'address' => '出发地点',
	    'club_id' => '俱乐部',
	    'user_id' => '发起人',
	    'create_date' => '发布时间',
	    'comments_num' => '评论总数',
	    'hits' => '查看总数',
	    'is_fixed' => '是否置顶',
	    'tags' => '活动标签',
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
	$criteria->compare('title', $this->title, true);
	$criteria->compare('start_date', $this->start_date, true);
	$criteria->compare('finish_date', $this->finish_date, true);
	$criteria->compare('content', $this->content, true);
	$criteria->compare('address', $this->address, true);
	$criteria->compare('club_id', $this->club_id, true);
	$criteria->compare('user_id', $this->user_id, true);
	$criteria->compare('create_date', $this->create_date, true);
	$criteria->compare('comments_num', $this->comments_num);
	$criteria->compare('hits', $this->hits);
	$criteria->compare('is_fixed', $this->is_fixed);
	$criteria->compare('tags', $this->tags, true);

	return new CActiveDataProvider($this, array(
		    'criteria' => $criteria,
		));
    }

}