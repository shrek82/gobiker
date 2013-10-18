/*
String.prototype.replace: /g 和 /i 标志
许多 JavaScript 新手都很惊讶于字符串的 replace 方法，它并不替换所有匹配的子字符串——而是只替换第一个。有经验的老手都知道在这儿用一个正则表达式并且加上全局标志（/g）：
 */

// 错误
var str = "David is an Arsenal fan, which means David is great";
str.replace("David", "Darren"); // "Darren is an Arsenal fan, which means David is great"
// 正确
str.replace(/David/g, "Darren"); // "Darren is an Arsenal fan, which means Darren is great"
//另外一个错误就是当大小写都要匹配的时候，没有加上 /i 标志：
str.replace(/david/gi, "Darren") // "Darren will always be an Arsenal fan, which means Darren will always be great"