---
title:
  Mengatasi Permasalahan Wireless Realtek RTL8723BE Pada HP 14-R202TX
  Dengan Sistem Operasi GNU/Linux
categories:
  - Troubleshoot
  - GNU/Linux
tags:
  - Wireless
  - Realtek
date: 2017-04-14T20:53:16+07:00
---

Permasalahan pada Wireless Realtek RTL8723BE adalah setelah beberapa menit
digunakan koneksi internet akan terputus dengan Wi-Fi tetap tersambung.
Masalah ini saya temui pada distro Arch Linux dan Debian. Masalah ini
merupakan _bug_ dari _driver_ untuk RTL8723BE[^1]. Masalah ini dapat diatasi 
dengan mematikan fitur *sleep* dari perangkat _wireless_. 

Buat berkas `/etc/modprobe.d/rtl8723be.conf` dengan isi sebagai berikut:

```
options rtl8723be fwlps=N ips=N
```

Setelah itu restart dan Wi-Fi dapat kembali digunakan seperti seharusnya.

<!--more-->

Catatan:
Untuk mengetahui _chipset wireless_ dari perangkat laptop kita dapat menggunakan
perintah `lspci -k`, yang akan memberikan informasi tentang perangkat _wireless_
seperti di bawah ini:

```
0a:00.0 Network controller: Realtek Semiconductor Co., Ltd. RTL8723BE PCIe Wireless Network Adapter
	Subsystem: Hewlett-Packard Company RTL8723BE PCIe Wireless Network Adapter
	Kernel driver in use: rtl8723be
	Kernel modules: rtl8723be

```

[^1]:https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1454843
