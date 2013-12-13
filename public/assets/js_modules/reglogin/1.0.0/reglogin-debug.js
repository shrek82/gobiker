/*! reglogin(1.0.0) - JianGang Zhao <zhaojiangang@gmail.com> - 2013-12-13 10:18:37*/
define("reglogin/1.0.0/reglogin-debug", [ "lib/latest/lib-debug", "./login-debug", "./register-debug" ], function(require, exports, module) {
    var lib = require("lib/latest/lib-debug");
    exports.login = require("./login-debug");
    exports.register = require("./register-debug");
});

define("reglogin/1.0.0/login-debug", [ "lib/latest/lib-debug" ], function(require, exports, module) {
    var lib = require("lib/latest/lib-debug");
    //用户登录注册等方法
    var user = {};
    module.exports = user;
    //绑定登录
    user.bindLoginForm = function() {
        $("#login_form").bind("submit", function(e) {
            e.preventDefault();
            new lib.ajaxForm("login_form", {
                dataType: "json",
                successLabel: "登录成功",
                sendingLabel: "验证中..",
                errorLabel: "重试登录",
                callback: function() {
                    window.location.href = $("#previous_url").val();
                }
            }).send();
        });
    };
});

define("reglogin/1.0.0/register-debug", [], function(require, exports, module) {
    var reg = {
        email_is_valid: false,
        //显示错误
        showError: function(id, text) {
            var obj = $("#" + id);
            obj.parents(".input_div").removeClass("i_focus index11 i_finish i_loading").addClass("i_error");
            obj.parent().find(".i_tips").html("<div class='i_jt'>箭头</div>" + text).fadeIn(400, function() {
                setTimeout(function() {
                    $(this).fadeOut(200);
                }, 5e3);
            });
            return false;
        },
        //显示loading
        showloading: function(id) {
            var obj = $("#" + id);
            obj.parents(".input_div").removeClass("i_focus index11 i_finish i_focus i_error").addClass("i_loading");
            obj.parent().find(".i_tips").html("").hide();
        },
        //显示成功信息
        showSuccess: function(id) {
            var obj = $("#" + id);
            obj.parents(".input_div").removeClass("i_error i_loading").addClass("i_focus index11 i_finish");
            obj.parent().find(".i_tips").html("").hide();
            return true;
        },
        //显示提示
        showtips: function(id) {
            var obj = $("#" + id);
            if (obj.nextAll(".i_tips").html() != "") {
                obj.nextAll(".i_tips").show();
            }
        },
        //隐藏提示
        hidetips: function(id, id2) {
            var obj = $("#" + id);
            obj.nextAll(".i_tips").hide();
            var obj2 = $("#" + id2);
            obj2.nextAll(".i_tips").hide();
        },
        timeouttips: function(id) {
            var obj = $("#" + id);
            obj.nextAll(".i_tips").hide();
        },
        resetVerify: function() {
            var url = "/users/ajax?act=captcha&_";
            $("#refucaptcha").attr("src", function() {
                var t = Math.round(new Date().getTime());
                return url + t;
            });
        },
        //定义输入验证方法
        check: {
            //验证邮箱地址输入
            email: function(email) {
                if (email.length == 0) {
                    reg.showError("reg_email", "请输入email");
                    return false;
                }
                if (email.indexOf("_") == 0) {
                    reg.showError("reg_email", "请不要以下划线开头");
                    return false;
                }
                var res = /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
                if (!res.test(email)) {
                    reg.showError("reg_email", "email格式不正确");
                    return false;
                }
                //验证帐号是否被注册
                reg.showloading("reg_email");
                $.ajax({
                    url: "/users/ajax?act=checkemail",
                    type: "POST",
                    typeDate: "json",
                    data: "email=" + email,
                    success: function(res) {
                        if (res.error) {
                            reg.showError("reg_email", res.error);
                            $("#reg_submit").attr("disabled", "disabled").val("请重试");
                            return false;
                        } else {
                            reg.showSuccess("reg_email");
                            $("#reg_submit").attr("disabled", false).val("立即注册");
                        }
                    }
                });
                reg.showSuccess("reg_email");
                reg.email_is_valid = true;
                return true;
            },
            //验证用户名输入
            username: function(username) {
                var len = $("#reg_username").val().length;
                if (len == 0) {
                    return reg.showError("reg_username", "请输入用户名");
                }
                if (len < 3) {
                    return reg.showError("reg_username", "用户名最少3个字符");
                }
                for (var i = 0; i < username.length; i++) {
                    var reg = /^[^a-zA-Z0-9_]+$/;
                    if (reg.test(username) && (username.charCodeAt(i) < 19968 || username.charCodeAt(i) > 40869)) {
                        return reg.showError("reg_username", "使用中文、英文、数字、下划线,最大15个字符");
                    }
                }
                reg.showloading("reg_username");
                if (username.indexOf("_") == 0) {
                    reg.showError("reg_email", "请不要以下划线开头");
                    return false;
                }
                name_is_valid = false;
                $.ajaxSetup({
                    async: false
                });
                $.ajax({
                    url: "/users/ajax?act=checkusername",
                    type: "POST",
                    data: "username=" + encodeURI(username),
                    dataType: "json",
                    success: function(res) {
                        if (res.error) {
                            name_is_valid = false;
                            return reg.showError("reg_username", res.error);
                        } else {
                            name_is_valid = true;
                        }
                    }
                });
                $.ajaxSetup({
                    async: true
                });
                if (name_is_valid) {
                    return reg.showSuccess("reg_username");
                } else {
                    return false;
                }
            },
            //验证密码输入
            password: function(password) {
                if (0 >= password.length) {
                    return reg.showError("reg_password", "请输入登录密码");
                }
                if (5 > password.length) {
                    return reg.showError("reg_password", "密码长度5-16位，区分大小写");
                }
                return reg.showSuccess("reg_password");
            },
            repassword: function() {
                var password = $("#reg_password").val();
                var repassword = $("#reg_repassword").val();
                if (5 > password.length) {
                    reg.showError("reg_password", "密码长度5-16位，区分大小写");
                }
                if (password != repassword) {
                    return reg.showError("reg_repassword", "两次密码不一致");
                }
                return reg.showSuccess("reg_repassword");
            },
            //验证码检查
            verify: function(verify) {
                if (0 == verify.length) {
                    return reg.showError("reg_verify", "请填写验证码");
                }
                reg.showloading("reg_verify");
                $.postJSON("/users/ajax?act=checkverify", "is_ajax=1&verify=" + verify, function(res) {
                    if ("0" != res.error) {
                        return reg.showError("reg_verify", res.error);
                    } else {
                        return reg.showSuccess("reg_verify");
                    }
                });
                return reg.showSuccess("reg_verify");
            }
        },
        //为注册第一步绑定验证
        bind_check_email: function() {
            $("#reg_email").blur(function() {
                var email = $(this).val();
                if (!reg.check.email(email)) {
                    $("#reg_submit").attr("disabled", false).val("重试");
                    return false;
                } else {
                    return true;
                }
            });
        },
        //提交激活邮件账号进入发送
        bindActiveButton: function() {
            //注册协议
            $("#reg_checkbox_agree").live("click", function() {
                if ($(this).attr("checked")) {
                    $("#reg_submit").attr("disabled", false);
                } else {
                    $("#reg_submit").attr("disabled", true);
                }
            });
            //绑定注册提交按钮
            $("#reg_submit").live("click", function() {
                var email = $("#reg_email").val();
                if (!reg.email_is_valid) {
                    return false;
                }
                $.ajax({
                    url: "/users/ajax?act=sendmail",
                    type: "POST",
                    dataType: "html",
                    data: "_format=html&email=" + email,
                    beforeSend: function() {
                        $(this).attr("disabled", true).val("正在发送激活邮件...");
                    },
                    success: function(res) {
                        $("#content_reg_email").html(res);
                        reg.reRendActiveMail();
                        console.log("reRendActiveMail");
                    },
                    error: function() {}
                });
                return false;
            });
        },
        //绑定重发激活邮件
        reRendActiveMail: function() {
            $("#resentcode a").live("click", function() {
                $.ajax({
                    url: "/users/ajax?act=resentcode",
                    type: "POST",
                    dataType: "json",
                    data: "email=" + $(this).attr("to"),
                    beforeSend: function() {
                        $(this).html("正在重发激活邮件...");
                    },
                    success: function(res) {
                        $(this).html("激活有点发送成功!");
                    }
                });
                console.log("send mail");
            });
        }
    };
    module.exports = reg;
});
