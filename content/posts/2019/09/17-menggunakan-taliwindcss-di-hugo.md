---
title: Menggunakan TailwindCss di Hugo-Pipes
date: 2019-09-17
tags:
    - Web Development
---

Hugo Pipes merupakan fitur dari hugo _static site generator_ yang berfungsi
untuk memroses aset seperti css dan javascript[^1]. Hugo Pipes mendukung
penggunaan postcss _out of the box_[^2]. Karena tailwindcss sebenarnya merupakan
plugin dari postcss, untuk menggunakan tailwindcss di Hugo Pipes kita dapat
menggunakan postcss. Untuk dapat menggunakan postcss di Hugo Pipe, Hugo
mengharuskan `postcss-cli` untuk terlebih dahulu terinstall di sistem.

<!--more-->

### Install PostCss CLI

```shell
npm install -g postcss-cli
```

### Install TailwindCss dan Autoprefixer

Install `tailwindcss` dan `autoprefixer` di root project folder atau di theme
folder. Install dengan perintah

```shell
npm install --save-dev tailwindcss autoprefixer
```

### Buat PostCss config

Buat berkas baru dengan nama `postcss.config.js` atau nama lain yang nanti bisa
diatur lebih lanjut. Isi berkas tersebut dengan:

```javascript
// postcss.config.js

module.exports = {
    plugins: [require('tailwindcss'), require('autoprefixer')],
}
```

### Penggunaan di Hugo-Pipes

```html
{{ $css := resources.Get "css/style.css" | resources.PostCSS }}

<link href="{{ $css.RelPermalink }}" rel="stylesheet" />
```

Apabila kita menggunakan nama lain untuk `postcss-config.js`, atau config berada
di tempat khusus di luar root project atau root theme, bisa gunakan:

```html
{{ $css := resources.Get "css/style.css" | resources.PostCSS (dict "config"
"customPostCSS.js") }}

<link href="{{ $css.RelPermalink }}" rel="stylesheet" />
```

Berkas `css/style.css` berada pada direktori assets yang dapat diatur
menggunakan `assetDir` di konfigurasi hugo. Isi `style.css`

```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```

Lebih lanjut tentang penggunaan tailwidcss bisa langsung melihat dokumentasinya
di <https://tailwindcss.com/docs>

### Custom Tailwind Config

Hal yang membuat tailwindcss menarik adalah karena tailwind sangat mudah
dikustomisasi. Kustomisasi tailwind dapat dilakukan dengan menggunakan berkas
config `tailwind.config.js`. Buat berkas `tailwind.config.js` dengan isi:

```js
// tailwind.config.js

module.exports = {
    theme: {},
    variants: {},
    plugins: [],
}
```

Atau dengan mengetik perintah berikut untuk membuat berkas config otomatis.

```shell
npx tailwind init
```

Lalu ubah konfigurasi postcss (`postcss-config.js`).

```js
// postcss.config.js

module.exports = {
    plugins: [
        require('tailwindcss')(__dirname + '/tailwind.config.js'),
        require('autoprefixer'),
    ],
}
```

### Mengurangi Ukuran CSS

Salah satu kekurangan dari tailwind adalah ukuran berkasnya yang cukup besar
dibanding framework lain. Berikut merupakan tabel perbandingan ukuran css
framework:

| Framework   | Original Size | Minified |
| :---------- | ------------: | -------: |
| Tailwind    |       477.6kb |  350.4kb |
| Bootstrap   |       187.8kb |  152.1kb |
| Bulma       |       205.6kb |  172.4kb |
| Foundation  |       154.1kb |  119.2kb |
| Tachyons    |       111.7kb |   71.8kb |
| Semantic UI |       809.4kb |  613.8kb |
| Materialize |       175.0kb |  138.5kb |

Untuk mengurangi ukuran tailwindcss ada beberapa cara yang dapat digunakan.

#### Menghilangkan Theme Yang Tidak Diperlukan

##### Membatasi Warna

Default theme pada tailwindcss terdiri dari 93 warna untuk _backgroud_, teks,
dan _border_, yang masing-masing memiliki varian `hover` dan `focus` juga varian
untuk masing-masing ukuran layar. Untuk warna saja tailwindcss membuat 4185
class dari total 8271 total class pada _default build_[^3]. Cara mengurangi
palet warna adalah dengan mengubah `tailwind.config.js` dan membuat palet warna
baru yang mereferensi palet default.

```js
// tailwind.config.js
const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        colors: {
            black: colors.black,
            gray: colors.gray,
            indigo: colors.indigo,
            white: colors.white,
        },
    },
    variants: {},
    plugins: [],
}
```

Konfigurasi di atas membuat css yang dihasilkan tailwind hanya terdiri dari
warna hitam, putih, abu-abu, dan indigo.

##### Membatasi Breakpoint

Membatasi _breakpoint_ caranya hampir sama dengan cara membatasi warna di
atas[^4]. Ubah konfigurasi menjadi:

```js
// tailwind.config.js

const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        colors: {
            black: colors.black,
            gray: colors.gray,
            indigo: colors.indigo,
            white: colors.white,
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }
        },
    },
    variants: {},
    plugins: [],
}
```

Konfigurasi di atas membatasi class _breakpoint_ menjadi hanya satu dari yang
semula 4.

```js
// tailwind.config.js

module.exports = {
    theme: {
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }
        },
    },
}
```

#### Menggunakan PurgeCSS

PurgeCss merupakan plugin lain dari postcss yang dapat menghilangkan css class
yang tidak terpakai. Untuk menggunakan PurgeCss pertama install PurgeCss dengan
cara:

```shell
npm install @fullhuman/postcss-purgecss --save-dev
```

Berikutnya tambahkan PurgeCss sebagai plugin terakhir di postcss config

```js
// postcss.config.js

const purgecss = require('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the template files in your project
    content: [__dirname + '/layouts/**/*.html'],

    // Include any special characters you're using in this regular expression
    defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
})

module.exports = {
    plugins: [
        require('tailwindcss')(__dirname + '/tailwind.config.js'),
        require('autoprefixer'),

        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : []),
    ],
}
```

Contoh di atas memastikan bahwa PurgeCss hanya berjalan apabila
`HUGO_ENVIRONMENT'` `===` `production`. PurgeCss menggunakan `extractors` untuk
dapat menemukan teks di template yang merupakan `class` css. Contoh di atas
menggunakan custom extractors untuk menemukan semua class yang di-_generate_
tailwindcss[^5].

```js
defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
```

[^1]: https://gohugo.io/hugo-pipes/introduction/
[^2]: https://gohugo.io/hugo-pipes/postcss/
[^3]:
    https://tailwindcss.com/docs/controlling-file-size#limiting-your-color-palette

[^4]: https://tailwindcss.com/docs/breakpoints/#app
[^5]: https://tailwindcss.com/docs/controlling-file-size#removing-unused-css
