//预处理项
var readyScript = {};
var user = {};

//网站二级导航菜单
readyScript.site_nav = function () {
  $("#qyer_head_nav_item_yd").hover(function () {
    $(this).addClass("qyer_head_nav_item_current");
    $(this).find(".qyer_head_subnav_bg").show();
  }, function () {
    $(this).removeClass("qyer_head_nav_item_current");
    $(this).find(".qyer_head_subnav_bg").hide();
  });
}
//检测登录状态
readyScript.auto_login = function () {
  request({
    url: '/users/check_user',
    dataType: 'html',
    success: function (res) {
      $('#asynclogininfo').html(res);
    }
  });
}

//返回顶部
readyScript.scrollTop = function () {

  var icon =$("<div class='ui_upward_wrapper' id='ui_gotop'><a class='arrow_icon'>回顶部</a></div>");
  icon.appendTo("body");
  var icon_h = icon.innerHeight(); //获取icon高度

  var doc = $(document);
  var win = $(window);

  var foot = $("div.qyer_footer");
  var foot_h = foot.height();
  var isfoot = foot.length;
  var doc_w = doc.width();
  var left = (doc_w - 980) / 2 + 1040; //距离左侧距离
  var right = 10; //距离右侧距离

  var doc_h,win_h,top,max_h,scroll_top;

  icon.css({"left":left,"right":right});

  win.on("scroll",function(){
    doc_h = doc.height();
    win_h = win.height();
    top = win_h - icon_h - 30;
    scroll_top=doc.scrollTop();
    if(isfoot){
      max_h = doc_h - foot_h - scroll_top;
      top=win_h > max_h? max_h - icon_h - 30:top;
    }
    if(scroll_top<200) {
      icon.fadeOut(250);
    }
    else if(doc_w > 1200) {
      icon.css({"right":"auto","top":top}).fadeIn(200);
    }
    else {
      icon.css({"left":"auto","top":top}).fadeIn(200);
    }
  });

  icon.click(function(){
    $("body,html").animate({scrollTop:0});
  });
}

var runReadyScript = function () {
  var statrTime;
  $.each(readyScript, function (name, script) {
    statrTime = new Date().getTime();
    script();
    console.log('run ' + name + ':' + (new Date().getTime() - statrTime) / 1000 + 's');
  });
}

var qyerUI = {
  version: "0.1"
};

//弹出登录窗口
function plogin() {
  new popup({title: '登录'}).ajax('/users/minilogin', '440', function () {
    setTimeout(function () {
      var $submit_button=$('#login_submit_button');
      $submit_button.prop('type', 'submit');
      $('#login_form').submit(function (e) {
        e.preventDefault();
        new ajaxForm($(this), {
          dataType: 'json',
          submitButton: 'login_submit_button',
          successLabel: '登录成功',
          sendingLabel: '验证中..',
          errorLabel: '重试登录',
          callback: function () {
            location.reload();
          }
        }).send();
      });
    }, 500);
  });
}

//获取城市下拉菜单
function get_cities(pid,object) {
  $.ajax({
    url: '/common/cities_select',
    type: 'get',
    dataType: 'html',
    data: {province_id: pid,'object':object},
    success: function (data) {
      console.log(data);
      $('#city_select').html(data);
      $('#area_select').html('');
    }
  })
}

//获取城市下拉菜单
function get_areas(cid,object) {
  $.ajax({
    url: '/common/areas_select',
    type: 'get',
    dataType: 'html',
    data: {city_id: cid,'object':object},
    success: function (data) {
      console.log(data);
      $('#area_select').html(data);
    }
  })
}

//取消flash信息提示
function closeFlashMsg() {
  var $flash_msg = $('#flash_msg');
  var _this = this;
  this.close = function () {
    $flash_msg.fadeOut();
  };
  $flash_msg.find('.close').bind('click', function () {
    _this.close();
  });
  setTimeout(function () {
    _this.close();
  }, 5000);
}

//载入某条评论
var loadComments = function (query_param) {
  $.ajax({
    url: '/comments/list',
    dataType: 'html',
    type: 'get',
    data: query_param + '&_format=html',
    success: function (data) {
      $('#cmt_loading').fadeOut(300, function () {
        $("#ajax_list").html($(data).fadeIn(400));
      });
      setTimeout(function () {
        cmtpage();
      }, 1200);
    }
  });
}

//滚动到评论表单位置
var scroll_to_cmtform = function () {
  var $comment_form = $("#comment_form");
  var scroll_top = $comment_form.offset().top - 32;
  $('html, body').animate({scrollTop: scroll_top},function(){
    //$comment_form.find('textarea').focus();
  });

}

//评论分页
var cmtpage = function (url) {
  $('div.ui_page a').bind('click', function (e) {
    e.preventDefault();
    console.log($(this).attr('url'));
    $.ajax({
      url: $(this).attr('url'),
      dataType: 'html',
      type: 'get',
      success: function (data) {
        var ajax_list = $("#ajax_list").offset().top - 42;
        $('html, body').animate({scrollTop: ajax_list});
        $("#ajax_list").html($(data).fadeIn(400));
        setTimeout(function () {
          cmtpage();
        }, 200);
      }
    });
  });
}

//绑定评论表单
var bindCmtForm = function (add_param) {
  var add_param = add_param ? add_param + '&' : '';
  if (!user.uid) {
    $('#cmt_submit_button').prop('type', 'button').click(function () {
      plogin();
    });
    if(typeof ueditor=='object'){
      ueditor.disable();
    }
    else{
      $('#cmt_textarea').click(function(){
        plogin();
      })
    }

    return false;
  }

  $('#comment_form').bind("submit", function (e) {
    e.preventDefault();
    new ajaxForm($(this), {
      dataType: 'json',
      submitButton: 'cmt_submit_button',
      successLabel: '发表成功',
      callback: function (data) {
        ueditor.setContent('<p></p>');
        $.ajax({
          url: '/comments/getone',
          dataType: 'html',
          type: 'get',
          data: add_param + '_format=html&id=' + data.comment.id,
          success: function (html) {
            $li = $(html);
            $("#cmts_pager").before($li);
            var height = $li.height() + 'px';
            $li.css({opacity: 0, height: 0}).animate({opacity: 1, height: height},600);
            //$("#cmts_pager").before($(data).css('height','0').animate({height:"68px",opacity: 'toggle'},350));
          }
        });
      }
    }).send();
  });
}
