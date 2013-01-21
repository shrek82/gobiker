;
//测试写个类
var mySpace = (function() {
	window.usho = function() {};
	usho.request = function(url, options) {
		this.url = url;
		this.options = options||{url:url};
	}
	usho.request.prototype.send = function() {
		var opts=$.extend({},this.options);
		if(!this.url) {
			return false;
		}
		this.options();
		return true;
	}
})();

new usho.request('http://www.baidu.com',function(){
	console.log('hello world!');
}).send();

