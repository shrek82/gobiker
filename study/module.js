/*
在javascript中，实现模块有几个选择他们是
模块化模式
对象表示法
AMD模块
CommonJS模块
ECMAScript Harmony模块
 */
var testModel = (function() {
  var count = 0;
  return {
    jiajia: function() {
      return count++;
    },
    reset: function() {
      console.log("value is " + count);
    }
  }
})

