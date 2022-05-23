---
title: Menginstal npm modules di User Direktori
date: 2017-02-20T21:18:03+07:00
tags:
    - GNU/Linux
    - Web Development
---

Pada pengaturan _default_ `npm` membutuhkan hak akses root untuk dapat melakukan
instalasi modul secara global. Di GNU/Linux `npm` biasanya akan menempatkan
modulnya pada `/usr/local/lib/node` atau `/usr/local/lib/node_modules`, hal ini
lah yang menyebabkan `npm` membutuhkan hak akses root untuk dapat menulis ke
direktori tersebut.

Bagi yang tidak ingin memberikan hak akses root pada npm dapat mengubah lokasi
yang menjadi target instalasi dengan lokasi lain dimana user biasa memiliki hak
tulis (_writable_). Untuk melakukannya dapat menggunakan perintah

```
$ npm config set prefix '/path/to/writable/directory'
```

<!--more-->

Atau bisa juga dengan membuat file `/home/user/.npmrc`, lalu isi

```
prefix = /path/to/writable/directory
```

#### Memindahkan cache directory npm

Untuk memindahkan _cache directory_ milik npm caranya tidak jauh berbeda seperti
cara memindahkan prefix, cukup dengan menjalankan perintah

```
$ npm config set cache '/path/to/directory'
```

Atau dengan menambahkan baris berikut pada `/home/user/.npmrc`

```
cache = /path/to/directory
```

#### Menambahkan direktori npm pada $PATH

Tambahkan baris berikut pada `.bashrc` atau `.zshrc`:

```
export PATH="/path/to/writable/directory/npm/bin:$PATH"
```

Sekian.

---

**Update 30/03/2017**:

Alternative artikel
[https://linhub.io/nodejs/2017/03/30/mengatasi-galat-...][https://linhub.io/nodejs/2017/03/30/mengatasi-galat-pada-pemasangan-paket-secara-global-via-npm]
