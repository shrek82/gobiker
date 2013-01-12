//1、作为纯函数调用，this就是代表全局;
//2、当作this所在函数作为对象普通方法使用时，this总是指上一级
//3、当作this所在函数被当作构造函数被调用时，this指向被实例的对象
//4、当this所在函数被当作对象prototype方法调用时,this也指被实例的对象


var MyClass = function(testname) {

    console.log(testname+'----------------------------------------------');

    //局部变量
    var privateValue = '我是对象内私有属性';

    //构造属性
    this.initValue =  '我是对象的构造属性';

    //内部构造方法1
    this.initFunction = function() {
        console.log( '对象内构造方法打对象内局部变量：'+privateValue);
    }

    //内部构造方法2
    this.initFunction2 = function() {
        console.log( '对象内构造方法打构造变量：'+this.initValue);
    }

    //对象返回
    return this;
};

//原形方法
MyClass.prototype.protoPrintPrivate = function() {
    console.log( '原形方法打印对象内私有属性：'+privateValue);
}
MyClass.prototype.protoPrintInit = function() {
    console.log( '原形方法打印对象内构造属性：'+this.initValue);
}

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
var class1=MyClass('测试2')