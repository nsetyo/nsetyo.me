---
title: Membuat Banyak Files Dengan Nama Serupa
date: 2016-03-30
tags:
    - GNU/Linux
---

Saya pernah dihadapkan pada keadaan dimana harus membuat beberapa berkas dengan
nama berkas yang mirip satu sama lain. Untungnya di GNU/Linux hal seperti ini
cukup mudah dilakukan, cukup menggunakan fitur _brace expansion_ (`{` dan `}`).
Lebih jelasnya, contoh apabila kita ingin membuat 5 buah berkas dengan nama

-   `autoload.config.php`
-   `database.config.php`
-   `permission.config.php`
-   `routes.config.php`
-   `type.config.php`

Untuk membuat semua berkas tersebut dalan satu baris perintah dapat menggunakan
perintah:

```
$ touch {autoload, database, permission, routes, type}.config.php
```

<!--more-->

[![asciicast][1]][2]

_Brace expansion_ juga bisa digunakan untuk range karakter seperti angka 1-100
atau 1-z menggunakan `..`.

```
$ touch {1..10}.txt
$ ls -l
total 0
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 10.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 1.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 2.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 3.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 4.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 5.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 6.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 7.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 8.txt
-rw-r--r-- 1 nsetyo nsetyo 0 Mar 30 23:05 9.txt
```

Sekian.

[1]: https://asciinema.org/a/0z94210mfs7vm5ryhtu63ik1x.png
[2]: https://asciinema.org/a/0z94210mfs7vm5ryhtu63ik1x
