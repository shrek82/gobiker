define(function (require, exports, module) {

  var lib = require('lib');

  require('slides')($);

  //悬浮登陆框
  var objTop = $("#_jslogintips");
  if (objTop.length > 0) {
    objTop.offset().top;
    $(window).scroll(function () {
      var winTop = $(document).scrollTop();
      //console.log(winTop);
      if (winTop > objTop) {
        if ((typeof ActiveXObject != "undefined") && (typeof XMLHttpRequest == "undefined")) {
          $(".ind_slogan2").css({"position": "absolute", "top": winTop});
        }
        else {
          $(".ind_slogan2").css({"position": "fixed", "top": "0"});
        }

      }
      else {
        $(".ind_slogan2").css({"position": "", "top": ""});
      }
    });
  }

  //滚动焦点图
  $("#ind_focus").slides({
    play: 5000,
    pause: 2500,
    hoverPause: true
  });



});