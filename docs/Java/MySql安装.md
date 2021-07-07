# MySql 安装

## 下载

- 去 mysql 官网下载[mysql](https://dev.mysql.com/downloads/mysql/) community 版本;
- 点击下方的 DOWNLOADS : MySQL Community Server
- 下载`macOS 10.15 (x86, 64-bit), DMG Archive`版本的安装包;

## 安装

```
vim ~/.bash_profile
PATH=$PATH:/usr/local/mysql/bin
```

按 esc 键，输入:wq 保存

```
source ~/.bash_profile
```

## 修改密码

```
mysql -u root -p

```
