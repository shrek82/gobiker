var PasswordStrength = {
  Level: ["5", "4", "3", "2", "1"],
  LevelValue: [36, 20, 12, 8, 1],
  Factor: [1, 1, 1, 2],
  KindFactor: [2, 6, 12, 20],
  Regex: [/\d/g, /[a-z]/g, /[A-Z]/g, /[^a-zA-Z0-9]/g]
}
PasswordStrength.StrengthValue = function (pwd) {
  var strengthValue = 0;
  var ComposedKind = 0;
  for (var i = 0; i < this.Regex.length; i++) {
    var chars = pwd.match(this.Regex[i]);
    if (chars != null) {
      strengthValue += chars.length * this.Factor[i];
      ComposedKind++;
    }
  }
  strengthValue += this.KindFactor[ComposedKind - 1];
  return strengthValue;
}
PasswordStrength.StrengthLevel = function (pwd) {
  if (pwd.length < 6) {
    return '1';
  }
  var cf = 0;
  carr = Array();
  for (i = 0; i < pwd.length; i++) {
    carr[i] = pwd[i];
  }
  carr = carr.delRepeat();
  if (carr.length < 2) {
    return '2';
  }
  var value = this.StrengthValue(pwd);
  for (var i = 0; i < this.LevelValue.length; i++) {
    if (value >= this.LevelValue[i])
      return this.Level[i];
  }
}
Array.prototype.delRepeat = function () {
  var newArray = [];
  var provisionalTable = {};
  for (var i = 0, item;
       (item = this[i]) != null; i++) {
    var s = typeof (item) + item;
    if (!provisionalTable[s]) {
      newArray.push(item);
      provisionalTable[s] = true;
    }
  }
  return newArray;
}

//注册与绑定
var loginReg = function () {

  var file = '/users/ajax';
  var name_is_valid = false;
  var _this = this;

  //这个是干什么的？
  this.fun1 = function () {
    // user js
    $(".address_process div:last").css("margin", "0");
// user input tag
    $(".infoform ul li").find("input").bind("focus",function () {
      $(this).nextAll(".ulayouttag").show();
      $(this).nextAll(".txttag").hide();
      $(this).addClass("txtfocus");
      $(this).removeClass("txterror");
    }).bind("blur",function () {
        $(this).nextAll(".ulayouttag").hide();
        $(this).removeClass("txtfocus");
      }).bind("keyup",function () {
        $(this).nextAll(".ulayouttag").show();
      }).mouseover(function () {
        $(this).addClass("txthover");
      }).mouseout(function () {
        $(this).removeClass("txthover");
      });
    $(".useryzmtxt").bind("focus", function () {
      $(".infoformyzm").next(".txttag").hide();
    });
  }

  //绑定窗口
  this.resize_window = function () {

  }

  //定义输入验证方法
  this.check = {
    //验证邮箱地址输入
    email: function (email) {
      if (email.length == 0) {
        _this.showError('reg_email', "请输入email");
        return false;
      }
      _this.showloading("reg_email");
      if (email.indexOf('_') == 0) {
        _this.showError('reg_email', "请不要以下划线开头");
        return false;
      }
      var res = /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
      if (!res.test(email)) {
        _this.showError('reg_email', "email格式不正确");
        return false;
      }
      $.ajax({
        url: file + "?act=checkemail",
        type: 'POST',
        typeDate: 'json',
        data: 'email=' + email,
        success: function (res) {
          if (res.error) {
            _this.showError('reg_email', res.msg);
            $("#reg_submit").attr("disabled", "disabled").val('请重试');
            return false;
          } else {
            _this.showSuccess('reg_email');
            $("#reg_submit").attr("disabled", false).val('立即注册');
            return true;
          }
        }
      });
      _this.showSuccess('reg_email');
      return true;
    },
    //验证用户名输入
    username: function (username) {
      var len = $('#reg_username').val().length;
      if (len == 0) {
        return _this.showError('reg_username', "请输入用户名");
      }
      if (len < 3) {
        return _this.showError('reg_username', "用户名最少3个字符");
      }
      for (var i = 0; i < username.length; i++) {
        var reg = /^[^a-zA-Z0-9_]+$/;
        if (reg.test(username) && (username.charCodeAt(i) < 0x4E00 || username.charCodeAt(i) > 0x9FA5)) {
          return _this.showError('reg_username', "使用中文、英文、数字、下划线,最大15个字符");
        }
      }
      _this.showloading("reg_username");
      if (username.indexOf('_') == 0) {
        _this.showError('reg_email', "请不要以下划线开头");
        return false;
      }
      name_is_valid = false;
      $.ajaxSetup({
        async: false
      });

      $.ajax({
        url: file + "?act=checkusername&username=" + encodeURI(username),
        type: "GET",
        dataType: "json",
        success: function (res) {
          if (res.error) {
            name_is_valid = false;
            return _this.showError('reg_username', res.msg);
          } else {
            name_is_valid = true;
          }
        }
      });

      $.ajaxSetup({
        async: true
      });

      if (name_is_valid) {
        return _this.showSuccess('reg_username')
      } else {
        return false;
      }
    },
    //验证密码输入
    password: function (password) {
      if (0 >= password.length) {
        return _this.showError('reg_password', "请输入登录密码");
      }
      if (6 > password.length) {
        return _this.showError('reg_password', "密码长度6-16位，区分大小写");
      }
      return _this.showSuccess('reg_password');
    },
    repassword: function () {
      var password = $("#reg_password").val();
      var repassword = $("#reg_repassword").val();
      if (6 > password.length) {
        _this.showError('reg_password', "密码长度6-16位，区分大小写");
      }
      if (password != repassword) {
        return _this.showError('reg_repassword', "两次密码不一致");
      }
      return _this.showSuccess('reg_repassword');
    },
    //验证码检查
    verify: function (verify) {
      if (0 == verify.length) {
        return _this.showError('reg_verify', "请填写验证码");
      }
      _this.showloading("reg_verify");
      $.postJSON(file + "?act=checkverify", "is_ajax=1&verify=" + verify, function (res) {
        if ('0' != res.error) {
          return _this.showError('reg_verify', res.msg);
        } else {
          return _this.showSuccess('reg_verify');
        }
      });
      return _this.showSuccess('reg_verify');
    }
  }

  //显示错误
  this.showError = function (id, text) {
    var obj = $("#" + id);
    obj.parents(".input_div").removeClass("i_focus");
    obj.parents(".input_div").removeClass("index11");
    obj.parents(".input_div").removeClass("i_finish");
    obj.parents(".input_div").removeClass("i_focus");
    obj.parents(".input_div").removeClass("i_loading");
    obj.parents(".input_div").addClass("i_error");
    obj.nextAll(".i_tips").html("<div class='i_jt'>箭头</div>" + text).show();
    setTimeout(function () {
      obj.nextAll(".i_tips").fadeOut(100);
    }, 2000);
    return false;
  }

  //显示loading
  this.showloading = function (id) {
    var obj = $("#" + id);
    obj.parents(".input_div").removeClass("i_focus");
    obj.parents(".input_div").removeClass("index11");
    obj.parents(".input_div").removeClass("i_finish");
    obj.parents(".input_div").removeClass("i_focus");
    obj.parents(".input_div").removeClass("i_error");
    obj.parents(".input_div").addClass("i_loading ");
    obj.nextAll(".i_tips").html("").hide();
  }

  //显示成功信息
  this.showSuccess = function (id) {
    var obj = $("#" + id);
    obj.parents(".input_div").addClass("i_focus");
    obj.parents(".input_div").addClass("index11");
    obj.parents(".input_div").removeClass("i_error");
    obj.parents(".input_div").removeClass("i_loading");
    obj.parents(".input_div").removeClass("i_focus");
    obj.parents(".input_div").addClass("i_finish");
    obj.nextAll(".i_tips").html("").hide();
    return true;
  }


  //显示提示
  this.showtips = function (id) {
    var obj = $("#" + id);
    if (obj.nextAll(".i_tips").html() != '') {
      obj.nextAll(".i_tips").show();
    }
  }

  //隐藏提示
  this.hidetips = function (id, id2) {
    var obj = $("#" + id);
    obj.nextAll(".i_tips").hide();
    var obj2 = $("#" + id2);
    obj2.nextAll(".i_tips").hide();
  }

  this.timeouttips = function (id) {
    var obj = $("#" + id);
    obj.nextAll(".i_tips").hide();
  }

  this.resetVerify = function () {
    var url = file + '?act=captcha&_'
    $("#refucaptcha").attr("src", function () {
      var t = Math.round(new Date().getTime());
      return url + t;
    });
  }

  //为注册第一步绑定验证
  this.check_email = function () {

    $("#reg_email").blur(function () {
      var email = $(this).val();
      return _this.check.email(email);
    });
  }

  //为注册第二部绑定验证
  this.check_name_pws = function () {
    $("#reg_username").blur(function () {
      var username = $(this).val();
      return _this.check.username(username);
    });
    $("#reg_password").blur(function () {
      var password = $(this).val();
      return _this.check.password(password);
    });
    $("#reg_repassword").blur(function () {
      var repassword = $(this).val();
      return _this.check.repassword(repassword);
    });
    $("#reg_username").focus(function () {
      _this.hidetips("reg_password", "reg_repassword");
    });
    $("#reg_password").focus(function () {
      _this.hidetips("reg_username", "reg_repassword");
    });
    $("#reg_repassword").focus(function () {
      _this.hidetips("reg_password", "reg_username");
    });
    $("#reg_username").hover(function () {
      _this.showtips("reg_username");
    });
    $("#reg_password").hover(function () {
      _this.showtips("reg_password");
    });
    $("#reg_repassword").hover(function () {
      _this.showtips("reg_repassword");
    });
    $(".i_zt").hover(function () {
      if ($(this).next("span").html() != "") {
        $(this).next("span").show();
      }
    });
    $(".i_zt").mouseleave(function () {
      $(this).next("span").hide();
    });
    $("#reg_email").hover(function () {
      _this.showtips("reg_email");
    });
    $("#reg_email").mouseleave(function () {
      _this.timeouttips("reg_email");
    });
    $("#reg_username").mouseleave(function () {
      _this.timeouttips("reg_username");
    });
    $("#reg_password").mouseleave(function () {
      _this.timeouttips("reg_password");
    });
    $("#reg_repassword").mouseleave(function () {
      _this.timeouttips("reg_repassword");
    });
  }

  //绑定提交按钮和同意注册协议按钮（激活帐号）
  this.bindActiveButton = function () {

    $("#reg_checkbox_agree").live("click", function () {
      if ($(this).attr("checked")) {
        $("#reg_submit").attr("disabled", false);
        $("#reg_submit").removeClass("ui_btn_big_disabled").addClass("ui_btn_big");
      } else {
        $("#reg_submit").attr("disabled", "disabled");
        $("#reg_submit").removeClass("ui_btn_big").addClass("ui_btn_big_disabled");
      }
    });

    $("#reg_submit").live('click', function () {
      var email = $("#reg_email").val();
      if (!_this.check.email(email)) {
        return false;
      }
      $("#reg_submit").removeClass("ui_btn_big").addClass("ui_btn_big_load");
      var reg_test = $("#reg_submit").val();
      $("#reg_submit").val("");
      $.ajax({
        url: file + "?act=sendmail",
        type: 'POST',
        dataType: 'html',
        data: 'email=' + email,
        success: function (res) {
          $("#content_reg_email").html(res);
        }
      });
      return false;
    });
  }

  //绑定注册按钮
  this.bindCreateForm = function () {

    $('#regist_form').bind("submit", function (e) {
      e.preventDefault();
      var password = $("#reg_password").val();
      var username = $("#reg_username").val();
      if (!_this.check.username(username)) {
        return false;
      }
      if (6 > password.length) {
        return _this.showError('reg_password', "密码长度6-16位，区分大小写");
      }
      if (!_this.check.repassword()) {
        return false;
      }
      new ajaxForm($(this), {
        dataType: 'json'
      }).send();
    });
  }
}


$(function () {

  //绑定重发激活邮件
  var sentemail = 0;
  $("#resentcode a").live("click", function () {
    var temp = $("#resentcode").html();
    var code = $("#codedata").attr("code");
    if (code == undefined) {
      return false;
    }
    if (sentemail < 3) {
      popup.coast(250, '', {
        text: '发送邮件成功！'
      });
    }
    $.post(file + "?act=resentcode", {
      code: code
    }, function (res) {
      if (res.error == 0) {
        sentemail++;
        if (sentemail >= 3) {
          $("#resentcode").html('<a href="javascript:void(0);" class="cLightgray">重新发送验证邮件</a><span class="cRed_caution">操作过于频繁，请稍后再试！</span>');
          setTimeout(function () {
            $("#resentcode").html(temp);
          }, 10000);
          sentemail = 0;
        }
      }
    }, "json");
  });
})
;
