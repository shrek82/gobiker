<?php
$error=null;
if($_POST){
 if(!$_POST['email']){
  $error='邮箱不能为空';
 }
}

echo json_encode(array('error'=>$error,'html'=>'密码不能为空'));

?>