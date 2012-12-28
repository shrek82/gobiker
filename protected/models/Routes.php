<?php

/**
 * This is the model class for table "qx_routes".
 *
 * The followings are the available columns in table 'qx_routes':
 * @property string $id
 * @property string $title
 * @property string $short_title
 * @property string $tags
 * @property integer $category_id
 * @property string $user_id
 * @property string $img_path
 * @property string $banner_path
 * @property integer $province_id
 * @property integer $city_id
 * @property integer $duration
 * @property integer $distance
 * @property string $starting
 * @property string $destination
 * @property integer $been_num
 * @property integer $interested_num
 * @property integer $favorites_num
 * @property integer $hits_num
 * @property integer $good_num
 * @property string $along_the_scenic
 * @property integer $is_recommended
 * @property integer $is_fixed
 * @property integer $recommendation_index
 * @property integer $landscape_index
 * @property integer $road_index
 * @property string $map
 * @property string $create_date
 * @property string $update_date
 */
class Routes extends CActiveRecord {

    /**
     * Returns the static model of the specified AR class.
     * @param string $className active record class name.
     * @return Routes the static model class
     */
    public static function model($className = __CLASS__) {
        return parent::model($className);
    }

    /**
     * @return string the associated database table name
     */
    public function tableName() {
        return 'qx_routes';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules() {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('category_id,province_id,city_id,title', 'required'),
            array('category_id, province_id, city_id, duration, distance, been_num, interested_num, favorites_num, hits_num, good_num, is_recommended, is_fixed, recommendation_index, landscape_index, road_index', 'numerical', 'integerOnly' => true),
            array('id, user_id', 'length', 'max' => 20),
            array('title, tags, img_path, banner_path', 'length', 'max' => 200),
            array('short_title', 'length', 'max' => 100),
            array('starting, destination', 'length', 'max' => 150),
            array('along_the_scenic', 'length', 'max' => 250),
            array('map, create_date, update_date', 'safe'),
            // The following rule is used by search().
            // Please remove those attributes that should not be searched.
            array('id, title, short_title, tags, category_id, user_id, img_path, banner_path, province_id, city_id, duration, distance, starting, destination, been_num, interested_num, favorites_num, hits_num, good_num, along_the_scenic, is_recommended, is_fixed, recommendation_index, landscape_index, road_index, map, create_date, update_date', 'safe', 'on' => 'search'),
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
            'short_title' => '短标题',
            'tags' => '标签',
            'category_id' => '路线分类',
            'user_id' => '作者',
            'img_path' => '缩略图地址',
            'banner_path' => 'Banner地址',
            'province_id' => '所在省份',
            'city_id' => '所在城市',
            'duration' => '用时',
            'distance' => '距离',
            'starting' => '出发地',
            'destination' => '目的地',
            'intro' => '简介',
            'content' => '详细说明',
            'source' => '来源',
            'been_num' => '去过的人数',
            'interested_num' => '想去人数',
            'favorites_num' => '收藏人数',
            'hits_num' => '点击次数',
            'good_num' => '好评人数',
            'along_the_scenic' => '途径地点',
            'is_recommended' => '是否为推荐',
            'is_fixed' => '是否为置顶',
            'recommendation_index' => '综合推荐指数',
            'landscape_index' => '风景指数',
            'road_index' => '道路指数',
            'map' => '地图',
            'create_date' => '发布日期',
            'update_date' => '修改日期',
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
        $criteria->compare('short_title', $this->short_title, true);
        $criteria->compare('tags', $this->tags, true);
        $criteria->compare('category_id', $this->category_id);
        $criteria->compare('user_id', $this->user_id, true);
        $criteria->compare('img_path', $this->img_path, true);
        $criteria->compare('banner_path', $this->banner_path, true);
        $criteria->compare('province_id', $this->province_id);
        $criteria->compare('city_id', $this->city_id);
        $criteria->compare('duration', $this->duration);
        $criteria->compare('distance', $this->distance);
        $criteria->compare('starting', $this->starting, true);
        $criteria->compare('destination', $this->destination, true);
        $criteria->compare('been_num', $this->been_num);
        $criteria->compare('interested_num', $this->interested_num);
        $criteria->compare('favorites_num', $this->favorites_num);
        $criteria->compare('hits_num', $this->hits_num);
        $criteria->compare('good_num', $this->good_num);
        $criteria->compare('along_the_scenic', $this->along_the_scenic, true);
        $criteria->compare('is_recommended', $this->is_recommended);
        $criteria->compare('is_fixed', $this->is_fixed);
        $criteria->compare('recommendation_index', $this->recommendation_index);
        $criteria->compare('landscape_index', $this->landscape_index);
        $criteria->compare('road_index', $this->road_index);
        $criteria->compare('map', $this->map, true);
        $criteria->compare('create_date', $this->create_date, true);
        $criteria->compare('update_date', $this->update_date, true);

        return new CActiveDataProvider($this, array(
                    'criteria' => $criteria,
                ));
    }

    //路线分类
    public function categorys() {
        return array(
            '1' => '普通平路',
            '2' => '上坡路线',
        );
    }

}