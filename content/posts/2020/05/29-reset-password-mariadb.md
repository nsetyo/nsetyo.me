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

#### 2. Restart dengan opsi skip password

```
$ sudo mysqld_safe --skip-grant-tables &
```

#### 3. Sambungkan ulang server dengan akun root

```
$ mysql -u root
```

#### 4. Gunakan perintah berikut untuk me-_reset_ password

```sql
use mysql;

update user SET PASSWORD=PASSWORD("passwordbaru") WHERE USER='root';

flush privileges;

exit
```

#### 5. Mulai ulang database server

```
$ sudo systemctl start mariadb
```


Voila ✨
