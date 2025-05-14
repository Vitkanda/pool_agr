# Pool Aggregator

## Описание

Pool Aggregator - это современное веб-приложение, построенное с использованием микросервисной архитектуры. Проект состоит из фронтенд-приложения на Next.js и бэкенд-сервиса на Node.js, работающих с базой данных PostgreSQL.

## Технологический стек

- **Frontend**: Next.js
- **Backend**: Node.js
- **База данных**: PostgreSQL
- **Контейнеризация**: Docker & Docker Compose

## Требования

- Docker
- Docker Compose
- Node.js (для локальной разработки)
- npm или yarn

## Установка и запуск

### Использование Docker (рекомендуется)

1. Клонируйте репозиторий:

```bash
git clone [URL репозитория]
cd pool-aggregator
```

2. Запустите проект с помощью Docker Compose:

```bash
docker-compose up -d
```

Приложение будет доступно по следующим адресам:

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- PostgreSQL: localhost:5432

### Локальная разработка

1. Установите зависимости для бэкенда:

```bash
cd back
npm install
```

2. Установите зависимости для фронтенда:

```bash
cd front
npm install
```

3. Запустите базу данных:

```bash
docker-compose up postgres -d
```

4. Запустите бэкенд:

```bash
cd back
npm run start:dev
```

5. Запустите фронтенд:

```bash
cd front
npm run dev
```

## Структура проекта

```
pool-aggregator/
├── front/           # Frontend приложение (Next.js)
├── back/            # Backend приложение (Node.js)
├── docker-compose.yml
└── init.sh         # Скрипт инициализации
```

## Переменные окружения

### Backend

- `NODE_ENV`: Окружение (development/production)
- `DB_HOST`: Хост базы данных
- `DB_PORT`: Порт базы данных
- `DB_USERNAME`: Имя пользователя базы данных
- `DB_PASSWORD`: Пароль базы данных
- `DB_DATABASE`: Имя базы данных
- `JWT_SECRET`: Секретный ключ для JWT
- `PORT`: Порт для бэкенд-сервера
- `FRONTEND_URL`: URL фронтенд-приложения

### Frontend

- `NEXT_PUBLIC_API_URL`: URL бэкенд-API

## Разработка

- Бэкенд API доступен по адресу: http://localhost:4000/api
- Swagger документация доступна по адресу: http://localhost:4000/api/docs
- Фронтенд приложение доступно по адресу: http://localhost:3000


