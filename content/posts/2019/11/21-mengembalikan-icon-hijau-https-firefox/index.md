---
title: Mengembalikan Icon Hijau HTTPS Pada Mozilla Firefox 
categories: 
  
tags:
  - Certificate
  - HTTPS
date: 2019-11-21
---

Setelah sebelumnya saya membuat artikel tentang https, saya jadi menyadari kalau
Mozilla Firefox sekarang akan menampilkan icon gembok berwarna abu-abu untuk 
laman https alih-alih gembok hijau[^1]. 


{{< figure src="images/identity_icons.png" link="images/identity_icons.png" >}}

Saya pribadi lebih menyukai https digambarkan
dengan icon gembok berwarna hijau, jadi untuk mengembalikannya saya mengubah
konfigurasi `about:config` pada key `security.secure_connection_icon_color_gray.`
Ubah value pada key tersebut menjadi `false` lalu restart browser.

Sebagai tambahan kita juga bisa membuat firefox menampilkan informasi EV 
(_Extended Validation_) Certificate dengan mengubah key 
`security.identityblock.show_extended_validation` menjadi true

{{< figure 
  src="images/Screenshot_2019-11-21_10-49-13.png" 
  link="images/Screenshot_2019-11-21_10-49-13.png" 
  caption="Sebelum mengaktifkan show ev"
>}}

{{< figure 
  src="images/Screenshot_2019-11-21_10-49-34.png" 
  link="images/Screenshot_2019-11-21_10-49-34.png" 
  caption="Sesudah mengaktifkan show ev"
>}}


[^1]: https://blog.mozilla.org/security/2019/10/15/improved-security-and-privacy-indicators-in-firefox-70/