define(function (require, exports, module) {

  var lib = require('lib');

  //网站二级导航菜单
  $("#qyer_head_nav_item_yd").hover(function () {
    $(this).addClass("qyer_head_nav_item_current");
    $(this).find(".qyer_head_subnav_bg").show();
  }, function () {
    $(this).removeClass("qyer_head_nav_item_current");
    $(this).find(".qyer_head_subnav_bg").hide();
  });

  //检测登录状态
  $.ajax({
    url: '/users/check_user',
    dataType: 'html',
    success: function (res) {
      $('#asynclogininfo').html(res);
    }
  });

  //返回顶部
  var icon = $("<div class='ui_upward_wrapper' id='ui_gotop'><a class='arrow_icon'>回顶部</a></div>");
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

  var doc_h, win_h, top, max_h, scroll_top;

  icon.css({"left": left, "right": right});

  win.on("scroll", function () {
    doc_h = doc.height();
    win_h = win.height();
    top = win_h - icon_h - 30;
    scroll_top = doc.scrollTop();
    if (isfoot) {
      max_h = doc_h - foot_h - scroll_top;
      top = win_h > max_h ? max_h - icon_h - 30 : top;
    }
    if (scroll_top < 200) {
      icon.fadeOut(250);
    }
    else if (doc_w > 1200) {
      icon.css({"right": "auto", "top": top}).fadeIn(200);
    }
    else {
      icon.css({"left": "auto", "top": top}).fadeIn(200);
    }
  });

  icon.click(function () {
    $("body,html").animate({scrollTop: 0});
  });

});