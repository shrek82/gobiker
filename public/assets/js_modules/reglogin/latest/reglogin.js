/*! reglogin(1.0.0) - JianGang Zhao <zhaojiangang@gmail.com> - 2013-12-13 20:33:19*/
define("reglogin/latest/reglogin", [ "lib/latest/lib", "./login", "./register" ], function(require, exports, module) {
    var lib = require("lib/latest/lib");
    exports.login = require("./login");
    exports.register = require("./register");
});

define("reglogin/latest/login", [ "lib/latest/lib" ], function(require, exports, module) {
    var lib = require("lib/latest/lib");
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

define("reglogin/latest/register", [], function(require, exports, module) {
    var reg = {
        email_is_valid: false,
        //显示错误
        showError: function(id, text) {
            var obj = $("#" + id);
            obj.parents(".input_div").removeClass("i_focus i_finish i_loading ").addClass("i_error");
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
            obj.parents(".input_div").removeClass("i_focus i_finish i_focus i_error").addClass("i_loading");
            obj.parent().find(".i_tips").html("").hide();
        },
        //显示成功信息
        showSuccess: function(id) {
            var obj = $("#" + id);
            obj.parents(".input_div").removeClass("i_error i_loading").addClass("i_focus i_finish");
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
                var verified = false;
                $.ajax({
                    url: "/users/ajax?act=checkemail",
                    type: "POST",
                    typeDate: "json",
                    async: false,
                    data: "email=" + email,
                    beforeSend: function() {
                        reg.showloading("reg_email");
                    },
                    success: function(res) {
                        if (res.error) {
                            reg.showError("reg_email", res.error);
                        } else {
                            verified = true;
                            reg.showSuccess("reg_email");
                        }
                    }
                });
                return verified;
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
        //提交激活邮件账号进入发送
        bindActiveButton: function(e) {
            var $submit_button = $("#reg_submit");
            //绑定注册协议
            $("#reg_checkbox_agree").live("click", function() {
                if ($(this).attr("checked")) {
                    $submit_button.attr("disabled", false);
                } else {
                    $submit_button.attr("disabled", true);
                }
            });
            //绑定注册提交按钮
            $("#reg_form").live("submit", function(e) {
                e.preventDefault();
                $submit_button.attr("disabled", true).val("提交中...");
                var email = $("#reg_email").val();
                if (!reg.check.email(email)) {
                    $submit_button.attr("disabled", false).val("重试");
                    return false;
                }
                //发送激活邮件
                $.ajax({
                    url: "/users/ajax?act=sendmail",
                    type: "POST",
                    dataType: "html",
                    data: "_format=html&email=" + email,
                    success: function(res) {
                        setTimeout(function() {
                            $("#content_reg_email").html(res);
                            reg.reRendActiveMail();
                        }, 500);
                    }
                });
            });
        },
        //绑定重发激活邮件
        reRendActiveMail: function() {
            $("#resentcode a").live("click", function() {
                var $resenda = $(this);
                $.ajax({
                    url: "/users/ajax?act=resentcode",
                    type: "POST",
                    dataType: "json",
                    data: "email=" + $(this).attr("to"),
                    beforeSend: function() {
                        $resenda.html("正在重发激活邮件...");
                    },
                    success: function(res) {
                        $resenda.html("激活有点发送成功!");
                    }
                });
            });
        },
        //验证用户名和密码
        check_name_pws: function() {
            $("#reg_username").blur(function() {
                var username = $(this).val();
                return reg.check.username(username);
            });
            $("#reg_password").blur(function() {
                var password = $(this).val();
                return reg.check.password(password);
            });
            $("#reg_repassword").blur(function() {
                var repassword = $(this).val();
                return reg.check.repassword(repassword);
            });
            $("#reg_username").focus(function() {
                reg.hidetips("reg_password", "reg_repassword");
            });
            $("#reg_password").focus(function() {
                reg.hidetips("reg_username", "reg_repassword");
            });
            $("#reg_repassword").focus(function() {
                reg.hidetips("reg_password", "reg_username");
            });
            $("#reg_username").hover(function() {
                reg.showtips("reg_username");
            });
            $("#reg_password").hover(function() {
                reg.showtips("reg_password");
            });
            $("#reg_repassword").hover(function() {
                reg.showtips("reg_repassword");
            });
            $(".i_zt").hover(function() {
                if ($(this).next("span").html() != "") {
                    $(this).next("span").show();
                }
            });
            $(".i_zt").mouseleave(function() {
                $(this).next("span").hide();
            });
            $("#reg_email").hover(function() {
                reg.showtips("reg_email");
            });
            $("#reg_email").mouseleave(function() {
                reg.timeouttips("reg_email");
            });
            $("#reg_username").mouseleave(function() {
                reg.timeouttips("reg_username");
            });
            $("#reg_password").mouseleave(function() {
                reg.timeouttips("reg_password");
            });
            $("#reg_repassword").mouseleave(function() {
                reg.timeouttips("reg_repassword");
            });
        },
        //绑定注册按钮
        bindCreateForm: function() {
            $("#regist_form").bind("submit", function(e) {
                e.preventDefault();
                var password = $("#reg_password").val();
                var username = $("#reg_username").val();
                if (!reg.check.username(username)) {
                    return false;
                }
                if (5 > password.length) {
                    return reg.showError("reg_password", "密码长度5-16位，区分大小写");
                }
                if (!reg.check.repassword()) {
                    return false;
                }
                new lib.ajaxForm("regist_form", {
                    dataType: "json"
                }).send();
            });
        }
    };
    module.exports = reg;
});
