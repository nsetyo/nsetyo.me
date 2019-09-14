---
title: Sekilas Tentang GPG
categories :
 - Kriptografi
 - GNU/Linux
tags:
 - Public Key
 - Security
 - Command Line
date: 2016-04-17
disqus_identifier: /kriptografi/sekilas-gpg

---

[GPG] atau _GNU Privacy Guard_, bukan [PGP], merupakan perangkat lunak yang 
mengimple­men­tasikan [RFC4880], yang merupakan standar dari spesifikasi [OpenPGP]. 
Setidaknya begitu yang dikatakan Wikipedia. GPG, dan perangkat lunak lain yang 
mengadopsi OpenPGP, digu­na­kan untuk mengamankan komunikasi dengan menggunakan 
enkripsi. Untuk menggunakan GPG terlebih dahulu kita harus memiliki kunci, yang 
akan digunakan untuk mengenkripsi dan dekripsi. Untuk membuat pasangan kunci GPG 
dapat menggunakan baris perintah:

```
$ gpg2 --full-gen-key
gpg (GnuPG) 2.1.11; Copyright (C) 2016 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)
Your selection?
```

<!--more-->
Tekan enter atau angka 1-4 untuk memilih algoritma kriptografi yang akan
digunakan.

```
RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (2048)
```

Tuliskan besaran kunci yang akan digunakan, dalam _bit_. Kunci yang besar
memiliki tingkat keamanan yang lebih tinggi, tetapi membutuhkan proses yang
lebih lama.

```
Please specify how long the key should be valid.
         0 = key does not expire
      <n>  = key expires in n days
      <n>w = key expires in n weeks
      <n>m = key expires in n months
      <n>y = key expires in n years
Key is valid for? (0)
```

Tuliskan masa aktif kunci sebelum akhirnya kadaluarsa. 1 untuk satu hari, 1y
untuk satu tahun.

```
Key expires at Sun 17 Apr 2016 10:41:10 PM WIB
Is this correct? (y/N)
```

Ketik y untuk melanjutkan.

```
GnuPG needs to construct a user ID to identify your key.

Real name:
```
Isikan data yang akan digunakan. GPG juga dapat digunakan untuk mengotentikasi
keaslian pesan, jadi pada tahap ini disarankan untuk menggunakan data
sebenarnya, nama dan email asli.

```
GnuPG needs to construct a user ID to identify your key.

Real name: Setyo N
Email address: mail@domain.com
Comment:
```

Setelah diisi dan diproses, silakan untuk mengisi parafrase. Parafrase ini
berguna untuk mengamankan kunci privat kita apabila sampai jatuh ke tangan yang
tidak berhak. Setelah itu silakan menunggu sampai kunci dibangkitkan. Silakan
tetap melakukan kegiatan seperti biasa.

```
We need to generate a lot of random bytes. It is a good idea to
perform some other action (type on the keyboard, move the mouse,
utilize the disks) during the prime generation; this gives the
random number generator a better chance to gain enough entropy.
```

Setelah selesai

```
gpg: key 35704B61 marked as ultimately trusted
gpg: revocation certificate stored as '/home/nsetyo/.gnupg/openpgp-revocs.d/C34830B0CEC5915B8A7D85EF80E2C57635704B61.rev'
public and secret key created and signed.

gpg: checking the trustdb
gpg: marginals needed: 3  completes needed: 1  trust model: PGP
gpg: depth: 0  valid:   2  signed:   0  trust: 0-, 0q, 0n, 0m, 0f, 2u
gpg: next trustdb check due at 2016-04-17
pub   rsa4096/35704B61 2016-04-16 [S] [expires: 2016-04-17]
      Key fingerprint = C348 30B0 CEC5 915B 8A7D  85EF 80E2 C576 3570 4B61
uid         [ultimate] Setyo N ("Test") <mail@domain.com>
sub   rsa4096/77D4D96A 2016-04-16 [] [expires: 2016-04-17]
```

Kunci yang telah dibangkitkan akan memiliki "GPG key ID" yang
terdiri dari 8 digit hexadecimal. Ketika menggunakan GPG Key ID,
tambahkan `0x` sebelum ID. Untuk ekspor kunci Publik dapat
menggunakan baris perintah

```
gpg --export -a "mail@domain.com" > public.key
```

Seperti ini isi dari kunci publik yang sudah diekspor. Kunci ini
dapat kita berikan pada siapa saja.

```
-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: GnuPG v2

mQINBFcSyxUBEACoCyrJZGR+YAVY0r5T2l+b1pbXoybcXYbT9weacS+HR5v9if/u
7vHVfqEC8OMAc3KxVk1v+6fkwEnePqg8wvwShZITY/mJ7J4PjyclvZ1lV8TQ7rM9
DEdTGuYU9W8ADIDiukYQCkuM9AxCupOyvIHhNTFpLn+3rawyZ/HCuJeHzHQdlDJB
8b0gsiP31i3syot/GAhaxAx7pUwqj6kx80sG+BXSgto4pHNp5yiZVwXR1FzFg2X0
dQ+jKkKbZQZi0aCvopO7bgEIYKCBppeWA1ZqOXLILMoWPeVbommOTYASpHAjeTVQ
2DERo/BqnRi/L04SZ+WR5l7f1pLSF7fZ8q2jYVxp4Irgm6Riljhc2mLndvi844G8
Himf2PUhd4ODiNnb6N+DB+W0n3WnotYAQkWkGJB8FzAku4nP3BdnlIUuNU7XTEDe
...
rP1bV3dVe4whukrd8PFRbBFj6jF19q7NFoTYoP8zchWc4G0DzWU7bek4N3KGZo2L
aSSU0dzKrcx+yg7bVz73hXKXJn5pNDKeE6838v+KLrmi47j/p5UJLutd7D08Myma
ExvrGonX9/4U4z4uPAZExMiGJZIweFmvgUkId4rVr5SJkKbq+3Futj1DDUokorOK
pYy+XkMeobr44jlExgRMoA4fmDxewbtyO56ggFC1hfedROa0ODtp0yL8zVQZMopy
fFy3cy+4xY9SZF49mZyBZGgv93aBTuU14jJOu/JJcplgvkU/dPt0S26rML/uRCaL
XFSzkqmbZGqLyPIN
=m/fq
-----END PGP PUBLIC KEY BLOCK-----
```

Sedikit menjelaskan tentang kriptografi asimetris, GPG menggunakan kunci
kriptografi asimetris, dimana untuk penyandian (_encoding_) dan pengawasandian
(_decoding_) dilakukan menggunakan dua kunci yang berbeda. Pada Kriptografi
asimetris terdapat dua buah kunci, kunci publik dan kunci privat. Kunci publik
merupakan kunci yang dapat kita berikan pada siapa saja, bahkan dapat kita
unggah di ruang publik, kontras dengan kunci privat yang harus kita jaga baik-
baik. Apabila kita melakukan penyandian menggunakan kunci privat untuk
membukanya (_decode_) harus menggunakan kunci publik, proses ini disebut
_signing_ atau penandatanganan. Sebaliknya apabila kita mengenkripsi
menggunakan kunci Publik untuk membukanya harus menggunakan kunci privat, ini
merupakan proses enkripsi.

Proses _signing_ digunakan untuk menjaga integritas data dan memastikan data
yang diterima oleh penerima pesan benar merupakan dari pengirim yang sesuai.
Untuk memastikannya, penerima pesan dapat melakukan verifikasi tandatangan yang
dibuat menggunakan GPG. Berikut cara membuat tanda tangan dari sebuah berkas
menggunakan kunci yang sudah kita buat sebelumnya.

```
$ gpg --sign-with "mail@domain.com" --sign Dokumen.pdf
```

Perintah di atas akan menghasilkan Dokumen.pdf.gpg . Berkas *.gpg tersebut
merupakan hasil penyandian menggunakan kunci privat. Berkas tersebut juga
berisi dokumen aslinya. Umumnya tanda tangan GPG hanya berisi data tanda tangan
dengan dokumen asli terpisah. Untuk membuat tanda tangan terpisah dapat
menggunakan `--detach-sign`.

```
$ gpg --sign-with "mail@domain.com" --detach-sign Dokumen.pdf
```

Baris perintah di atas akan menghasilkan Dokumen.pdf.sig, berkas
Dokumen.pdf.sig ini merupakan berkas tanda tangan yang dapat digunakan untuk
memeriksa apakah Dokumen.pdf benar merupakan berkas yang dikirim oleh
mail@domain.com. Untuk verifikasi tanda tangan, penerima yang telah memiliki
kunci publik mail@domain.com dapat menggunakan baris perintah:

```
$ gpg -v --verify Dokumen.pdf.sig Dokumen.pdf
gpg: Signature made Sun 17 Apr 2016 01:19:05 PM WIB using RSA key ID 35704B61
gpg: using PGP trust model
gpg: Good signature from "Setyo N ("Test") <mail@domain.com>" [ultimate]
gpg: binary signature, digest algorithm SHA256, key algorithm rsa4096
```

Baris perintah di atas berhasil dengan asumsi penerima telah
memasukkan kunci publik mail@domain.com ke dalam keyring miliknya.
Dengan menambahkan kunci publik ke dalam keyring kita, kita telah
memberi tanda jika kunci publik tersebut terpercaya. Untuk
menambahkan kunci publik ke dalam keyring dapat menggunakan
perintah:

```
$ gpg --import public.key
gpg: key 35704B61: "Setyo N ("Test") <mail@domain.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

Dengan `public.key` merupakan kunci publik yang telah diekspor dan diterima
oleh penerima berkas. Atau kita juga dapat melakukan verifikasi tanpa melakukan
impor atau menambahkan kunci publik pada keyring kita, yang pertama kita harus
mengubah kunci publik yang diterima dari ascii armored menjadi binary format:

```
$ gpg -o public.gpg --dearmor public.key
```

Baris perintah di atas akan menghasilkan berkas `public.gpg` yang merupakan
kunci publik dengan format binary. Lalu kita dapat melakukan verifikasi dengan
perintah

```
$ gpg --no-default-keyring --keyring ./public.gpg --verify Dokumen.pdf.sig Dokumen.pdf
gpg: Signature made Sun 17 Apr 2016 01:19:05 PM WIB using RSA key ID 35704B61
gpg: Good signature from "Setyo N ("Test") <mail@domain.com>"
```

Berikutnya adalah enkripsi. Orang yang telah menerima kunci
publik milik kita dapat melakukan enkripsi berkas menggunakan
kunci publik tersebut dan hanya kita yang dapat membuka berkas
tersebut. Untuk melakukan enkripsi dapat menggunakan baris
perintah:

```
$ gpg --encrypt --armor -r mail@domain.com berkasrahasia.txt
```

Baris perintah tersebut akan menghasilkan berkasrahasia.txt.asc. Penggunaan
`-r` untuk menentukan penerima berkas, sehingga akan digunakan kunci publik
milik mail@domain.com. Baris perintah untuk enkripsi bisa dilakukan apabila
kunci publik tersebut sudah terlebih dahulu ditambahkan pada keyring.

Berikut isi dari `berkasrahasia.txt`

```
INI RAHASIA
```

Dan berikut ini setelah menjadi berkasrahasia.txt.asc

```
-----BEGIN PGP MESSAGE-----
Version: GnuPG v2

hQIMA6ezDBh31NlqARAAw8UukvwiA7SdBPghhsz7AguG34/pRx8oezKwILy3W72z
a/3keNZ+wqlUqVqcPgU7BVd7hSbV4Ohv1yx69Fprxo4BfFmsCL6vAmi45WNpkzOM
v6/Zuxpo7io/67fJcvAc2aO4MGhXUxGeFl5lHQzJoC9Qre2xRW6IMG0SKwNo3336
hivO374j1IWMz2B+GD/IKxU9IhJrgESxe3CaozmWkE5SdjxvTjrMwBn0AMmX6sil
2+FzNg8eteOz+bbfDL9c2A1NDE9Qw8fau6RoW2gKjaCBeorspb9kyWNAUUyURH2T
SHxIiN5okJqTdF05Ql1hGUEBCoxG7+D+774F0Eoc2y8WBFiC67H1FXu3Fi4knrSA
/aNgc2DfxoZTpBUm8b/Y7j8ZTEIWDFXtdcyJfCIV+2HZ6ceYKcYfloM+eW4cdH4t
Wn6X2izTKEMav1IAS5RiJJGsaDS2/HMqaJwJWA0g45a3eCGwiPr+LBsIg03O1kMS
ui+TQqa/twUpoq6IdoHto4O2hJ6m/smHF/JeHKpIwpHYH8N4WXZDF30lJ5Dk14jp
h4KktTdcNNx+WYL8ew1F5QKtoiZjS9WVJdemaiOiGVs/dLeMo381BCR/dvw7ft9+
ch8OuSf1v+YifGJozujSlbc790KIufodA7/LXNsWNAyAL7ldFWWw7nmklqQTi/LS
WAEa3oRr0Ptk2FQX+mD1F90j1O4mPANAtq6MViiAFqIBcg4T7Z2XOjMgaY9M1Xuh
aNadW2P2i6ogQFLWIC1aojBUbgjBH9qg+IC7xeVGKEJ24tCiNUE519A=
=1EYA
-----END PGP MESSAGE-----
```

Setelah menerima berkasrahasia.txt.asc pemilik kunci private dapat melakukan
dekripsi dengan perintah :

```
$ gpg --output berkasrahasia.txt --decrypt berkasrahasia.txt.asc
gpg: encrypted with 4096-bit RSA key, ID 77D4D96A, created 2016-04-16
      "Setyo N ("Test") <mail@domain.com>"
```

Kalau dirasa cara-cara di atas rumit dan repot, dapat juga dengan menggunakan
`seahorse`. Seahorse memiliki tampilan grafis sehingga tidak perlu menggunakan
baris perintah pada terminal.

```
# pacman -S seahorse
```

{{< figure src="images/seahorse.png" >}}

Sekian.

[RFC4880]: https://tools.ietf.org/html/rfc4880
[OpenPGP]: https://en.wikipedia.org/wiki/OpenPGP
[GPG]:     https://en.wikipedia.org/wiki/GNU_Privacy_Guard
[PGP]:     https://en.wikipedia.org/wiki/Pretty_Good_Privacy
