<?php

class Upload {

    const default_image_path = 'static/uploads/pics/';
    const default_files_path = 'static/uploads/pics/';
    const original_image_size = 4194304;

    public $ext;
    public $temp_name;
    public $save_name;
    public $save_path;
    public $name;
    public $size;
    public $form_file_name = 'filedata';
    public $custom_save_path;
    public $upload_file;
    public $image_quality = 100;
    public $image_ext = array('.jpg', '.jpeg', '.png', 'bmp', '.gif');
    public $file_ext = array(".rar", ".zip", ".doc", ".docx", '.xls', '.wps', ".pdf", ".txt", ".swf", ".wmv", '.jpg', '.jpeg', '.mp3', '.ppt', '.pptx', '.avi', '.rmvb', '.wmv', '.flv', '.rm', '.psd');
    public $original_image_size = array('width' => 1000, 'height' => 1000);
    public $return = array();
    public $cut_image = true;
    //图片缩略图尺寸
    public $image_resize_array = array(
        'mini' => array('mw' => 80, 'mh' => 80),
        'small' => array('mw' => 150, 'mh' => 150),
        'thumbnail' => array('mw' => 320, 'mh' => 320),
        'bmiddle' => array('mw' => 640, 'mh' => 640)
            //'original' => array('mw' => 1000, 'mh' => 1000)
    );

    //初始化上传类
    public function __construct($name = 'filedata') {
        $this->return['error'] = false;
        $this->form_file_name = $name;
    }

    /*
     * 上传图片
     * @param $name 表单里file的name
     * @param $this->custom_save_path 自定义图片保存路径 默认为uploadfile 最后以/结尾
     * @param $resize_array 需要进行压缩图片的配置 如 array('100'=>array('mw'=>100, 'mh'=>100), '60'=>array('mw'=>60, 'mh'=>60)) //宽高不一定一样 按比例压缩
     * 将压缩现个图片一个是保存时以100_开头命名的最大宽高为100的图片，另一个是以60_开头的最大宽高为60的图片
     * @param $quanlity 图片质量 范围从 0（最差质量，文件更小）到 100（最佳质量，文件最大）。默认为的质量值80
     * return array(); 如果有缩略图生成将返回 array('image'=>这里是上传原始图片的后保存的地址,'thumb'=>array('100'=>这里是宽高最大为100的缩略图地址));
     * 无缩略图生成返回 array('image'=>这里是上传原始图片的后保存的地址, 'thumb'=>array());
     * 上传失败后返回空数组 array()
     * $name = 'filedata', $resize_image = false, $this->custom_save_path = false, $quality = 90
     */

    public function uploadImages() {

        //获取上传的文件对象
        $this->upload_file = CUploadedFile::getInstanceByName($this->form_file_name);

        //上传正确
        if (is_object($this->upload_file) && get_class($this->upload_file) === 'CUploadedFile') {

            //获取基本信息
            $this->ext = strtolower($this->upload_file->extensionName);
            $this->temp_name = $this->upload_file->getTempName();
            $this->name = $this->upload_file->getName();
            $this->size = $this->upload_file->getSize();

            //判断文件大小
            if ($this->size > self::original_image_size) {
                $this->return['error'] = '文件大小超出限制，请处理后重试！';
                return $this->return;
            }

            //判断图片格式
            if (!in_array('.' . $this->ext, $this->image_ext)) {
                $this->return['error'] = "图片格式错误！";
                return $this->return;
            }

            //保存时文件名(带文件扩展名)
            $this->save_name = date('His') . rand();

            //判断保存路径
            if (!$this->custom_save_path) {

                //自动创建日期目录
                $this->save_path = self::default_image_path . date('Ym') . '/' . date('d') . '/';

                if (!is_dir(self::default_image_path . date('Ym'))) {
                    mkdir(self::default_image_path . date('Ym'), 0777);
                }

                if (!is_dir(self::default_image_path . date('Ym') . '/' . date('d'))) {
                    mkdir(self::default_image_path . date('Ym') . '/' . date('d'), 0777);
                }
            }
            //使用自定义目录
            else {
                $this->save_path = $this->custom_save_path;
            }

            //原始图(或最大图片)保存地址
            $original_file_name = $this->save_path . $this->save_name . '.' . $this->ext;
            $this->return['original'] = $original_file_name;


            //生成缩略图和一张最大图
            if ($this->cut_image && is_array($this->image_resize_array) && $this->image_resize_array) {

                //缩略图对象
                $resize_image = NULL;
                if ($this->ext == 'gif') {
                    $resize_image = imagecreatefromgif($this->temp_name);
                } else if ($this->ext == 'jpg') {
                    $resize_image = imagecreatefromjpeg($this->temp_name);
                } else if ($this->ext == 'png') {
                    $resize_image = imagecreatefrompng($this->temp_name);
                }
                //生产各种缩略图
                foreach ($this->image_resize_array as $k => $size) {
                    if ((isset($size['mw']) && is_numeric($size['mw'])) || (isset($size['mh']) && is_numeric($size['mh']))) {
                        $mw = isset($size['mw']) ? $size['mw'] : 0;
                        $mh = isset($size['mh']) ? $size['mh'] : 0;
                        $thumb_file_name = $this->save_path . $this->save_name . '_' . $k . '.' . $this->ext;
                        $this->return[$k] = $thumb_file_name;
                        self::resizeImage($resize_image, $mw, $mh, $thumb_file_name, $this->ext, $this->image_quality);
                    }
                }
                //生成缩略图同时，保存一张同名的最大图
                self::resizeImage($resize_image, $this->original_image_size['width'], $this->original_image_size['height'], $original_file_name, $this->ext, $this->image_quality);
            }
            //不做任何裁剪
            else {
                //直接保存原图
                if ($this->upload_file->saveAs($original_file_name)) {

                } else {
                    $this->return['error'] = '图片保存失败，请检查目录读写权限！';
                }
            }

            $this->return['name'] = str_replace('.' . $this->ext, '', $this->name);
            $this->return['file_path'] = isset($this->return['mini']) ? '/' . $this->return['mini'] : '/' . $original_file_name;
            $this->return['temp_name'] = $this->temp_name;
            $this->return['size'] = $this->size;
            $this->return['ext'] = $this->ext;
        } else {
            $this->return['error'] = '文件上传失败';
        }

        return $this->return;
    }

    /*
     * 压缩图片
     * @param
     */

    public static function resizeImage($im, $maxwidth, $maxheight, $name, $filetype, $quality = 100) {

        $pic_width = imagesx($im);
        $pic_height = imagesy($im);

        //如果原图大于缩略图
        if (($maxwidth && $pic_width > $maxwidth) || ($maxheight && $pic_height > $maxheight)) {

            //原宽度大于裁剪宽度
            if ($maxwidth && $pic_width > $maxwidth) {
                $widthratio = $maxwidth / $pic_width;
                $resizewidth_tag = true;
            }

            //原高度大于裁剪高度
            if ($maxheight && $pic_height > $maxheight) {
                $heightratio = $maxheight / $pic_height;
                $resizeheight_tag = true;
            }

            if ($resizewidth_tag && $resizeheight_tag) {
                if ($widthratio < $heightratio)
                    $ratio = $widthratio;
                else
                    $ratio = $heightratio;
            }

            if ($resizewidth_tag && !$resizeheight_tag)
                $ratio = $widthratio;
            if ($resizeheight_tag && !$resizewidth_tag)
                $ratio = $heightratio;

            $newwidth = $pic_width * $ratio;
            $newheight = $pic_height * $ratio;

            if (function_exists("imagecopyresampled")) {
                $newim = imagecreatetruecolor($newwidth, $newheight);
                imagecopyresampled($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $pic_width, $pic_height);
            } else {
                $newim = imagecreate($newwidth, $newheight);
                imagecopyresized($newim, $im, 0, 0, 0, 0, $newwidth, $newheight, $pic_width, $pic_height);
            }
            imagejpeg($newim, $name, $quality);
            imagedestroy($newim);
        }
        //裁剪图比原图大，不需要处理，直接保留原图
        else {
            //$name = $name . $filetype;
            imagejpeg($im, $name, $quality);
        }
    }

    //又拍云存储上传参数
    public static function youpai() {

        $uploader='http://v0.api.upyun.com/gobiker1/';
        ///{year}/{mon}/{day}/{random}{.suffix}
        /// (回调中的所有信息均为 UTF-8 编码，签名验证的时候需要注意编码是否一致)
        $bucket = 'gobiker1'; /// 空间名
        $form_api_secret = 'jBeX7JeOM8La3+ywthzLpvyC6Yo='; /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）
        $options = array();
        $options['bucket'] = $bucket; /// 空间名
        $options['expiration'] = time() + 600; /// 授权过期时间
        $options['save-key'] = '/{year}/{mon}/{day}/{random}'; /// 文件名生成格式，请参阅 API 文档
        $options['allow-file-type'] = 'jpg,jpeg,gif,png'; /// 控制文件上传的类型，可选
        $options['x-gmkerl­thumbnail'] = '.jpg'; /// 使用此版本替换原图
        //$options['return-url'] = 'http://localhost/form-test/return.php'; /// 页面跳转型回调地址
        //$options['notify-url'] = 'http://a.com/form-test/notify.php'; /// 服务端异步回调地址, 请注意该地址必须公网可以正常访问
        $policy = base64_encode(json_encode($options));
        $signature = md5($policy . '&' . $form_api_secret); /// 表单 API 功能的密匙（请访问又拍云管理后台的空间管理页面获取）
        return array('uploader'=>$uploader,'policy'=>$policy,'signature'=>$signature);
    }

}

?>