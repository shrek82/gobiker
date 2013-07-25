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


(function () {
  var hasPlaceholder = 'placeholder' in document.createElement('input');

  function fixPlaceholder() {
    if (hasPlaceholder) return;
    $("input[placeholder], textarea[placeholder]").each(function () {
      var placeholder = $(this).attr("placeholder");
      if ($(this).val() == "") {
        $(this).val(placeholder).css("color", "#959595");
      } else if ($(this).val() == placeholder) {
        $(this).css("color", "#959595");
      }
      $(this).on("focus", function () {
        if ($(this).val() == placeholder) {
          $(this).val("").css("color", "");
        }
      });
      $(this).on("blur", function () {
        if ($(this).val() == "") {
          $(this).val(placeholder).css("color", "#959595");
        }
      });
    });
  };
  qyerUI.placeholder = fixPlaceholder;
  window.fixPlaceholder = fixPlaceholder;
})();


$(function () {
  qyerUI.placeholder();
});


(function ($) {
  var popup = {};
  var initial = true;
  var pupcode = '<div class="ui_popup_bg"><div class="ui_popup"><p class="ui_popup_close"></p><div class="ui_popup_main"><div style="text-align: center;color:#999;height: 50px;line-height:50px">正在加载中，请稍候....</div></div></div></div>';

  function pupClose() {
    $(".ui_popup_bg").hide();
  };
  popup.pupclose = pupClose;

  function pupStart(width) {
    if (initial) {
      $("body").append(pupcode);
      $(".ui_popup_close").on("click", function () {
        pupClose();
      });
    }
    initial = false;
    width = parseInt(width, 10);
    $(".ui_popup_bg").css({
      "display": "block",
      "height": $(document).height()
    });
    $(".ui_popup").css({
      "width": width,
      "top": $(document).scrollTop()
    });
    $(".ui_popup_main").text("");
    $(".ui_popup_close").hide();
  };
  popup.start = pupStart;
  popup.ajax = function (obj) {
    if (typeof obj == "object") {
      var url = obj.url;
      var width = obj.width || 500;
      var isclose = obj.isclose || true;
      var callback = obj.callback || false;
    }
    pupStart(width);
    $.get(url, function (data) {
      $(".ui_popup_main").html(data);
      if (typeof callback == 'function') {
        callback();
      }
    });
    if (isclose == "show") {
      $(".ui_popup_close").show();
    }
  };
  popup.show = function (obj) {
    if (typeof obj == "object") {
      var id = obj.id;
      var width = obj.width || 500;
      var isclose = obj.isclose || true;
    }
    pupStart(width);
    var idtext = $("#" + id).html();
    $(".ui_popup_main").html(idtext);
    if (isclose == "show") {
      $(".ui_popup_close").show();
    }
  };
  popup.showHtml = function (obj) {
    if (typeof obj == "object") {
      var html = obj.html;
      var width = obj.width || 500;
      var isclose = obj.isclose || true;
    }
    pupStart(width);
    $(".ui_popup_main").html(html);
    if (isclose == "show") {
      $(".ui_popup_close").show();
    }
  };
  qyerUI.popup = popup;
})($);


(function () {
  var popup = {};
  var popupFirst = true;
  var pup_code = "<div class='ui_pupBox_bg'><div class='ui_pupBox'><div class='ui_pupBox_close'></div><div class='ui_pupBox_main'></div></div></div>";

  function pupclose() {
    $(".ui_pupBox_bg").hide();
    popupFirst = false;
    return false;
  }

  window.pupclose = pupclose;

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
  window.popup = popup;
})();


(function () {
  var isfirst = true;

  function autoheight(obj, css) {
    if (isfirst) {
      $("body").append("<textarea id='js_autoheight_clone'></textarea>");
      isfirst = false;
    }
    var clone = $("#js_autoheight_clone");
    clone.width($(obj).width());
    clone.val($(obj).val());
    if (typeof css) {
      if (typeof css.fontSize) {
        clone.css("font-size", css.fontSize);
      }
      if (typeof css.lineHeight) {
        clone.css("line-height", css.lineHeight);
      }
    }
    setTimeout(function () {
      var height = clone.get(0).scrollHeight;
      $(obj).height(height);
    }, 1);
  }

  qyerUI.autoheight = autoheight;
})();


popup.coast = function (width, id, credits) {
  width = width || 400;
  credits.text = credits.text || '感谢你的分享，让其他穷游er看到了你在这里留下的回忆。';
  var htmlcoast = '<div class="ui_coast"><p class="ui_coast_cnt"><img src="http://static.qyer.com/images/common/tpl/icon_true.png" width="34" height="34" alt="" class="ui_coast_img" />' + credits.text + '</p><ul class="ui_coast_num clearfix">';
  if (credits.credits1 != undefined) {
    htmlcoast = htmlcoast + '<li>经验值<span>' + credits.credits1 + '</span></li>';
  }
  if (credits.credits2 != undefined) {
    htmlcoast = htmlcoast + '<li>贡献<span>' + credits.credits2 + '</span></li>';
  }
  htmlcoast = htmlcoast + '</ul></div>';
  $("body").append(htmlcoast);
  var winW = $(window).width();
  var winH = $(window).height();
  var H = $(".ui_coast").outerHeight();
  var W = width + 42;
  var left = (winW - W) / 2;
  var top = (winH - H) / 2 + $(document).scrollTop();
  var gap = 10;
  if (id) {
    id = $("#" + id);
    if (id.size() > 0) {
      var pos = id.offset();
      var w = id.outerWidth();
      var h = id.outerHeight();
      var t = pos.top - H - gap;
      var l = pos.left - (W - w) / 2;
      if (winW - w - l + gap < W) {
        l = winW - W - gap;
        if (pos.top - $(document).scrollTop() < H) {
          t = pos.top + h + gap;
          $(".ui_coast").css({
            "width": width,
            "left": l,
            "top": t
          }).show();
        } else {
          $(".ui_coast").css({
            "width": width,
            "left": l,
            "top": t
          }).show();
        }
      } else if (pos.top - $(document).scrollTop() < H) {
        t = pos.top + h + gap;
        if (l < 10) {
          l = 10
        }
        $(".ui_coast").css({
          "width": width,
          "left": l,
          "top": t
        }).show();
      } else {
        if (l < 10) {
          l = 10
        }
        $(".ui_coast").css({
          "width": width,
          "left": l,
          "top": t
        }).show();
      }
    } else {
      $(".ui_coast").css({
        "width": width,
        "left": left,
        "top": top
      }).show();
    }
  } else {
    $(".ui_coast").css({
      "width": width,
      "left": left,
      "top": top
    }).show();
  }

  function coastHide() {
    $(".ui_coast").fadeOut(500);
    $(".ui_coast").remove();
  }

  window.setTimeout(coastHide, 2000);
}

function ajaxlogin(issynclogin, which, filename, callback, type, url) {
  if (QYER.uid > 0) {
    return false;
  }
  if ($("#loginform").size() > 0 && typeof filename == 'undefined') {
    $(".ui_pupBox").css({
      "top": $(document).scrollTop()
    });
    $(".ui_pupBox_bg").show();
    return false;
  }
  filename = typeof filename == 'undefined' ? '/users/ajax' : filename;
  callback = typeof callback == 'undefined' ? '' : callback;
  type = typeof type == 'undefined' ? 'login' : type;
  url = typeof url == 'undefined' ? '' : url;
  var t = (+new Date());
  issynclogin = issynclogin > 0 ? 1 : 0;
  which = which || "";
  return popup.ajax(filename + '?action=login&_' + t + "&xxwhich=" + which + "&issynclogin=" + issynclogin + "&callback=" + callback + "&type=" + type + "&url=" + encodeURIComponent(url), 440);
}

function pagereload() {
  location.reload();
};

function syncAfterLogin(uid, fuc) {
  QYER.uid = uid;
  fuc = fuc || "";
  $.getJSON("http://user.qyer.com/user_action_logininfo?xxcb=" + fuc + "&callback=?");
}

function isloginjump(url, cb) {
  if ($.browser.msie) url += (url.indexOf('?') != -1 ? '&' : '?') + 'referer=' + escape(location.href);
  if (QYER.uid > 0) {
    location.href = url;
    return false;
  }
  url = "http://forums.qyer.com/" + url;
  ajaxlogin(0, '', 'bbsajax.php', '', '', url);
}

function getAjaxMsg(data) {
  if (typeof (data) == "object") {
    if (data.status == 1) {
      $("body").append(data.script);
      setTimeout(function () {
        window.location.href = data.url
      }, 2000);
    }
  }
}

function ajaxLogout() {
  tips.show('退出登录中...');
  $.ajax({
    type: "get",
    dataType: "jsonp",
    url: "/users/ajaxLogout?callback=?"
  });
}
$(function () {
  window.uitab = function () {
    $(".ui_tab").each(function () {
      $(this).children(".ui_tab_trigger").find(".ui_tab_trigger_item").each(function (i) {
        $(this).live("click", function () {
          if ($(this).hasClass("ui_tab_trigger_item_disabled") == false) {
            $(this).addClass("ui_tab_trigger_item_current").siblings(".ui_tab_trigger_item").removeClass("ui_tab_trigger_item_current");
            $(this).parents(".ui_tab_trigger").siblings(".ui_tab_cnt").children(".ui_tab_cnt_item:eq(" + i + ")").addClass("ui_tab_cnt_item_current").siblings(".ui_tab_cnt_item").removeClass("ui_tab_cnt_item_current");
          }
        });
      });
    });
  }
  window.uitab();
});
var tips = (function () {
  var t = function () {
    this.isshow = false;
    this.html = ["<div class='ui_message __XXtipsXX_' >", '', "</div>"];
    this.scroll_show = function () {
    };
    this.show = function (msg, timeout) {
      msg = msg || "";
      timeout = timeout || 2000;
      var obj = this.getobj();
      if (this.isshow) {
        $(obj).css({
          left: $(document).width() / 2 - 200
        });
        if ($.browser.msie && ($.browser.version == "6.0")) {
          $(obj).css({
            top: $(document).scrollTop()
          })
        }
        ;
        obj.html(msg);
        return;
      }
      this.html[1] = msg;
      $("body").append(this.html.join(''));
      obj = this.getobj();
      $(obj).css({
        left: $(document).width() / 2 - 200
      });
      if ($.browser.msie && ($.browser.version == "6.0")) {
        $(obj).css({
          top: $(document).scrollTop()
        })
      }
      ;
      obj.show();
      this.isshow = true;
      setTimeout(function () {
        $(obj).slideUp();
        tips.isshow = false;
      }, timeout);
    };
    this.hide = function () {
      this.getobj().fadeOut();
      this.isshow = false;
    };
    this.getobj = function () {
      return $(".__XXtipsXX_");
    };
  };
  t.prototype.confirm = function (event, ok_callback, showstr) {
    if (showstr == undefined) {
      showstr = '您确定要删除吗？';
    }
    var x = event.clientX,
      y = event.clientY;
    var id = "jsdelconfirm";
    var html = ['<div class="ui_delete" id="' + id + '">', '<div class="ui_delete_box">', '<div><span class="icon_doubt">' + showstr + '</span></div>', '<div class="ui_delete_btns">', '<input type="button" value="取消" class="ui_button_cancel" id="jsconfirmcancel" /><input type="button" id="jsconfirmok" value="确定" class="ui_button" />', '</div>', '</div>', '</div>'];
    var obj = $("#" + id);
    if (obj.size() <= 0) {
      $("body").append(html.join(''));
      obj = $("#" + id);
    } else {
      $(obj).find(".icon_doubt").html(showstr);
    }
    var layH = 91,
      top = $(document).scrollTop() + y - 100;
    $(obj).css("top", top + "px");
    var msg_width = $(".ui_delete").width();
    var left = x;
    var sleft = $(document).scrollLeft();
    if (x - sleft < msg_width) {
    } else {
      left = x - msg_width / 2;
    }
    var th = $(document).width();
    if ((left + msg_width) > th) {
      left = th - msg_width - 20;
    }
    if (left <= 0) left = 20;
    $(obj).hide();
    $(obj).css({
      left: left,
      top: top + layH
    }).animate({
        height: 'show',
        opacity: 'show',
        top: top
      }, 200);
    $("#jsconfirmcancel").unbind("click").click(function () {
      $(obj).animate({
        height: "hide",
        opacity: 'hide',
        top: top + layH
      }, 200);
    });
    $("#jsconfirmok").unbind("click").click(function (event) {
      ok_callback();
      $(obj).animate({
        height: "hide",
        opacity: 'hide',
        top: top + layH
      }, 200);
    });
  };
  var ttt = new t();
  $(document).scroll(function () {
    ttt.scroll_show();
  });
  return ttt;
})();
var _ajax = {
  "ajaxurl": "/users/ajax",
  "get": function (action, data, callback) {
    var rnd = (+new Date());
    $.get(_ajax.ajaxurl + "?act=" + action + "&rnd=" + rnd, data, callback);
  },
  getJSON: function (action, data, callback) {
    var rnd = (+new Date());
    $.getJSON(_ajax.ajaxurl + "?act=" + action + "&rnd=" + rnd, data, callback);
  },
  post: function (action, data, cb) {
    data = $.merge(data, {
      type: "POST"
    });
    $.post(_ajax.ajaxurl + "?action=" + action, data, cb);
  }
};

function islogin(okcb, errcb, isnotasync) {
  errcb = errcb || ajaxlogin;
  var url = "/api.php?action=islogin&rnd=" + (+new Date());
  if (!isnotasync) {
    $.getJSON(url, function (json) {
      if (!json) {
        errcb && errcb();
      }
      if (json.result == 'ok') {
        if (typeof comment != 'undefined') comment.setUid(json.data.uid);
        okcb && okcb(json.data);
      } else {
        errcb && errcb(json.data);
      }
    });
    return;
  }
  var issucc = false;
  $.ajax({
    url: url,
    dataType: 'json',
    async: false,
    success: function (json) {
      if (!json) {
        errcb && errcb();
        issucc = false;
      }
      if (json.result == 'ok') {
        okcb && okcb(json.data);
        issucc = true;
      } else {
        errcb && errcb(json.data);
        issucc = false;
      }
    }
  });
  return issucc;
}
String.prototype.gbtrim = function (len, s) {
  var str = '';
  var sp = s || '';
  var len2 = 0;
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
      len2 += 2;
    } else {
      len2++;
    }
  }
  if (len2 <= len) {
    return this;
  }
  len2 = 0;
  len = (len > sp.length) ? len - sp.length : len;
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
      len2 += 2;
    } else {
      len2++;
    }
    if (len2 > len) {
      str += sp;
      break;
    }
    str += this.charAt(i);
  }
  return str;
}
$(function () {
  var ishaveAutoTextarea = $(".auto_text").size() > 0;
  var auto_add_shadow = function () {
    $("body").append("<textarea id='auto_text_shadow' style='display:block;'></textarea>");
  };
  if (ishaveAutoTextarea) {
    auto_add_shadow();
  }
  var chg = function (srcobj) {
    if ($(".auto_text").size()) auto_add_shadow();
    var thiz = srcobj || $(".auto_text");
    var srcid = "auto_text_shadow";
    var shadow = $("#" + srcid);
    if (srcid == $(thiz).attr("id")) return;
    $(shadow).width($(thiz).width());
    var fontsize = $(thiz).css("font-size");
    var lineheight = $(thiz).css("line-height");
    var indent = $(thiz).css("text-indent");
    var min_height = parseInt($(thiz).css("min-height").replace(/px/, ''));
    min_height = lineheight;
    $(shadow).css({
      "height": "18px",
      "font-size": fontsize,
      "text-indent": indent
    });
    var textval = $(thiz).val() + "穷游";
    $(shadow).val(textval);
    setTimeout(function () {
      var nh = $(shadow).get(0).scrollHeight;
      if (nh <= min_height) nh = min_height;
      $(thiz).height(nh);
    }, 1);
  };
  $(".auto_text").live("change", function () {
    chg(this);
  });
  $(".auto_text").live("keydown", function () {
    chg(this);
  });
  $(".auto_text").live("keyup", function () {
    chg(this);
  });
  window.resizeTextareaHeight = chg;
});

function yjbGetCookie(objName) {
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] == objName) return unescape(temp[1]);
  }
}

function yjbSetCookie(name, value) {
  var Days = 1;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";domain=.qyer.com;expires=" + exp.toGMTString();
}

function closeAppPup() {
  yjbSetCookie('apppopup', '1');
  $("#apppopup_bg").hide();
  pupclose();
}
var thiswin = this;

function spam_text_filter() {
  var reg = /(http:\/\/)?[\w\.]*\.?(mafengwo\.cn|mafengwo\.com|mafengwo\.net)[a-zA-Z\/0-9&\?\.#\-_]*/gim;
  $(".qyer_spam_text_filter a").each(function () {
    if (($(this).html() + $(this).attr("href")).indexOf("mafengwo.cn") != -1 || ($(this).html() + $(this).attr("href")).indexOf("mafengwo.com") != -1 || ($(this).html() + $(this).attr("href")).indexOf("mafengwo.net") != -1) {
      $(this).remove();
    }
  });
  $(".qyer_spam_text_filter").each(function () {
    var html = $(this).html();
    html = html.replace(/\<script.*?\>document\.write\(AC_FL_RunContent.*?\<\/script\>/gim, "");
    var p = html.match(/\<img[\s\S]*?\>/gim);
    if (p != null) {
      for (var i = 0; i < p.length; i++) {
        html = html.replace(p[i], "[imgimg]" + i + "[/imgimg]");
      }
    }
    html = html.replace(reg, "");
    if (p != null) {
      for (var i = 0; i < p.length; i++) {
        html = html.replace("[imgimg]" + i + "[/imgimg]", p[i]);
      }
    }
    $(this).html(html);
  });
}
$(function ($) {
  if (top != thiswin) {
    return;
  }
  var url = window.location.href;
  if (url.indexOf("m.qyer.com") != -1) {
    return;
  }
  if (yjbGetCookie('_surveyed') == '1' || yjbGetCookie('surveyed') == '1') {
    return;
  }
  var rand = Math.random();
  if (parseInt(rand * 100) != 65) {
    return;
  }
  $.getJSON("http://feed.qyer.com/index/survey?callback=?", function (data) {
    if (data.show) {
      var dialog_html = '<div style="width:520px;">' + '<div class="ui_pupBox_head">欢迎参与穷游调查</div>' + '<div class="ui_pupBox_content" style="background:url(http://static.qyer.com/images/common/wenjuan/qyer_wenjuan_bg.png) no-repeat;padding-left:160px;">' + '<div class="f14 p10 pb20">' +
        data.survey_content + '</div>' + '<div class="ui_pupBox_foot clearfix" style="padding:0;">' + '<a class="ui_button fr" target="_blank" id="to_survey" href="' + data.survey_url + '">参与调查</a>' + '<input type="button" onclick="javascript:pupclose();" class="ui_button_cancel fr mr10" value="不参与">' + '</div>' + '</div>' + '</div>';
      popup.showHtml(dialog_html, 520);
    }
  });
  $("#to_survey").live('click', function () {
    var exp = new Date();
    exp.setTime(exp.getTime() + 365 * 24 * 60 * 60 * 1000);
    document.cookie = "surveyed=1;domain=.qyer.com;expires=" + exp.toGMTString();
    pupclose();
    return true;
  });
});

function loadjscssfile(filename, filetype) {
  if (filetype == "js") {
    var fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
    fileref.setAttribute("src", filename);
  } else if (filetype == "css") {
    var fileref = document.createElement('link');
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
  }
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}
$(function () {
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  };
  var query = getQueryString("targetobj");
  if (query != null) {
    if (query != "login" || query != "reg") {
      query = "reg";
    }
    if (/^http:\/\/bbs\.qyer\.com\//.test(window.location.href)) {
      ajaxlogin(0, '', 'bbsajax.php', 'reload', query, window.location.href);
    } else {
      ajaxlogin(0, '', 'ajax.php', 'reload', query, window.location.href);
    }
  }
});

function getCookie(name) {
  var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

function setCookie(name, value) {
  var Days = 365;
  document.cookie = name + "=" + escape(value) + "; path=/;domain=ask.qyer.com";
}

loadjscssfile("/js/jquery.cookie.js", "js");

function getABFromGuid() {
  var re = new RegExp("(^| )_guid=([^;]*)(;|$)", "i");
  var matcharr = document.cookie.match(re);
  var _guid = matcharr[2];
  if (_guid == '')
    return 'b';
  var endchar = _guid.substr(_guid.length - 1, 1).toLowerCase();
  var endnum = parseInt("0x" + endchar);
  if (endnum > 0x7) {
    return 'b';
  }
  return 'a';
}