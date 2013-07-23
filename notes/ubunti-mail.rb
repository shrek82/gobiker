#使用下面的命令来登陆进入用户管理(cyrus密码为123456789)
cyradm -u cyrus localhost --auth plain
#添加一个叫server的用户
cm server
#退出管理
quit

#修改server账号密码
saslpasswd server
