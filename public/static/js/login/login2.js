if (typeof (jQuery.postJSON) == 'undefined') {
    jQuery.postJSON = function (url, data, success) {
        return jQuery.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "json",
            success: success
        });
    };
}
jQuery(function () {
    function marCenter() {
        jQuery(".reg_cnt").css("margin-top", "0");
        var bodyH = jQuery("body").height();
        var bodyW = jQuery("body").width();
        var regH = jQuery(".reg_cnt").height();
        var headH = jQuery(".qyer_header_fixed").height();
        var regMar = bodyH - regH - headH;
        jQuery(".reg_cnt").css("margin-top", regMar / 2);
        jQuery(".reg_bg").height(bodyH - headH);
        var $img = jQuery(".reg_bg_img img");
        var imgRatio = $img.width() / $img.height();
        var stdRatio = jQuery(window).width() / jQuery(window).height();
        if (imgRatio > stdRatio) {
            $img.css({
                    top: 0,
                    width: '',
                    height: '100%',
                    left: (jQuery(window).width() - jQuery(window).height() * imgRatio) / 2
                }
            )
        }

        else {
            var offset = (jQuery(window).height() - jQuery(window).width() / imgRatio) * (1 - 0.618);
            var diff = jQuery(window).height() - jQuery(window).width() / imgRatio;
            $img.css({
                width: '100%',
                height: '',
                left: 0,
                top: (offset > diff) ? offset : diff
            })
        }
    }

    marCenter();
    jQuery(window).resize(function () {
        marCenter();
    });
    if (window.location.host == "bbs.qyer.com") {
        file = '/users/ajax/bbsajax';
    } else {
        file = '/users/ajax';
    }
    check_username = false;
    check = {
        email: function (email) {
            if (email.length == 0) {
                showError('reg_email', "请输入email");
                return false;
            }
            showloading("reg_email");
            if (email.indexOf('_') == 0) {
                showError('reg_email', "请不要以下划线开头");
                return false;
            }
            var res = /^([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,6}$/;
            if (!res.test(email)) {
                showError('reg_email', "email格式不正确");
                return false;
            }
            jQuery.postJSON(file + "?action=checkemail", "is_ajax=1&email=" + email, function (res) {
                if ('0' != res.error) {
                    showError('reg_email', res.msg);
                    return false;
                } else {
                    showSuccess('reg_email');
                    return true;
                }
            });
            showSuccess('reg_email');
            return true;
        },
        username: function (username) {
            var len = util.getwordlen(username);
            if (len == 0) {
                return showError('reg_username', "请输入用户名");
            }
            if (len < 3) {
                return showError('reg_username', "用户名最少3个字符");
            }
            for (var i = 0; i < username.length; i++) {
                var reg = /^[^a-zA-Z0-9_]+$/;
                if (reg.test(username) && (username.charCodeAt(i) < 0x4E00 || username.charCodeAt(i) > 0x9FA5)) {
                    return showError('reg_username', "使用中文、英文、数字、下划线,最大15个字符");
                }
            }
            showloading("reg_username");
            if (username.indexOf('_') == 0) {
                showError('reg_email', "请不要以下划线开头");
                return false;
            }
            check_username = false;
            jQuery.ajaxSetup({
                async: false
            });
            jQuery.postJSON(file + "?action=checkusername", "is_ajax=1&username=" + encodeURI(username), function (res) {
                if ('0' != res.error) {
                    check_username = false;
                    return showError('reg_username', res.msg);
                } else {
                    check_username = true;
                }
            });
            jQuery.ajaxSetup({
                async: true
            });
            if (check_username) {
                return showSuccess('reg_username')
            } else {
                return false;
            }
        },
        password: function (password) {
            if (0 >= password.length) {
                return showError('reg_password', "请输入登录密码");
            }
            if (6 > password.length) {
                return showError('reg_password', "密码长度6-16位，区分大小写");
            }
            return showSuccess('reg_password');
        },
        repassword: function () {
            var password = jQuery("#reg_password").val();
            var repassword = jQuery("#reg_repassword").val();
            if (6 > password.length) {
                showError('reg_password', "密码长度6-16位，区分大小写");
            }
            if (password != repassword) {
                return showError('reg_repassword', "两次密码不一致");
            }
            return showSuccess('reg_repassword');
        },
        verify: function (verify) {
            if (0 == verify.length) {
                return showError('reg_verify', "请填写验证码");
            }
            showloading("reg_verify");
            jQuery.postJSON(file + "?action=checkverify", "is_ajax=1&verify=" + verify, function (res) {
                if ('0' != res.error) {
                    return showError('reg_verify', res.msg);
                } else {
                    return showSuccess('reg_verify');
                }
            });
            return showSuccess('reg_verify');
        }
    }

    function showError(id, text) {
        var obj = jQuery("#" + id);
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

    function showloading(id) {
        var obj = jQuery("#" + id);
        obj.parents(".input_div").removeClass("i_focus");
        obj.parents(".input_div").removeClass("index11");
        obj.parents(".input_div").removeClass("i_finish");
        obj.parents(".input_div").removeClass("i_focus");
        obj.parents(".input_div").removeClass("i_error");
        obj.parents(".input_div").addClass("i_loading ");
        obj.nextAll(".i_tips").html("").hide();
    }

    function showSuccess(id) {
        var obj = jQuery("#" + id);
        obj.parents(".input_div").addClass("i_focus");
        obj.parents(".input_div").addClass("index11");
        obj.parents(".input_div").removeClass("i_error");
        obj.parents(".input_div").removeClass("i_loading");
        obj.parents(".input_div").removeClass("i_focus");
        obj.parents(".input_div").addClass("i_finish");
        obj.nextAll(".i_tips").html("").hide();
        return true;
    }

    function hidetips(id, id2) {
        var obj = jQuery("#" + id);
        obj.nextAll(".i_tips").hide();
        var obj2 = jQuery("#" + id2);
        obj2.nextAll(".i_tips").hide();
    }

    function showtips(id) {
        var obj = jQuery("#" + id);
        if (obj.nextAll(".i_tips").html() != '') {
            obj.nextAll(".i_tips").show();
        }
    }

    function timeouttips(id) {
        var obj = jQuery("#" + id);
        obj.nextAll(".i_tips").hide();
    }

    function resetVerify() {
        var url = file + '?action=captcha&_'
        jQuery("#refucaptcha").attr("src", function () {
            var t = Math.round(new Date().getTime());
            return url + t;
        });
    }

    jQuery("._jsrefucaptcha").live("click", function () {
        resetVerify();
    });
    jQuery("#reg_email").blur(function () {
        var email = jQuery(this).val();
        return check.email(email);
    });
    jQuery("#reg_verify").blur(function () {
        var verify = jQuery(this).val();
        return check.verify(verify);
    });
    jQuery("#reg_username").blur(function () {
        var username = jQuery(this).val();
        return check.username(username);
    });
    jQuery("#reg_password").blur(function () {
        var password = jQuery(this).val();
        return check.password(password);
    });
    jQuery("#reg_repassword").blur(function () {
        var repassword = jQuery(this).val();
        return check.repassword(repassword);
    });
    jQuery("#reg_username").focus(function () {
        hidetips("reg_password", "reg_repassword");
    });
    jQuery("#reg_password").focus(function () {
        hidetips("reg_username", "reg_repassword");
    });
    jQuery("#reg_repassword").focus(function () {
        hidetips("reg_password", "reg_username");
    });
    jQuery("#reg_username").hover(function () {
        showtips("reg_username");
    });
    jQuery("#reg_password").hover(function () {
        showtips("reg_password");
    });
    jQuery("#reg_repassword").hover(function () {
        showtips("reg_repassword");
    });
    jQuery(".i_zt").hover(function () {
        if (jQuery(this).next("span").html() != "") {
            jQuery(this).next("span").show();
        }
    });
    jQuery(".i_zt").mouseleave(function () {
        jQuery(this).next("span").hide();
    });
    jQuery("#reg_email").hover(function () {
        showtips("reg_email");
    });
    jQuery("#reg_email").mouseleave(function () {
        timeouttips("reg_email");
    });
    jQuery("#reg_username").mouseleave(function () {
        timeouttips("reg_username");
    });
    jQuery("#reg_password").mouseleave(function () {
        timeouttips("reg_password");
    });
    jQuery("#reg_repassword").mouseleave(function () {
        timeouttips("reg_repassword");
    });
    jQuery("#reg_checkbox_agree").live("click", function () {
        if (jQuery(this).attr("checked")) {
            jQuery("#reg_submit").attr("disabled", false);
            jQuery("#reg_submit").removeClass("ui_btn_big_disabled").addClass("ui_btn_big");
        } else {
            jQuery("#reg_submit").attr("disabled", "disabled");
            jQuery("#reg_submit").removeClass("ui_btn_big").addClass("ui_btn_big_disabled");
        }
    });
    jQuery("#reg_submit").live('click', function () {
        var email = jQuery("#reg_email").val();
        var verify = jQuery("#reg_verify").val();
        var url = jQuery("#reg_refer").val();
        var isencode = jQuery("#reg_iscode").val();
        var encode = 0;
        if (url.length <= 1) {
            url = encodeURIComponent(window.location.href);
            encode = 1;
        }
        if (isencode) {
            encode = 1;
        }
        if (!check.email(email)) {
            return false;
        }
        if (verify != undefined) {
            if (!check.verify(verify)) {
                return false;
            }
        }
        jQuery("#reg_submit").removeClass("ui_btn_big").addClass("ui_btn_big_load");
        var reg_test = jQuery("#reg_submit").val();
        jQuery("#reg_submit").val("");
        jQuery.post(file + "?action=step2", {
            email: email,
            verify: verify,
            url: url,
            encode: encode
        }, function (res) {
            if (res.error != 0) {
                jQuery("#reg_submit").val(reg_test);
                jQuery("#reg_submit").removeClass("ui_btn_big_load").addClass("ui_btn_big");
            }
            if ('-4' == res.error) {
                showError('reg_email', res.msg);
            } else if ('-6' == res.error) {
                showError('reg_email', res.msg);
            } else if ('-9' == res.error) {
                showError('reg_verify', res.msg);
            } else if ('0' == res.error) {
                jQuery("#content_reg_email").html(res.msg);
                if (file == "/user/ajax") {
                    //var baiduurl = "http://qt.qyer.com/beacon.gif?type=click&category=drw-2-popup&campaign=inpage&referer=" + encodeURIComponent(window.location.href) + "&referer_link=" + encodeURIComponent(document.referrer) + "&guid=" + getCookie("_guid") + "&user_id=0&session=" + getCookie("_session");
                } else {
                    //var baiduurl = "http://qt.qyer.com/beacon.gif?type=click&category=drpb-2-popup&campaign=inpage&referer=" + encodeURIComponent(window.location.href) + "&referer_link=" + encodeURIComponent(document.referrer) + "&guid=" + getCookie("_guid") + "&user_id=0&session=" + getCookie("_session");
                }
                //jQuery.get(baiduurl, function (data) {
                //});
            } else {
            }
        }, "json");
        return false;
    });
    jQuery("#registform").submit(function () {
        var password = jQuery("#reg_password").val();
        var username = jQuery("#reg_username").val();
        if (!check.username(username)) {
            return false;
        }
        if (6 > password.length) {
            return showError('reg_password', "密码长度6-16位，区分大小写");
        }
        if (!check.repassword()) {
            return false;
        }
    });
    var sentemail = 0;
    jQuery("#resentcode a").live("click", function () {
        var temp = jQuery("#resentcode").html();
        var code = jQuery("#codedata").attr("code");
        if (code == undefined) {
            return false;
        }
        if (sentemail < 3) {
            popup.coast(250, '', {
                text: '发送邮件成功！'
            });
        }
        jQuery.post(file + "?action=resentcode", {
            code: code
        }, function (res) {
            if (res.error == 0) {
                sentemail++;
                if (sentemail >= 3) {
                    jQuery("#resentcode").html('<a href="javascript:void(0);" class="cLightgray">重新发送验证邮件</a><span class="cRed_caution">操作过于频繁，请稍后再试！</span>');
                    setTimeout(function () {
                        jQuery("#resentcode").html(temp);
                    }, 10000);
                    sentemail = 0;
                }
            }
        }, "json");
    });
})
;