/*
 单例就是只有一个实例，创建实例不使用new关键字，在javascript中，单例就是以对象字面量方式创建来创建单例，也就是以{}包裹起来的键值对JSON形式创建的，例如：
 */

var obj = {
  name: 'zhao',
  say: function () {
    //方法源码
  }
};

/*
 模块模式则是为单例模式创建私有变量和公有方法，从而增强可访问性
 */
var obj = (function () {
  //私有变量
  var name = '单例模式';
  //私有方法

  function add() {
  }

  return function say() {
    console.log(name);
  };
})();

var obj = (function () {
  //私有变量
  var age = 1;
  //私有方法
  function add(num) {
    age += (num || 1);
  }

  return {
    age: age,
    say: function (num) {
      add(num);
      console.log('age is：' + age);
    }
  }
})();


var singleton=obj;
singleton.say(2);
console.log(singleton.age);