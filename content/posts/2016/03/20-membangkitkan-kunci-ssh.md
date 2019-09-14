---
title      : Membangkitkan kunci SSH di Linux
categories :
 - GNU/Linux
tags :
 - Command Line
 - SSH
date : 2016-03-20
---

Apa itu SSH? Penjelasan mengenai SSH sendiri di Internet cukup banyak, salah
satunya di [Wikipedia][1]. Untuk membangkitkan pasangan kunci SSH, sebelumnya
kita harus memasang paket `openssh` dengan perintah:

```
# pacman -S openssh
```

<!--more-->

Setelah paket `openssh` terpasang, kita dapat membangkitkan (_generate_)
pasangan kunci SSH dengan perintah

```
$ ssh-keygen -t rsa -C "email@company.com"
```

Baris perintah di atas akan menanyakan lokasi dan nama berkas dimana kita ingin
menyimpan pasangan kunci. Ketika ditanyakan, untuk menggunakan lokasi & nama
berkas _default_, tekan `enter` tanpa mengisi apapun. Lokasi _default_ untuk
pasangan kunci adalah `~/.ssh/id_rsa.pub` untuk kunci publik, dan
`~/.ssh/id_rsa` untuk kunci privat. Kunci privat adalah kunci yang harus dijaga
kerahasiaannya, sebaiknya disimpan dengan aman dan tidak memberikannya kepada
siapapun. Untuk melihat kunci publik kita dapat menggunakan perintah

```
$ cat ~/.ssh/id_rsa.pub
```

Untuk langsung menyalin (_copy_) dapat menggunakan perintah

```
$ xclip -sel clip < ~/.ssh/id_rsa.pub
```

Sekian.

[1]: https://en.wikipedia.org/wiki/Secure_Shell
