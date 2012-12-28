<?php

//目的地查询
class PlaceQuery extends Place {

    //每页显示数目
    const PAGE_SIZE = 10;

    public static function getList($condition = array()) {
        $page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
        $page_size = isset($condition['page_size']) ? (int) $condition['page_size'] :self::PAGE_SIZE;
        $province_id = isset($condition['province_id']) ? (int) $condition['province_id'] : false;
        $city_id = isset($condition['city_id']) ? (int) $condition['city_id'] : false;
        $category_id = isset($condition['category_id']) ? (int) $condition['category_id'] : false;
        $tags = isset($condition['tags']) ? $condition['tags'] : false;

        //返回的数组
        $back = array();

        //查询条件
        $condition = null;

        //创建一个查询条件
        $criteria = new CDbCriteria();

        //省份
        if ($province_id) {
            $condition = $condition ? $condition . ' AND province_id=' . $province_id : 'province_id=' . $province_id;
        }
        //城市
        if ($city_id) {
            $condition = $condition ? $condition . ' AND city_id=' . $city_id : 'city_id=' . $city_id;
        }
        //分类
        if ($category_id) {
            $condition = $condition ? $condition . ' AND category_id=' . $category_id : 'category_id=' . $category_id;
        }
        //专业
        if ($tags) {
            $condition = $condition ? $condition . ' AND tags LIKE "%' . $tags . '%"' : 'tags LIKE "%' . $tags . '%"';
        }
        //查询字段
        $criteria->select = '*';
        $criteria->condition = $condition;
        $count = Place::model()->count($criteria);
        $criteria->limit = $page_size;
        $criteria->offset = ($page - 1) * $page_size;
        $criteria->order = 'id DESC';

        //满足条件的第N页记录
        $back['records'] = Place::model()->findAll($criteria);

        //分页
        $pages = new CPagination($count);
        $pages->pageSize = $page_size;
        $back['pages'] = $pages;

        //匹配的结果总数
        $back['count'] = $count;

        //本次查询条件
        $back['condition'] = $criteria->condition;

        return $back;
    }

}

?>
