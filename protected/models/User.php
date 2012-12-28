<?php

/**
 * This is the model class for table "zy_user".
 *
 * The followings are the available columns in table 'zy_user':
 * @property string $id
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $reg_date
 * @property string $login_date
 * @property string $avatar_path
 */
class User extends CActiveRecord {

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return User the static model class
     */
    public static function model($className = __CLASS__) {
	return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
	return 'qx_user';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
	// NOTE: you should only define rules for those attributes that
	// will receive user inputs.
	return array(
	    array('username, password', 'length', 'max' => 50),
	    array('email', 'length', 'max' => 100),
	    array('avatar_path', 'length', 'max' => 150),
	    array('reg_date, login_date', 'safe'),
	    // The following rule is used by search().
	    // Please remove those attributes that should not be searched.
	    array('id, username, email, password, reg_date, login_date, avatar_path', 'safe', 'on' => 'search'),
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
	    'username' => '用户名',
	    'email' => '登陆帐号',
	    'password' => '密码',
	    'reg_date' => '注册日期',
	    'login_date' => '登陆日期',
	    'avatar_path' => '头像地址',
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
	$criteria->compare('username', $this->username, true);
	$criteria->compare('email', $this->email, true);
	$criteria->compare('password', $this->password, true);
	$criteria->compare('reg_date', $this->reg_date, true);
	$criteria->compare('login_date', $this->login_date, true);
	$criteria->compare('avatar_path', $this->avatar_path, true);

	return new CActiveDataProvider($this, array(
		    'criteria' => $criteria,
		));
    }


    //加密方式
    public function hashPassword($password, $salt=null) {
	return md5($password);
    }

    //登陆验证方法
    public function validatePassword($password) {
	return $this->hashPassword($password) === $this->password;
    }


}