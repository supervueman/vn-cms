# Platform

## Установка и запуск

1. Создаем рабочую директорию и переходим в нее `mkdir ${app} && cd ${app}`
2. Клонируем платформу `git clone https://github.com/multikey-production/platform.git ./`
3. Запускаем установку пакетов `npm run install`
4. Создаем и редактируем .env файлы в папках `./manager_dev` и `./server`, как указано в `.env_example` соответственно

---

## Запуск development

1. Запускаем серверную часть `npm run server:dev`
2. Запускаем клиентскую часть `npm run manager:dev`
3. Запускаем приложение `npm run client:dev` (Предварительно нужно выполнить пункты указанные ниже)

---

## Установка клиентской части приложения

1. Создаем в корне папку `client` и переходим в нее
2. Клонируем шаблон `git clone https://github.com/supervueman/vn-client-nuxt.git ./`
3. Устанавливаем зависимости `npm install`
4. Создаем и редактируем .env файл, как указано в `.env_example`

Данный [шаблон](https://github.com/supervueman/vn-client-nuxt) является шаблоном для [Nuxt.js](https://nuxtjs.org) с предварительными настройками для работы с платформой.

---

## Запуcк production

Для production необходим pm2

1. Сборка клиентской части платформы `npm run manager:build`
2. Запуск серверной части платформы `npm run server:start:pm2`
3. Запуск клиентской части платформы `npm run manager:start:pm2`
4. Запуск вашего приложения `npm run client:start:pm2`

### Так же есть единая команда для запуска приложения целиком

`npm run app:start:pm2`

---

## Примечание

Для корректного отображения изображений, необходимо создать симлинки на папку files, в папках `client/static` и `manager_dev/public/static`. Для этого есть команды `npm run manager:dev:create:symlink` и `npm run client:create:symlink` соответсвенно.
При запуске в production так же необходимо создать симлинк на files в папке собранной клиентской части платформы `manager/static`, для этого необходим выполнить команду `npm run manager:create:symlink`.

---

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
