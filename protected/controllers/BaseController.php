<?php

/**
  +------------------------------------------------------------------------------
 * 基本查询接口
  +------------------------------------------------------------------------------
 */
class BaseController extends MainController {

    /**
      +------------------------------------------------------------------------------
     * 所有城市下拉菜单
      +------------------------------------------------------------------------------
     */
    public function actionCityselect($pro_id, $selected_id = null) {
        // $this->layout = false;
        $citys = Yii::app()->db->createCommand()
                ->select('*')
                ->from('qx_city')
                ->where('province_id=' . $pro_id)
                ->order('id ASC')
                ->queryAll();
        $select_html = '<select id="city_id" name="city_id" style="width: 90px" onchange="changeCity(this.options[this.selectedIndex].value)"><option>选择...</option>';
        foreach ($citys AS $c) {
            $select_html.='<option value="' . $c['city_id'] . '">' . $c['name']. '</option>';
        }
        $select_html.='</select>';
        echo $select_html;
        //echo $this->renderPartial('province',array('provinces'=>$provinces));
    }

    //获取区下来菜单
    public function actionDistrictselect($city_id, $selected_id = null) {
        $this->layout = false;
        $citys = Yii::app()->db->createCommand()
                ->select('*')
                ->from('qx_district')
                ->where('city_id=' . $city_id)
                ->order('id ASC')
                ->queryAll();
        $select_html = '<select id="district_id" name="district_id" style="width: 90px"><option>选择...</option>';
        foreach ($citys AS $c) {
            $select_html.='<option value="' . $c['district_id'] . '">' . $c['name'].'</option>';
        }
        $select_html.='</select>';
        echo $select_html;
        //echo $this->renderPartial('province',array('provinces'=>$provinces));
    }


}

?>
