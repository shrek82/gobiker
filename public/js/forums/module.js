//论坛方法
var forums = {};

//绑定排序功能
forums.list_events = function () {

  $("#threadtypesmenuorder_fix").hover(function () {
    $("#threadtypesmenuorder_menu").show();
  }, function () {
    $("#threadtypesmenuorder_menu").hide();
  });

  if (window.localStorage) {
    if (typeof localStorage.bbs_forum_list_type !== "undefined") {
      if (localStorage.bbs_forum_list_type == "text") {
        $("#textlist").removeClass("ontext").addClass("text");
        $("#piclist").removeClass("pic").addClass("onpic");
        $(".bbs_threadlist .pics").hide();
      }
      if (localStorage.bbs_forum_list_type == "pic") {
        $("#piclist").removeClass("onpic").addClass("pic");
        $("#textlist").removeClass("text").addClass("ontext");
        $(".bbs_threadlist .pics").show();
      }
    }
  }

  $("#textlist").on("click", function () {
    $(this).removeClass("ontext").addClass("text");
    $("#piclist").removeClass("pic").addClass("onpic");
    $("#threadlist p.pics").animate({ opacity: 'hide', height: 'hide' }, 400);
    if (window.localStorage) {
      window.localStorage.setItem('bbs_forum_list_type', 'text');
    }
  });

  $("#piclist").on("click", function () {
    $(this).removeClass("onpic").addClass("pic");
    $("#textlist").removeClass("text").addClass("ontext");
    $("#threadlist p.pics").animate({ opacity: 'show', height: 'show' }, 300);
    if (window.localStorage) {
      window.localStorage.setItem('bbs_forum_list_type', 'pic');
    }
  });
};


forums.post_button = function () {

  $("#forums_post_button").click(function () {

    if (!user.uid) {
      plogin();
      return false;
    }

    var forum_pop = new popup({title: '选择要发布到版块：'});
    forum_pop.ajax('/forums/select_forums', '600', function () {
      setTimeout(function () {
        //绑定tab切换
        $pop_html_box = $("#pop_html_box");
        $pop_html_box_navli = $pop_html_box.find("ul.forumnav li");
        $pop_html_box_list = $pop_html_box.find("div.subcnt ul.list");
        $post_link = $("#post_link");
        var cur_tab;
        $pop_html_box_navli.mouseover(function () {
          cur_tab = $(this);
          $(this).addClass('current');
          $(this).siblings().removeClass('current');
          $pop_html_box_list.eq(cur_tab.index()).show().siblings().hide();
        });
        //绑定点击
        $pop_html_box_list.find("a").click(function () {
          $(this).addClass('current').parent().siblings().find("a").removeClass('current');
          $post_link.attr('defid', $(this).attr('fid'));
        });
        //绑定确定按钮
        $post_link.click(function () {
          forum_pop.close();
          setTimeout(function () {
            window.location.href = "/forums/topics/post?fid=" + $post_link.attr('defid');
          }, 600);
        });
      }, 150);
    });
  });

}