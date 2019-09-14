---
title: Menambahkan dan menghapus pengguna pada GNU/Linux
categories:
  - GNU/Linux
tags:
  - Terminal
  - Command Line
date: 2017-02-25T11:48:46+07:00
---

Menambahkan pengguna (_user_) pada GNU/Linux dapat dilakukan dengan
mengguna­kan perintah `useradd` atau `adduser`. Perintah `useradd`
merupakan perintah asli yang terkompilasi bersama sistem GNU/Linux,
sedangkan `adduser` merupakan _perl script_ yang menggunakan `useradd`
sebagai _back-end_[^1]. Perintah dasar `useradd` adalah

```
# useradd -[opsi] username
```

<!--more-->

#### Menambahkan pengguna baru
Untuk menambahkan pengguna baru, jalankan perintah

```
# useradd usernamebaru
```

Setelah itu tambahkan kata sandi untuk usernamebaru dengan menjalankan
perintah:

```
# passwd usernamebaru
```
```
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
```

Setelah pengguna baru dibuat, datanya secara otomatis akan ditambahkan
ke `/etc/passwd`

```
usernamebaru:x:1001:1002::/home/usernamebaru:
```

Baris tersebut berisi informasi yang dipisahkan dengan _colon_ ( : ),
informasi tersebut dari kiri ke kanan adalah:

1.  Username: nama login untuk pengguna
2.  Password: password pengguna, digantikan dengan karakter 'x'.

    Password pengguna disimpan terenkripsi pada `/etc/shadow`.
3.  User ID
4.  Group ID
5.  User info: berisi informasi opsional
6.  User directory
7.  Shell

#### Menambahkan pengguna baru dengan user directory berbeda

Pada pengaturan _default_, _user directory_ untuk pengguna berada pada
`/home/namauser`. Untuk membuat pengguna baru dengan _user directory_
yang berbeda dapat dilakukan dengan menambahkan parameter `-d`

```
# useradd -d /other/path usernamebaru
```

Perintah `useradd` tidak akan membuat _user directory_ secara otomatis.
Untuk membuat _user directory_ secara otomatis ketika membuat pengguna
baru, tambahkan parameter `--create-home` atau `-m`.

```
# useradd -m usernamebaru
```

Atau

```
# useradd --create-home usernamebaru
```

#### Menambahkan pengguna baru pada beberapa group

Untuk menempatkan pengguna baru pada beberapa group dapat menggunakan
padameter `-G`, atau `--groups`

```
# useradd -G vboxusers,operator usernamebaru
```

Perintah di atas akan membuat pengguna baru dengan _username_
usernamebaru dan menempatkannya pada 3 group tambahan. Untuk memeriksa
hasil perintah tersebut dapat menggunakan perintah:

```
# groups usernamebaru
```
```
usernamebaru : usernamebaru operator vboxusers
```

Untuk menambahkan pengguna yang sudah ada ke dalam group

```
# usermod -a -G wheel usernamelama
```

#### Menghapus pengguna dari Group

Untuk menghapus pengguna dari sebuah group, lakukan dengan menggunakan
perintah `deluser <username> <groupname>`. Contoh perintah untuk
menghapus usernamebaru dari group operator:

```
# deluser usernamebaru operator
```

Atau

```
# gpasswd -d usernamebaru operator
```

#### Menghapus pengguna

Untuk menghapus pengguna, gunakan perintah

```
# userdel -r <username>
```

Sekian catatan ini, untuk lebih lengkapnya dapat melihat manpage

```
$ man useradd
```

[^1]: http://superuser.com/q/547966/221259
