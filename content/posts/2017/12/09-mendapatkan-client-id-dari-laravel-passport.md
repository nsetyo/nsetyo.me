---
title: Mendapatkan CLient ID Dari User Laravel Passport
categories:
  - Development
tags:
  - Laravel
  - Passport
  - PHP
date: 2017-12-09T07:53:52+07:00
---

Ketika menyimpan data transaksional pada database terkadang kita perlu menyimpan 
juga data client yang digunakan _user_ untuk menyimpan data. [Laravel Passport][1]
sayangnya tidak menyertakan atribute client id pada _Authenticated user_. Untuk 
mendapatkan client id dari _user_ dapat menggunakan cara berikut:

```php
<?php

use Illuminate\Support\Facades\DB;
use Lcobucci\JWT\Parser as JwtParser;
use League\OAuth2\Server\ResourceServer;
use Symfony\Bridge\PsrHttpMessage\Factory\DiactorosFactory;

...


    $token_id  = with(new JwtParser)
        ->parse($request->bearerToken())
        ->getHeader('jti');
    $row = DB::table('oauth_access_tokens')
        ->select('client_id')
        ->where('id', $token_id)
        ->get()
        ->first();

    $client_id = $row->client_id;

```
<!--more-->

[1]:https://laravel.com/docs/5.5/passport