---
title: Menggunakan HTML Attribute Value di CSS
categories: 
  - Development
tags:
  - CSS
  - HTML
date: 2019-09-23
---
Normalnya, hubungan CSS dengan HTML sebatas CSS memberi _style_ pada elemen HTML
yang cocok dengan _CSS selectors_ yang digunakan dan CSS tidak mengetahui isi 
dari HTML tersebut. Tetapi ada cara agar CSS bisa mengetahui data di HTML, bahkan
menggunakannya di CSS, kita dapat menggunakan fungsi `attr()`. Benar `attr()` 
adalah fungsi yang dapat dijalankan di CSS, _what a time to be alive_.

<!--more-->

```html
<!-- HTML -->
<button data-tooltip=" | Text ini akan muncul saat mouse hover">
  Button
</button>
```

```css
button:hover::after {
  content: attr(data-tooltip);
}
```

<style>
.demo button:hover::after {
    content: attr(data-tooltip);
}
</style>
<div class="demo">
    <button 
        class="border-indigo-800 text-white py-2 px-4 rounded-lg bg-indigo-600" 
        data-tooltip=" | Text ini akan muncul saat mouse hover"
        >
        Button
    </button>
</div>
