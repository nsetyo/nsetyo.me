---
title:
  Mengatasi Permasalahan CPU Usage Pada Pemasangan HDD Caddy di
  Laptop HP 14-R202TX
categories:
  - Troubleshoot
tags:
  - Caddy
  - SSD
  - HDD
date : 2017-04-08T13:37:31+07:00
image: images/caddy2.jpg
---
Beberapa waktu lalu saya memutuskan untuk mengganti HDD pada laptop saya dengan 
SSD. SSD memiliki keunggulan dalam kecepatan jika dibandingkan dengan HDD pada 
umumnya, sayangnya dengan harga yang relatif lebih mahal. Saya membeli SSD 
merek sandisk seharga Rp. 560.000 dengan kapasitas 120GB, di toko yang sama HDD 
500GB dijual seharga Rp. 590.000.

Karena kapasitasnya yang lebih kecil saya memutuskan untuk tetap meng­gu­na­kan
HDD sebagai media penyimpanan sekunder dengan menggunakan HDD Caddy. HDD Caddy
akan menggantikan posisi DVD-ROM pada laptop yang tidak pernah saya pergunakan.

<!--more-->

{{<
    figure src="images/caddy1.jpg" link="images/caddy1.jpg"
    caption="Gambar 1. HDD Caddy"
>}}

{{<
    figure src="images/caddy2.jpg" link="images/caddy2.jpg"
    caption="Gambar 2. HDD Caddy di tray DVD-ROM"
>}}

#### Masalah Pada CPU Usage

Setelah pemasangan selesai terjadi keanehan pada grafik penggunaan CPU pada 
laptop saya. Dalam keadaan *idle* tanpa membuka aplikasi apapun penggunaan cpu 
cukup tinggi, seperti terlihat pada gambar berikut:

{{<
    figure src="images/cpuusage.jpg" link="images/cpuusage.jpg"
    caption="Gambar 3. Grafik CPU Tinggi Meski Dalam Keadaan Idle"
>}}

Awalnya saya pikir masalah tersebut terjadi karena saya meng&shy;gunakan
sistem operasi GNU/Linux. Ternyata saat saya masuk menu BIOS penggunaan CPU juga 
tinggi, hal ini terasa dari dengungan kipas pendingin yang tidak normal. Untuk 
mengatasi permasalahan ini ternyata hanya perlu menggeser tombol *switch* pada 
HDD Caddy seperti pada gambar berikut:

{{<
    figure src="images/caddy3.jpg" link="images/caddy3.jpg"
    caption="Gambar 4. Switch Pada HDD Caddy"
>}}

---
__Catatan__

1. HDD caddy saya beli di [Jakmall](https://www.jakmall.com/search?q=9704838345891)
2. Sumber: [http://forum.notebookreview.com][1]

[1]: http://forum.notebookreview.com/threads/hp-elitebook-8560p-wont-shutdown.655065/page-2#post8986739