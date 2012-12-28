<?php

/**
  +-----------------------------------------------------------------
 * 定义的一些常用的方法
  +-----------------------------------------------------------------
 */
class Common {

    /**
      +-----------------------------------------------------------------
     * 从$_POST获取变量(变量名称，默认值)
      +-----------------------------------------------------------------
     */
    public static function getPost($post,$default_value=null) {
        if (isset($post[$var_name])) {
            return trim($post[$var_name]);
        } else {
            return $default_value;
        }
    }

    /**
      +-----------------------------------------------------------------
     * 从$_GET获取变量
      +-----------------------------------------------------------------
     */
    public static function getGet($get,$default_value=null) {
        if (isset($get[$var_name])) {
            return trim($get[$var_name]);
        } else {
            return $default_value;
        }
    }

//人性化日期显示
    public static function ueTime($times) {
        if ($times == '' || $times == 0) {
            return false;
        }
        //完整时间戳
        $strtotime = is_int($times) ? $times : strtotime($times);
        $times_day = date('Y-m-d', $strtotime);
        $times_day_strtotime = strtotime($times_day);

        //今天
        $nowdate_str = strtotime(date('Y-m-d'));

        //精确的时间间隔(秒)
        $interval = time() - $strtotime;

        //今天的
        if ($times_day_strtotime == $nowdate_str) {

            //小于一分钟
            if ($interval < 60) {
                $pct = sprintf("%d秒前", $interval);
            }
            //小于1小时
            elseif ($interval < 3600) {
                $pct = sprintf("%d分钟前", ceil($interval / 60));
            } else {
                $pct = sprintf("%d小时前", floor($interval / 3600));
            }
        }
        //昨天的
        elseif ($times_day_strtotime == strtotime(date('Y-m-d', strtotime('-1 days')))) {
            $pct = '昨天' . date('H:i', $strtotime);
        }
        //前天的
        elseif ($times_day_strtotime == strtotime(date('Y-m-d', strtotime('-2 days')))) {
            $pct = '前天' . date('H:i', $strtotime);
        }
        //一个月以内
        elseif ($interval < (3600 * 24 * 30)) {
            $pct = date('m月d日', $strtotime);
        }
        //一年以内
        elseif ($interval < (3600 * 24 * 365)) {
            $pct = date('m月d日', $strtotime);
        }
        //一年以上
        else {
            $pct = date('Y年m月d日', $strtotime);
        }
        return $pct;
    }

    //获取星期
    public static function getWeek($date){
        $week = array('0' => '星期日', '1' => '星期一', '2' => '星期二', '3' => '星期三', '4' => '星期四', '5' => '星期五', '6' => '星期六');
        $dateArr = explode("-", date('Y-n-d', strtotime($date)));
        return $week[date("w", mktime(0, 0, 0, $dateArr[1], $dateArr[2], $dateArr[0]))];
    }


    //设置cookie
    public static function setCookie($name, $value, $exp = null) {
        $cookie = new CHttpCookie($name, $value);
        $cookie->expire = $exp ? $exp : time() + 3600 * 24 * 30;
        Yii::app()->request->cookies[$name] = $cookie;
    }

    //获取cookie
    public static function getCookie($name) {
        $cookie = Yii::app()->request->getCookies();
        return $cookie[$name]->value;
    }


}

?>
