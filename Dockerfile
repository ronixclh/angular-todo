# Stage 1: Build Angular Universal (SSR) app
FROM node:18-alpine AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm ci

# Install Angular CLI and JSON Server globally
RUN npm install -g @angular/cli json-server

# Copy the rest of the files
COPY . .

# Build both the browser and server apps
RUN npm run build --prod
RUN npm run build:ssr

# Stage 2: Set up Nginx to serve static files
FROM nginx:alpine AS nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

# Copy the static files from the previous build
COPY --from=build /app/dist/angular-todo/browser /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Stage 3: Run SSR server and JSON Server
FROM node:18-alpine AS server

WORKDIR /app

# Copy the build output from Stage 1
COPY --from=build /app /app

# Start both the Angular SSR server and JSON Server
CMD ["sh", "-c", "node dist/angular-todo/server/main.js & json-server --watch db.json --port 3000"]

# Expose ports for the SSR server (4000) and JSON Server (3000)
EXPOSE 4000 3000
