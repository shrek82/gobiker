var QYER={uid:0};
document.write('<div class="qyer_head_login" id="asynclogininfo">');
	document.write('<ul class="qyer_head_login_entry"><li class="qyer_head_login_entry_tit"><a href="/users/login" rel="nofollow" data-bn-ipg="1017">登录</a> | <a href="/users/register" rel="nofollow" data-bn-ipg="1018">注册</a></li><li><a href="javascript:void(0);" class="_jsqqlogin" data-bn-ipg="1016"><img src="/static/media/connect_logo_qq.png" width="16" height="16" alt="使用QQ账号登录" title="使用QQ账号登录" /></a></li><li><a href="javascript:void(0);" class="_jsweibologin" data-bn-ipg="1015"><img src="/static/media/head_weibo.png" width="20" height="16" alt="使用微博账号登录" title="使用微博账号登录" /></a></li></ul>');
	document.write('</div>');
//openid 登录 注册

jQuery("._jsweibologin").live('click', function(){
	//alert('weibo');
	var refer = jQuery(this).attr("url");
	if(!refer){
		var refer = window.location.href;
	}
	/*
		var refer = window.location.href;
		*/
	var url = "http://login.qyer.com/login.php?action=weibo&popup=1&refer="+refer;
	window.open (url,'newwindow','height=450px,width=600px,top=100,left=300,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
});

jQuery("._jsqqlogin").live('click', function(){
	
	var refer = jQuery(this).attr("url");
	if(!refer){
		var refer = window.location.href;
	}
	/**/
	/*
		var refer = window.location.href;
		*/
	//var refer = window.location.href;
	var url = "http://login.qyer.com/login.php?action=qq&popup=1&refer="+refer;
	window.open (url,'newwindow','height=450px,width=600px,top=100,left=300,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
});
