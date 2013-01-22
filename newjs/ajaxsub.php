<?php
if($_POST){
	echo json_encode($_POST);
}
elseif($_GET){
    echo json_encode($_GET);
}
else{
	echo json_encode(array('status'=>0));
}
?>