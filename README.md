# Platform

## Установка и запуск

1. Создаем рабочую директорию и переходим в нее `mkdir ${app} && cd ${app}`
2. Клонируем платформу `git clone https://github.com/multikey-production/platform.git ./`
3. Запускаем установку пакетов `npm run install`
4. Редактируем .env файлы в папках `./manager_dev` и `./server`

---

## Запуск development

1. Запускаем серверную часть `npm run server:dev`
2. Запускаем клиентскую часть `npm run manager:dev`
3. Запускаем приложение `npm run client:dev`

---

## Запуcк production

Для production необходим pm2

1. Сборка клиентской части `npm run manager:build`
2. Запуск серверной части `npm run server:start:pm2`
3. Запуск клиентской части `npm run manager:start:pm2`

---

## Модели

### User - модель пользователя

Связь с user - `user`. Тип - `belongsTo`.
Для получения родительского пользователя необходимо передать в параметрах выборки следующее:

```
{
  include: ['user']
}
```

Связь с role - `role`. Тип - `belongsTo`.
Для получения роли пользователя необходимо передать в параметрах выборки следующее:

```
{
  include: ['role']
}
```

Связь с resource. Тип - `hasMany`.
Для получения ресурсов пользователя необходимо передать в параметрах выборки следующее:

```
{
  include: ['resources']
}
```

## LICENSE

Copyright (c) 2020 supervueman

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### Developer [supervueman](https://github.com/supervueman)
