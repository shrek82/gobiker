//1、作为纯函数调用，this就是代表全局;
//2、当作this所在函数作为对象普通方法使用时，this总是指上一级
//3、当作this所在函数被当作构造函数被调用时，this指向被实例的对象
//4、当this所在函数被当作对象prototype方法调用时,this也指被实例的对象
var MyClass = function(testname) {

        console.log(testname + '----------------------------------------------');

        //局部变量
        var privateValue = '对象内私有属性';

        //构造属性
        this.initValue = '对象的构造属性';

        //内部构造方法1
        this.initFunction = function() {
            console.log('对象内构造方法 print ：' + privateValue);
        }

        //内部构造方法2
        this.initFunction2 = function() {
            console.log('对象内构造方法 print ：' + this.initValue);
        }

        //对象返回
        //return this;
    };

MyClass.prototype = {
    funone: function() {
        console.log('原形方法打印对象内私有属性：' + privateValue);

    },
    funtwo: function() {
        console.log('原形方法打印对象内构造属性：' + this.initValue);

    }
};

//原形方法
MyClass.prototype.protoPrintPrivate = function() {
    console.log('原形方法打印对象内私有属性：' + privateValue);
}
MyClass.prototype.protoPrintInit = function() {
    console.log('原形方法打印对象内构造属性：' + this.initValue);
}

console.log(MyClass.prototype);

//空间命名
var JG = {
    MyClass: MyClass
};

//----------------------------------------------------------
//测试1、对象直接作为普通函数执行
MyClass('测试1');
console.log(window.initValue); //ok
window.initFunction(); //ok
window.initFunction2(); //ok
//window.protoPrintPrivate(); //error
/*
//结论:
对象被直接作为普通函数执行时:
1、对象内局部变量只能在同属一级（同层次）的上下文局部方法或构造方法调用，外部原形不行
2、对象内构造属性会成为window全局变量
3、对象内构造方法会成为window的全局方法
4、对象外部原形方法不会被创建和执行
*/

//测试2，对象被其他对象当作普通函数引用
var class1 = MyClass('测试2');
//class1.initFunction();// 原形有return this ok else error
//class1.initFunction2();// 原形有return this ok else error
//class1.protoPrintInit();// 原形有return this ok else error
/*
//结论:
对象被其他对象当作普通函数引用(对象有this返回值很重要)
1、原形有return this返回值，新的变量class1等于时是原形的实例，没有return this依然等于被window引用
2、没有return this返回值，class1什么都没有创建，什么都没有不能引用
3、当函数作为普通函数被其他对象引用时（不时构造），函数内的this总时指向上一级
*/

//测试3 对象实例化一个新的对象
var class2 = new MyClass('测试3');
console.log(class2.privateValue); //undefined
console.log(class2.initValue); //ok
class2.initFunction(); //ok
class2.initFunction2(); //ok
//class2.protoPrintPrivate();       //
class2.protoPrintInit(); //ok
/*
//结论:
对象被直接作为普通函数执行时:
1、对象内局部变量只能在同属一级（同层次）的上下文局部方法或构造方法调用，外部原形不行,被实力的对象也不行
2、对象内构造属性this指向被实例的对象
3、对象内构造方法this和构造方法内的this都指向被实例的对象，可以使用对象内局部变了;
4、实例可以使用原形方法，圆形方法内this指向实例，原形方法内部不能使用对象内局部变了，可以使用构造属性值
*/

//测试4 原形被作为子类作为其他对象或空间对象时
var class3 = new JG.MyClass('测试4');
console.log(class3.privateValue); //undefined
console.log(class3.initValue); //ok
class3.initFunction(); //ok
class3.initFunction2(); //ok
class3.protoPrintInit(); //ok
class3.funtwo(); //ok

/**
结论：
1、不管原形深处几层，该原形实例的this都指向实例对象，包括构造方法和原形方法




*/