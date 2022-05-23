---
title: Pengaturan proxy untuk Git
date: 2016-01-23
tags:
    - GNU/Linux
---

Sudah beberapa bulan ini kantor mewajibkan penggunaan _proxy_ untuk koneksi
internet. Sebenarnya saya pribadi tidak masalah, hanya saja beberapa
_port_ditutup karena penggunaan \_proxy_ ini, salah satunya untuk git. Sudah
mengatur _proxy_ melalui perintah `export http_proxy` pun masih belum berhasil.

```
$ export http_proxy=http://proxyhost:port
$ export https_proxy=http://proxyhost:port
```

<!--more-->

### 1. Pengaturan _Proxy_ Pada Git

Pertama Ketik perintah ini pada terminal/_command line_ dengan mengubah terlebih
dahulu `proxy.mycompany:port` menjadi alamat _host_ atau alamat ip dari _proxy
server_ dan _port_ nya

```
$ export HTTP_PROXY=http://proxy.mycompany:port
$ export HTTPS_PROXY=http://proxy.mycompany:port
$ git config --global http.proxy $HTTP_PROXY
```

Catatan: Semua perintah export tidak permanen, sehingga setiap kali komputer
dinyalakan kembali perintah `export` harus dijalankan lagi. Untuk menjadikan
perintah tersebut permanen bisa menambahkan

```
export HTTP_PROXY=http://proxy.mycompany:port
export HTTPS_PROXY=http://proxy.mycompany:port
```

pada berkas `~/.bashrc` untuk bash atau `~/.zshrc` untuk zsh. Apabila _proxy_
yang digunakan menggunakan _username_ dan _password_ untuk otentikasi pengguna,
maka perintahnya menjadi:

```
$ export HTTP_PROXY=http://username:password@proxy.mycompany:port
$ export HTTPS_PROXY=http://username:password@proxy.mycompany:port
$ git config --global http.proxy $HTTP_PROXY
```

### 2. Pengaturan _Proxy_ pada SSH

Perintah di atas hanya dapat digunakan untuk menarik data (_pull_) dari _server_
git. Apabila kita ingin mengunggah data (_push_) ke repositori _server_ git maka
kita juga harus mengatur proxy pada ssh, karena koneksi ke repositori _server_
umumnya menggunakan ssh. Untuk mengatur proxy pada ssh dapat melakukan tahapan
berikut:

#### Install corkscrew

```
# pacman -S corkscrew
```

Perintah ini hanya berlaku untuk Arch Linux, untuk distro lain atau windows
silahkan mencari bantuan dengan mesin pencari Google cara menginstall corkscrew

#### Atur proxy ssh

Edit berkas `~/.ssh/config` apabila berkas belum tersedia dapat membuat berkas
baru dan tambahkan.

```
ProxyCommand /bin/corkscrew proxy.mycompany port %h %p
```

#### Atur koneksi Git dengan ssh+proxy

Umumnya koneksi yang melewati proxy juga mengalami pemblokiran untuk akses
melewati beberapa _port_. Seperti kasus di kantor saya yang port ssh-nya
diblokir, maka dapat melakukan koneksi ssh melalui _port_ lain. Github
menyediakan koneksi ssh melewati port HTTPS, atau 443. Untuk menggunakannya
dapat mengedit `~/.ssh/config` dan tambahkan:

```
Host github.com
  Hostname ssh.github.com
  Port 443
```

Untuk menguji apakah koneksi berhasil atau tidak, dapat menjalankan perintah
berikut:

```
$ ssh -T git@github.com
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
```

### 3. Menghapus pengaturan proxy

Untuk menghapus pengaturan _proxy_ yang sudah dibuat sebelumnya, dapat
menjalankan perintah:

```
$ export HTTP_PROXY=""
$ export HTTPS_PROXY=""
$ git config --global --unset http.proxy
```

Berikutnya hapus berkas `~/.ssh/config`. Apabila berencana menggunakan proxy
lagi sebaiknya berkas ini di-_backup_ terlebih dahulu dan dikembalikan lagi
apabila dibutuhkan.
