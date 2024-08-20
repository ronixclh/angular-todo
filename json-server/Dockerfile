FROM node:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем json-server
RUN npm install -g json-server

# Копируем db.json с данными
COPY db.json .

# Экспонируем порт для доступа
EXPOSE 3000

# Запускаем json-server с данными из db.json
CMD ["json-server", "--watch", "db.json", "--port", "3000"]
