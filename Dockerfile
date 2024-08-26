# Stage 1: Сборка Angular-приложения
FROM node:latest AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем все файлы приложения
COPY . .

# Сборка приложения для production
RUN npm run build --prod

# Stage 2: Создание финального образа на базе nginx для раздачи статических файлов
FROM nginx:alpine

# Копируем сгенерированные файлы в директорию для сервера Nginx
COPY --from=build /app/dist/angular-todo-app/browser /usr/share/nginx/html

# Копируем конфигурационный файл для Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Экспонируем порт для доступа
EXPOSE 80

# Запуск Nginx сервера
CMD ["nginx", "-g", "daemon off;"]
