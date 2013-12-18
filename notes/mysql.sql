/*增加针对某数据库用户以及设定用户权限*/
grant select,update,insert,delete on gobiker.* to webdev@localhost identified by "123456";
GRANT <privileges> ON <what> TO <user> [IDENTIFIED BY "<password>";
/*查看某用户权限*/
show grants for webdev@localhost
