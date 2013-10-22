/*
 错误机制
 http://pan.baidu.com/share/link?shareid=566361903&uk=52067078
 */
try {
  if (this.console && this.console.log) {
    console.log("cosole.log()");
  }
} catch (e) {
  console.log(e);
}

/*
 构造器模式
 在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。在Javascript中几乎所有的东西都是对象，我们经常会对对象的构造器十分感兴趣。
 对象构造器是被用来创建特殊类型的对象的，首先它要准备使用的对象，其次在对象初次被创建时，通过接收参数，构造器要用来对成员的属性和方法进行赋值。
 */

//1.1 创建对象
var object1 = new Object()
var people = Object.create(null);
people.name = 1;
//创建一个对象，继承字people
var man = Object.create(people);
//为新对象设置属性
man.address = "中国杭州";
man['age'] = 28;
Object.defineProperty(man, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

console.log(man);


//1.2基础构造器
//使用new关键字来调用该函数，我们可以告诉Javascript把这个函数当做一个构造器来用,它可以用自己所定义的成员来初始化一个对象。
//在这个构造器内部，关键字this引用到刚被创建的对象。回到对象创建，一个基本的构造函数看起来像这样:

function Car(name) {
  this.name = name || '未命名';
  this.color = 'red';
  this.weight = '1T';
  this.toString = function () {
    return this.name + this.color + this.weight;
  }
}

//使用

var baoma = new Car('宝马');
console.log(baoma.toString());
console.log(baoma.prototype);
/*
 上面这是个简单版本的构造器模式，但它还是有些问题。一个是难以继承，另一个是每个Car构造函数创建的对象中，toString()之类的函数都被重新定义。这不是非常好，理想的情况是所有Car类型的对象都应该引用同一个函数。
 这要谢谢 ECMAScript3和ECMAScript5-兼容版，对于构造对象他们提供了另外一些选择，解决限制小菜一碟。
 */

/*
 1.3 使用原形构造器
 在Javascript中函数有一个prototype的属性。当我们调用Javascript的构造器创建一个对象时，
 构造函数prototype上的属性对于所创建的对象来说都看见。照这样，就可以创建多个访问相同
 prototype的Car对象了。下面，我们来扩展一下原来的例子：
 */

function Car(model, year, miles) {

  this.model = model;
  this.year = year;
  this.miles = miles;

}


// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是 
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// 使用:

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);

console.log(civic.toString());
console.log(mondeo.toString());

