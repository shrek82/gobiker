/*! global(1.0.0) - JianGang Zhao <zhaojiangang@gmail.com> - 2013-09-28 13:52:11*/
define("global/1.0.0/global", ["lib/latest/lib"], function (t, i, a) {
  var n = t("lib/latest/lib"), e = {};
  e.subNav = function () {
    $("#qyer_head_nav_item_yd").hover(function () {
      $(this).addClass("qyer_head_nav_item_current"), $(this).find(".qyer_head_subnav_bg").show()
    }, function () {
      $(this).removeClass("qyer_head_nav_item_current"), $(this).find(".qyer_head_subnav_bg").hide()
    })
  }, e.scrollToTop = function () {
    var t = $("<div class='ui_upward_wrapper' id='ui_gotop'><a class='arrow_icon'>\u56de\u9876\u90e8</a></div>");
    t.appendTo("body");
    var i, a, n, e, o, s = t.innerHeight(), c = $(document), l = $(window), r = $("div.qyer_footer"), u = r.height(), d = r.length, f = c.width(), m = (f - 980) / 2 + 1040, p = 10;
    t.css({left: m, right: p}), l.on("scroll", function () {
      i = c.height(), a = l.height(), n = a - s - 30, o = c.scrollTop(), d && (e = i - u - o, n = a > e ? e - s - 30 : n), 200 > o ? t.fadeOut(250) : f > 1200 ? t.css({right: "auto", top: n}).fadeIn(200) : t.css({left: "auto", top: n}).fadeIn(200)
    }), t.click(function () {
      $("body,html").animate({scrollTop: 0})
    })
  }, e.check_user = function () {
    $.ajax({url: "/users/check_user", dataType: "html", success: function (t) {
      $("#asynclogininfo").html(t)
    }})
  }, e.logged_button = function (t, i) {
    var a = $("#" + t);
    if (a.length) {
      var n = function () {
        if ("function" == typeof i)try {
          i()
        } catch (t) {
        }
        else{
          if (!a.attr("data-href"))return!1;
          window.location.href = a.attr("data-href")
        }
      };
      a.click(function () {
        user.uid ? n() : e.plogin(n)
      })
    }
  }, e.plogin = function (t) {
    var i = "";
    i += '<div class="reg_main">', i += '  <div class="clearfix"><strong class="fl f16 fontYaHei fb cGray">\u4f7f\u7528\u7a77\u6e38\u5e10\u53f7\u767b\u5f55</strong><span class="fr cGray">\u6ca1\u6709\u5e10\u53f7\uff1f<a id="tab_register_sw" href="javascript:void(0);">\u7acb\u5373\u6ce8\u518c</a></span></div>', i += '  <form method="post" action="/login" name="loginform" id="login_form">', i += '    <div class="login_form" style="margin-bottom:10px;">', i += '      <div class="list clearfix">', i += '        <span class="fl">\u5e10\u53f7\uff1a</span>', i += '        <input type="text" class="ui_input fl" name="login[account]" id="account" maxlength="40" placeholder="\u90ae\u7bb1\u6216\u7528\u6237\u540d">', i += "      </div>", i += '      <div class="list clearfix">', i += '        <span class="fl">\u5bc6\u7801\uff1a</span>', i += '        <input type="password" class="ui_input fl" autocomplete="off" maxlength="16" name="login[password]" id="password">', i += "      </div>", i += '      <div class="list clearfix">', i += '        <label class="fl cGray"><input type="checkbox" checked="checked" id="tagpass" name="login[reme]" class="fl">\u8bb0\u4f4f\u6211</label>', i += '        <a target="_blank" href="getpass" class="fr">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a>', i += "      </div>", i += '      <div class="list clearfix">', i += '        <button type="submit" class="btn btn-mint" id="login_submit_button" style="width:80%;padding:8px 0;font-size:16px">\u7acb\u5373\u767b\u5f55</button>', i += "      </div>", i += "    </div>", i += "  </form>", i += '  <div class="tc mt20">', i += '    <img src="http://static.qyer.com/images/login/login2/huo_icon.png" width="400" height="16" alt=""></div>', i += '  <div class="clearfix mt15" style="color:#999"><strong>\u4f7f\u7528\u4ee5\u4e0b\u5e10\u53f7\u76f4\u63a5\u767b\u5f55</strong></div>', i += '  <div class="tc mt15">', i += '    <a href="javascript:void(0);" onfocus="this.blur();" class="weibo_btn _jsweibologin">\u5fae\u535a\u767b\u5f55</a>', i += '    <a href="javascript:void(0);" onfocus="this.blur();" class="qq_btn _jsqqlogin">QQ\u767b\u5f55</a>', i += "  </div>", i += '  <p id="synlogin"></p>', i += "</div>";
    var a = new n.popup({title: "\u767b\u9646"});
    a.html(i, "440", function () {
      setTimeout(function () {
        var i = $("#login_submit_button");
        i.prop("type", "submit"), $("#login_form").submit(function (i) {
          i.preventDefault(), new n.ajaxForm($(this), {dataType: "json", submitButton: "login_submit_button", successLabel: "\u767b\u5f55\u6210\u529f", sendingLabel: "\u9a8c\u8bc1\u4e2d..", errorLabel: "\u91cd\u8bd5\u767b\u5f55", callback: function (i) {
            if (i.uid && i.username && (user = {uid: i.uid, username: i.username}, e.check_user(), a.close(), "function" == typeof t))try {
              t()
            } catch (n) {
            }
          }}).send()
        })
      }, 500)
    })
  }, e.loadComments = function (t) {
    $.ajax({url: "/comments/list", dataType: "html", type: "get", data: t + "&_format=html", success: function (t) {
      $("#cmt_loading").hide(10, function () {
        $("#ajax_list").html($(t).fadeIn(400))
      }), setTimeout(function () {
        e.cmtpage()
      }, 1200)
    }})
  }, e.scroll_to_cmtform = function () {
    var t = $("#comment_form"), i = t.offset().top - 32;
    $("html, body").animate({scrollTop: i}, function () {
    })
  }, e.cmtpage = function () {
    $("div.ui_page a").bind("click", function (t) {
      t.preventDefault(), $.ajax({url: $(this).attr("url"), dataType: "html", type: "get", success: function (t) {
        var i = $("#ajax_list").offset().top - 42;
        $("html, body").animate({scrollTop: i}), $("#ajax_list").html($(t).fadeIn(400)), setTimeout(function () {
          e.cmtpage()
        }, 200)
      }})
    })
  }, e.bindCmtForm = function (t) {
    var t = t ? t + "&" : "", i = function () {
      new n.ajaxForm($("#comment_form"), {dataType: "json", submitButton: "cmt_submit_button", successLabel: "\u53d1\u8868\u6210\u529f", callback: function (i) {
        ueditor.setContent("<p></p>"), $.ajax({url: "/comments/getone", dataType: "html", type: "get", data: t + "_format=html&id=" + i.comment.id, success: function (t) {
          $("#nodata_topic").remove(), $li = $(t), $("#cmts_pager").before($li);
          var i = $li.height() + "px";
          $li.css({opacity: 0, height: 0}).animate({opacity: 1, height: i}, 600)
        }})
      }}).send()
    };
    this.logged_button("cmt_submit_button", function () {
      console.log("submit comment"), i()
    }), user.uid || $("#cmt_textarea").click(function () {
      e.plogin()
    })
  }, a.exports = e
});