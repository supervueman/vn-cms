## Установка и запуск

1. Создаем рабочую директорию и переходим в нее `mkdir ${app} && cd ${app}`
2. Создаем директорию для системы и переходим в нее `mkdir admin-panel && cd admin-panel`
3. Клонируем платформу `git clone https://github.com/multikey-production/platform.git ./`
4. Запускаем установку пакетов `npm run install`
5. Запускаем серверную часть `npm run server:dev`
6. Запускаем клиентскую часть `npm run manager:dev`

---

## Production

Для production необходим pm2

1. Сборка клиентской части `npm run manager:build`
2. Запуск серверной части `npm run server:start:pm2`
3. Запуск клиентской части `npm run manager:start:pm2`
