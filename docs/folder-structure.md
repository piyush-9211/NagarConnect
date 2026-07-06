# NagarConnect Folder Structure

## Overview

The `NagarConnect` project follows a well-organized folder structure that separates concerns and makes it easy to manage different components such as frontend, backend, AI service, training scripts, documentation, Docker configuration, GitHub settings, and more.

Below is the detailed breakdown of each directory within the project:

## Project Root
```
NagarConnect/
│
├── client/          # Frontend React application
├── server/          # Backend Node.js application
├── ai-service/      # AI service using FastAPI
├── ai-training/     # Scripts for training the YOLOv8 model
├── docs/            # Documentation and user guides
├── docker/          # Docker configuration files
├── .github/         # GitHub repository settings
├── README.md        # Main project documentation
├── .gitignore       # Git ignore rules
└── docker-compose.yml # Docker Compose file for deployment
```

## Detailed Directory Structure

### 1. `client/`
- **Description**: Contains the frontend React application.
- **Structure**:
  ```
  client/
  ├── public/
  │   └── index.html
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── assets/
  │   ├── App.js
  │   ├── index.js
  │   └── ...
  ├── package.json
  ├── .env
  └── ...
  ```

### 2. `server/`
- **Description**: Contains the backend Node.js application.
- **Structure**:
  ```
  server/
  ├── routes/
  ├── controllers/
  ├── models/
  ├── middleware/
  ├── config/
  │   ├── db.config.js
  │   └── ...
  ├── uploads/
  ├── package.json
  ├── .env
  └── ...
  ```

### 3. `ai-service/`
- **Description**: Contains the AI service using FastAPI.
- **Structure**:
  ```
  ai-service/
  ├── models/
  │   └── yolov8.pt
  ├── main.py
  ├── requirements.txt
  └── ...
  ```

### 4. `ai-training/`
- **Description**: Contains scripts and data for training the YOLOv8 model.
- **Structure**:
  ```
  ai-training/
  ├── datasets/
  │   ├── images/
  │   ├── labels/
  │   └── ...
  ├── scripts/
  │   ├── train.py
  │   └── ...
  ├── requirements.txt
  └── ...
  ```

### 5. `docs/`
- **Description**: Contains documentation and user guides.
- **Structure**:
  ```
  docs/
  ├── architecture.md
  ├── installation.md
  ├── usage.md
  ├── contributing.md
  └── ...
  ```

### 6. `docker/`
- **Description**: Contains Docker configuration files.
- **Structure**:
  ```
  docker/
  ├── frontend/Dockerfile
  ├── backend/Dockerfile
  ├── ai-service/Dockerfile
  └── ...
  ```

### 7. `.github/`
- **Description**: Contains GitHub repository settings such as workflows, issue templates, and pull request templates.
- **Structure**:
  ```
  .github/
  ├── workflows/
  │   └── ci.yml
  ├── ISSUE_TEMPLATE/
  │   └── bug_report.md
  └── PULL_REQUEST_TEMPLATE.md
  ```

### 8. `README.md`
- **Description**: The main project documentation file that provides an overview, setup instructions, and other important information.
  
### 9. `.gitignore`
- **Description**: Specifies files and directories to be ignored by Git, ensuring they are not tracked in the version control system.

### 10. `docker-compose.yml`
- **Description**: The Docker Compose file that defines and orchestrates the services for frontend, backend, AI service, and database using Docker containers.

## Summary

This folder structure ensures a clean separation of concerns, making it easier to develop, maintain, and scale each component of the NagarConnect project. Each directory is dedicated to a specific aspect of the application, allowing developers to focus on their respective areas without interference from other parts of the system.
