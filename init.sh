#!/bin/bash
# init-no-docker.sh
# Скрипт для инициализации и запуска проекта без Docker

# Создаем .env файлы для бэкенда и фронтенда
echo "Создание .env файлов..."

# .env для бэкенда
cat > ./back/.env << EOL
# База данных
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=pool_aggregator

# JWT
JWT_SECRET=your_jwt_secret_key_change_in_production

# Сервер
PORT=4000
FRONTEND_URL=http://localhost:3000
EOL

# .env для фронтенда
cat > ./front/.env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:4000/api
EOL

echo "Установка зависимостей для backend..."
cd back
npm uninstall bcrypt  # Удаляем несовместимую версию
npm install bcrypt --build-from-source  # Устанавливаем с пересборкой для arm64

echo "Установка зависимостей для frontend..."
cd ../front
npm install

echo "Проверка существования базы данных..."
# Проверка, существует ли база данных, и создание если нет
cd ..
cd back

# Проверяем, существует ли база данных pool_aggregator
if psql -lqt | cut -d \| -f 1 | grep -qw pool_aggregator; then
    echo "База данных pool_aggregator уже существует"
else
    echo "Создание базы данных pool_aggregator..."
    createdb pool_aggregator
fi

echo "Запуск скрипта инициализации базы данных..."
npx ts-node src/seed.ts

echo "Инициализация завершена!"
echo "Для запуска бэкенда выполните: cd back && npm run start:dev"
echo "Для запуска фронтенда выполните: cd front && npm run dev"
echo ""
echo "Доступ в админ-панель:"
echo "Email: admin@example.com"
echo "Пароль: admin123"