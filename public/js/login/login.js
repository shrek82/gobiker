// user js
$(".address_process div:last").css("margin","0");
// user input tag
$(".infoform ul li").find("input").bind("focus",function(){
	$(this).nextAll(".ulayouttag").show();
	$(this).nextAll(".txttag").hide();
	$(this).addClass("txtfocus");
	$(this).removeClass("txterror");
}).bind("blur", function(){
	$(this).nextAll(".ulayouttag").hide();
	$(this).removeClass("txtfocus");
}).bind("keyup", function(){
	$(this).nextAll(".ulayouttag").show();
}).mouseover(function(){
	$(this).addClass("txthover");
}).mouseout(function(){
	$(this).removeClass("txthover");
});
$(".useryzmtxt").bind("focus",function(){
	$(".infoformyzm").next(".txttag").hide();
});