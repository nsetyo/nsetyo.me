---
title : Peta Indonesia Untuk JvectorMap
categories :
 - Development
tags :
 - Javascript
 - jQuery
date  : 2016-05-15
disqus_identifier: /pemrograman/jvectormap-peta-indonesia
---

[Jvectormap][07] merupakan perangkat lunak berguna untuk membuat peta vector
pada aplikasi berbasis web menggunakan bahasa pemrograman javascript.
Yang menjadi permasalahan adalah pada Jvectormap tidak terdapat peta Indonesia.
Untungnya Jvectormap menjelaskan cara untuk membuat peta sendiri [🔗][09].
Walaupun menurut saya pribadi dokumentasinya sulit dipahami.

<!--more-->

Untuk membuat peta Indonesia pada Jvectormap sebelumnya kita harus memasang `python2`,
`python2-matplotlib`, `python-gdal`, `python-shapely`, `python2-setuptools`

```
# pacman -S python2 python2-matplotlib python-gdal python-shapely python2-setuptools
```

Install booleano parser

```
# easy_install booleano
```

Lalu install juga [QGis][10]. Unduh file peta Indonesia berformat [SHP][08]
dan [Jvectormap][11]. Ekstrak keduanya, pada folder Jvectormap terdapat folder
converter, masuk folder tersebut. Jalankan QGis Desktop, lalu buka `IDN_adm1.shp`.

{{< figure src="images/QGIS01.png" link="images/QGIS01.png" >}}

Untuk melihat data pada peta dapat dengan klik kanan pada IDN_adm1 lalu
Open Attribute Table

{{< figure src="images/QGIS02.png" link="images/QGIS02.png" >}}
{{< figure src="images/QGIS03.png" link="images/QGIS03.png" >}}

Berikutnya, buka menu Vector ➡️ Geometry Tools ➡️ Simplify Geometries

{{< figure src="images/QGIS04.png" link="images/QGIS04.png" >}}

Atur Simplify Tolerance menjadi 0.0100, centang save to new file. Simpan hasil
simplify menjadi IDN_adm1-simplified.shp. Proses dengan menekan tombol OK

{{< figure src="images/QGIS05.png" link="images/QGIS05.png" >}}

Buat berkas `indonesia.json` dengan isi:

```json
[
    {
        "name"      : "read_data",
        "file_name" : "./maps/IDN_adm1-simplified.shp"
    },
    {
        "name"      : "write_data",
        "format"    : "jvectormap",
        "file_name" : "./output/indonesia-adm1.js",
        "params": {
            "code_field": "ID_1",
            "name_field": "NAME_1",
            "name": "indonesia-adm1"
        }
    }
]
```

Pastikan `"file_name": "./maps/IDN_adm1-simplified.shp"` sesuai dengan lokasi
berkas. `"file_name": "./output/indonesia-adm1.js",` merupakan lokasi
hasil dari konversi, pastikan folder `output` ada pada folder dimana konversi
dijalankan. Lalu jalankan proses konversi

```
python2.7 processor.py indonesia.json
```


Peta Indonesia `output/indonesia-adm1.js` sudah bisa digunakan pada Jvectormap.
Untuk peta Indonesia yang sudah dikonversi ke jvectormap dapat mengunjungi
repositori saya [🔗][12].

Sekian.

---

__Update 11/05/2017__

1. Menambahkan tahapan instal booleano parser

[07]: http://jvectormap.com/
[08]: http://biogeo.ucdavis.edu/data/gadm2.8/shp/IDN_adm_shp.zip
[09]: http://jvectormap.com/documentation/gis-converter
[10]: http://qgis.org/en/site
[11]: https://github.com/bjornd/jvectormap
[12]: https://github.com/nsetyo/jvectormap-indonesia
