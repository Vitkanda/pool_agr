# 🌊 Pool Aggregator

Современное веб-приложение в микросервисной архитектуре для агрегации детских бассейнов. Состоит из фронтенда на Next.js и бэкенда на Node.js с PostgreSQL.

## 🚀 Стек технологий

- **Frontend**: Next.js (TypeScript)
- **Backend**: Node.js, Express
- **База данных**: PostgreSQL
- **Контейнеризация**: Docker & Docker Compose
- **API**: REST + Swagger UI

## 📦 Установка и запуск

### 🐳 Использование Docker (рекомендуется)

```bash
git clone https://github.com/Vitkanda/pool_agr.git
cd pool_agr
docker-compose up -d
```

Доступ по умолчанию:

- Frontend → http://localhost:3000  
- Backend API → http://localhost:4000  
- Swagger UI → http://localhost:4000/api/docs

### 💻 Локальная разработка

```bash
# Установка зависимостей
cd back && npm install
cd ../front && npm install

# Запуск базы данных
docker-compose up postgres -d

# Запуск backend
cd ../back
npm run start:dev

# Запуск frontend
cd ../front
npm run dev
```

## 📁 Структура проекта

```
pool_agr/
├── front/              # Next.js frontend
├── back/               # Node.js backend (Express)
├── docker-compose.yml  # Конфигурация контейнеров
└── init.sh             # Скрипт инициализации окружения
```

## 🔐 Переменные окружения

Примеры переменных приведены в `.env.example`.

### Backend

- `NODE_ENV`
- `PORT`
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`
- `JWT_SECRET`
- `FRONTEND_URL`

### Frontend

- `NEXT_PUBLIC_API_URL`

## ⚙️ Особенности

- Модульная архитектура фронта и бэка
- Полноценная система авторизации и JWT
- Swagger UI для документации
- Адаптивный интерфейс
- Возможность масштабирования проекта
