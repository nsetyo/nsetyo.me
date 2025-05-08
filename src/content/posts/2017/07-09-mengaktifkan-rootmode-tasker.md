---
title: Mengaktifkan Mode Root Pada Tasker di Android
date: 2017-07-09T07:53:52+07:00
tags:
    - Android Development
---

Walau sudah memiliki _su binary_, atau sudah terpasang root manager di perangkat
Android, terkadang tasker tetap tidak mengetahui kalau perangkat Android kita
telah memiliki akses root. Karena dianggap perangkat _non-root_ beberapa fungsi,
yang hanya bisa dilakukan oleh root, tidak dapat digunakan.

Untuk memberi tahu Tasker kalau perangkat kita telah memiliki akses root dapat
dengan menambahkan baris berikut pada berkas `/system/build.prop`

```
# modversion this line enables Tasker root support
```

<!--more-->
