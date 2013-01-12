//1、作为纯函数调用，this就是代表全局;
//2、当作this所在函数作为对象普通方法使用时，this总是指上一级
//3、当作this所在函数被当作构造函数被调用时，this指向被实例的对象
//4、当this所在函数被当作对象prototype方法调用时,this也指被实例的对象

var MyClass = function(url, username) {

		//普通属性
		var url = url

		//普通方法
		var get = function() {
				console.log(url);
			}

		//构造属性
		this.username = username

		//构造方法
		this.send = function() {
			console.log(url);
			console.log(this.username);
		}

		return this;
	};

//原形方法
MyClass.prototype.post = function() {
	console.log(url);
	console.log(this.username);
}

//----------------------------------------------------------
//测试1、对象直接作为普通函数执行 
MyClass('http://test1.com','直接作为普通函数执行');
window.username;  //ok
window.send();    //ok
window.url;     //error
window.post(); //error

/*
//结论:
对象被直接作为普通函数执行时:
1、函数体内的普通变量url，普通方法get()只能在里面被调用
2、构造属性username,构造方法send()被赋予给全局对象window，即window.username,window.send()可以执行
3、原形方法post不会被赋予全局
*/

//测试2、对象当作普通函数被普通变量引用
//var class1=MyClass('http://test2.com','对象当作普通函数被普通变量引用');
//window.username;  //ok
//window.send();    //ok
//class1.username;
//class1.send();

