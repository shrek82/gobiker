/*
在javascript中，实现模块有几个选择他们是
模块化模式
对象表示法
AMD模块
CommonJS模块
ECMAScript Harmony模块
 */

//testModel是一个Function
var testModel = function() {
  var count = 0;
  return {
    fun1: function() {
      return count++;
    },
    fun2: function() {
      console.log("value is " + count);
    }
  }
};
console.log(testModel);
//实例化
var myObj = testModel();
myObj.fun2();

/*
[Function]
value is 0
 */

console.log("---------------------------------");
	

// testModel依然是一个Function
var testModel = (function() {
  var count = 0;
  return {
    fun1: function() {
      return count++;
    },
    fun2: function() {
      console.log("value is " + count);
    }
  }
});
console.log(testModel);
//实例化
//
var myObj = testModel();
myObj.fun2();
testModel().fun1();
testModel().fun1();
testModel().fun1();
myObj.fun2();


console.log("---------------------------------");

// testModel是一个Hash形式的对象
var testModel = (function() {
  var count = 0;
  return {
    fun1: function(num) {
      return count++;
    },
    fun2: function() {
      console.log("value is " + count);
    }
  };
})();

//实例化,myObj只是testModel的一个引用,testmodel值变化,myObj也会变化
console.log(testModel);
var myObj = testModel;
myObj.fun2();
testModel.fun1();
testModel.fun1();
testModel.fun1();
testModel.fun1();
myObj.fun2();