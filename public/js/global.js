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
    type: 'post',
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
    type: 'post',
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


//载入评论
var loadComments = function (param) {
  $.ajax({
    url: '/comments/list',
    dataType: 'html',
    type: 'get',
    data: param+'&_format=html',
    success: function (data) {
       $('#cmt_loading').fadeOut(300,function(){
         $("#cmt_form").before($(data).fadeIn(400));
       });
    }
  });
}

//绑定评论表单
var bindCmtForm = function () {
  $('#comment_form').bind("submit", function (e) {
    e.preventDefault();
    new ajaxForm($(this), {
      dataType: 'html',
      callback:function(data){
        $data=$(data);
        $('#cmt_textarea').attr('value','');
        $("#cmts_pager").before($data);
        var height=$data.height();
        $data.css({opacity :0,height :0}).animate({opacity:1,'height':height+'px'},400);
        //$("#cmts_pager").before($(data).css('height','0').animate({height:"68px",opacity: 'toggle'},350));
      }
    }).send();
  });
}

var pupclose=function(){
  $(".ui_pupBox_bg").hide();
  popupFirst = false;
  return false;
}

var popup=function(){

  var popup = {};
  var popupFirst = true;
  var pup_code = "<div class='ui_pupBox_bg'><div class='ui_pupBox'><div class='ui_pupBox_close'></div><div class='ui_pupBox_main'></div></div></div>";


  function pupstart(width) {
    if (popupFirst) {
      $("body").append(pup_code);
    }
    popupFirst = false;
    width = parseInt(width, 10);
    $(".ui_pupBox_bg").css({
      "display": "block",
      "height": $(document).height()
    });
    $(".ui_pupBox").css({
      "width": width + 2,
      "top": $(document).scrollTop()
    });
    $(".ui_pupBox_main").text("");
    $(".ui_pupBox_close").show();
  }

  popup.start = pupstart;
  popup.ajax = function (obj, width, cb) {
    var closebtn = "show";
    var type = typeof obj;
    if ('object' == type) {
      url = obj.url;
      width = obj.width;
      closebtn = obj.closebtn;
      cb = obj.cb;
    } else {
      url = obj;
    }
    pupstart(width);
    $.get(url, function (html) {
      $(".ui_pupBox_main").html(html);
      if (typeof cb == 'function') {
        try {
          cb();
        } catch (ex) {
        }
      }
    });
    $(".ui_pupBox_close").bind("click", function () {
      pupclose();
    });
    if (closebtn == "hide") {
      $(".ui_pupBox_close").hide();
    }
  };
  popup.show = function (obj, width) {
    var closebtn = "show";
    var type = typeof obj;
    if ('object' == type) {
      id = obj.id;
      width = obj.width;
      closebtn = obj.closebtn;
    } else {
      id = obj;
    }
    pupstart(width);
    var idText = $("#" + id).html();
    $(".ui_pupBox_main").html(idText);
    $(".ui_pupBox_close").bind("click", function () {
      pupclose();
    });
    if (closebtn == "hide") {
      $(".ui_pupBox_close").hide();
    }
  }
  popup.showHtml = function (obj, width) {
    var closebtn = "show";
    var type = typeof obj;
    if ('object' == type) {
      html = obj.html;
      width = obj.width;
      closebtn = obj.closebtn;
    } else {
      html = obj;
    }
    pupstart(width);
    $(".ui_pupBox_main").html(html);
    $(".ui_pupBox_close").bind("click", function () {
      pupclose();
    });
    if (closebtn == "hide") {
      $(".ui_pupBox_close").hide();
    }
  }
}