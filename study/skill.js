//使用 JavaScript 修改浏览器 URL 地址栏
/*
History 对象 pushState() 这个方法有3个参数,你可以从上面的例子看到。第一个参数，是一个Json对象 , 在你储存有关当前URl的任意历史信息.第二个参数,title 就相当于传递一个文档的标题 ，第三个参数是用来传递新的URL. 你将看到浏览器的地址栏发生变化而当前页面并没刷新。
 */
var stateObject = {};
var title = "Wow Title";
var newUrl = "/my/awesome/url";
history.pushState(stateObject,title,newUrl);