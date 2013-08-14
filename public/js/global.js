//预处理项
var readyScript = {};
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

readyScript.auto_login = function () {
  request({
    url: '/users/check_user',
    dataType: 'html',
    success: function (res) {
      $('#asynclogininfo').html(res);
    }
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

//获取城市下拉菜单
function get_cities(pid) {
  $.ajax({
    url: '/common/cities_select',
    type: 'get',
    dataType: 'html',
    data: {province_id: pid},
    success: function (data) {
      console.log(data);
      $('#city_select').html(data);
    }
  })
}

//获取城市下拉菜单
function get_areas(cid) {
  $.ajax({
    url: '/common/areas_select',
    type: 'get',
    dataType: 'html',
    data: {city_id: cid},
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
var loadComments = function (add_param) {
  $.ajax({
    url: '/comments/list',
    dataType: 'html',
    type: 'get',
    data: add_param + '&_format=html',
    success: function (data) {
      $('#cmt_loading').fadeOut(300, function () {
        $("#ajax_list").html($(data).fadeIn(400));
      });
      setTimeout(function(){
        cmtpage();
      },1200);
    }
  });
}

//滚动到评论表单位置
var scroll_to_cmtform=function(){
  var $comment_form=$("#comment_form");
  var scroll_top = $comment_form.offset().top - 32;
  $('html, body').animate({scrollTop: scroll_top});
  $comment_form.find('textarea').focus();
}

//评论分页
var cmtpage = function (url) {
  $('#ui_page a').bind('click', function (e) {
    e.preventDefault();
    console.log($(this).attr('url'));
    $.ajax({
      url:$(this).attr('url'),
      dataType: 'html',
      type: 'get',
      success: function (data) {
        var ajax_list = $("#write_review").offset().top - 32;
        $('html, body').animate({scrollTop: ajax_list});
        $("#ajax_list").html($(data).fadeIn(400));
        setTimeout(function(){
          cmtpage();
        },200);
      }
    });
  });
}

//绑定评论表单
var bindCmtForm = function (add_param) {
  var add_param=add_param?add_param+'&':'';
  $('#comment_form').bind("submit", function (e) {
    e.preventDefault();
    new ajaxForm($(this), {
      dataType: 'json',
      successLabel:'发表成功',
      callback: function (data) {
        $('#cmt_textarea').attr('value', '');
        $.ajax({
          url: '/comments/getone',
          dataType: 'html',
          type: 'get',
          data: add_param+'_format=html&id=' + data.comment.id,
          success: function (html) {
            $li = $(html);
            $("#cmts_pager").before($li);
            var height = $li.height() + 'px';
            $li.css({opacity: 0,height:0}).animate({opacity: 1, height: height}, 300);
            //$("#cmts_pager").before($(data).css('height','0').animate({height:"68px",opacity: 'toggle'},350));
          }
        });
      }
    }).send();
  });
}
