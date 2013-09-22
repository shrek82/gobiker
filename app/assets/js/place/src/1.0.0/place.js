define(function (require, exports, module) {

  var lib = require('lib');

  require('slides')($);

  //目的地导航
  $(".gui_nav_item").hover(function(){
    $(this).addClass("gui_nav_item_current");
  },function(){
    $(this).removeClass("gui_nav_item_current");
  });

  //滚动焦点图
  $("#gui_focus").slides({
    play: 5000,
    pause: 2500,
    hoverPause: true
  });

  $(document).click(function(){
    if($("#jn_search_drop").is(":visible")){
      $("#jn_search_drop").hide();
    }
  });
  $("#jn_search_drop").click(function(event){
    event.stopPropagation();
  });
  $("#jn_search_input").click(function(event){
    if($(this).val() != $(this).attr("placeholder") && $(this).val() != ""){
      $("#jn_search_drop").show();
    }
    event.stopPropagation();
  });


});