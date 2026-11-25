---
title: Reset root password MySQL/MariaDB
date: 2020-05-29
image: ./hero-reset-mysql.webp
tags:
    - GNU/Linux
    - Web Development
---

I run into this problem all the time, especially after not touching a database
directly for a while — and foolishly, I always forget how to fix it. So I'm
writing it down here, so the next time I forget, I know where to look.

<!--more-->

## 1. Stop the service

```
$ sudo systemctl stop mariadb
```

## 2. Restart with password and networking skipped

```
$ sudo mysqld_safe --skip-grant-tables --skip-networking &
```

## 3. Reconnect to the server as root

```
$ mysql -u root
```

## 4. Run the following commands to reset the password

```
mysql> FLUSH PRIVILEGES;
```

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'passwordbaru';
```

```
mysql> FLUSH PRIVILEGES;
```

## 5. Restart the database server

First, kill the process you started manually.

For MySQL:

```
$ sudo kill `cat /var/run/mysqld/mysqld.pid`
```

For MariaDB:

```
$ sudo kill `/var/run/mariadb/mariadb.pid`
```

Start the database service again

```
$ sudo systemctl start mariadb
```

Voilà :sparkles:
