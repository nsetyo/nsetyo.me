---
title: Reset root password MySQL/MariaDB
categories:
  - GNU/Linux
tags:
  - Database
  - MariaDB
  - MySQL
date: 2020-05-29
---

MAsalah ini sering sekali saya alami, apalagi setelah lama tidak menggunakan
database secara langsung, dan bodohnya saya selalu lupa caranya. Kali ini saya
catat di sini agar suatu saat saya lupa lagi, saya tau kemana harus mencari.

<!--more-->

#### 1. Stop service

```
$ sudo systemctl stop mariadb
```

#### 2. Restart dengan opsi skip password dan networking

```
$ sudo mysqld_safe --skip-grant-tables --skip-networking &
```

#### 3. Sambungkan ulang server dengan akun root

```
$ mysql -u root
```

#### 4. Gunakan perintah berikut untuk me-_reset_ password

```
mysql> FLUSH PRIVILEGES;
```

```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'passwordbaru';
```

```
mysql> FLUSH PRIVILEGES;
```


#### 5. Mulai ulang database server

Pertama `kill` proses yang sebelumnya dijalankan manual.

Untuk mysql:
```
$ sudo kill `cat /var/run/mysqld/mysqld.pid`
```
Untuk mariadb:
```
$ sudo kill `/var/run/mariadb/mariadb.pid`
```

Jalankan ulang database service
```
$ sudo systemctl start mariadb
```


Voilà :sparkles:
