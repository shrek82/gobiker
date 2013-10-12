
//普通函数
function people(name) {
  var name = name || '没名字';
}

//每一个构造函数都一个原型对象，同时都有一个prototype属性
var city = function (name) {
  this.name = name || '没名字';
}
city.prototype.say=function(){
  console.log(this.name)
}

console.log(people.prototype);
console.log(city.prototype);