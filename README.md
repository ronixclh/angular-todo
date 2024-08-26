# Angular ToDo Application

## Description

This is a ToDo application built with Angular for the frontend and `json-server`. The project is set up to run with Docker, making it easy to start and deploy on any OS.

### Tech Stack

- **Frontend**: Angular
- **Backend**: `json-server`
- **Containerization**: Docker, Docker Compose
- **UI Library**: Angular Material
- **Github Actions** are set-up to autmatically run tests

## How to Run the Application

### Step 1: Fork the Repository

First, fork this repository. Then, clone the forked repository to your local machine:

```bash
git clone https://github.com/YOUR-USERNAME/angular-todo.git
cd angular-todo
```

### Step 2: Run the Application with Docker

The application is pre-configured to run with Docker. Simply run the following command to build and start the containers:

```bash
docker-compose up --build
```

This will:

- Build the Angular frontend.
- Start json-server for the API.

After running the command, the application will be available at:

```bash
http://localhost:4200
```

The API will be available at:

```bash
http://localhost:3000
```
