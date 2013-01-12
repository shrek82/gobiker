//1、作为纯函数调用，this就是代表全局;
//2、当作this所在函数作为对象普通方法使用时，this总是指上一级
//3、当作this所在函数被当作构造函数被调用时，this指向被实例的对象
//4、当this所在函数被当作对象prototype方法调用时,this也指被实例的对象
//3、原型方法测试
var ajaxForm = function() {
		this.username = '北京';
		this.nikename = '天津';
		this.send = function() {
			console.log(this.username);
		}
		return this;
	};

ajaxForm.prototype.post = function() {
	console.log(this.nikename);
}

var city=new ajaxForm();
city.username='上海';
city.send();
city.nikename='杭州';
city.post();