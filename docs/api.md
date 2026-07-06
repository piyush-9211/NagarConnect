# NagarConnect REST API Specification

## Overview

NagarConnect is an AI-powered civic issue reporting platform where citizens can upload images of public infrastructure issues such as Potholes, Road Cracks, Garbage, Open Manholes, and Waterlogging. This document outlines the REST API specification for the backend services.

## Authentication APIs

### 1. POST /auth/register
- **Purpose**: Register a new user.
- **HTTP Method**: POST
- **URL**: `/auth/register`
- **Authentication Required**: No
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "email": "john.doe@example.com",
    "password": "secure_password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "User registered successfully",
    "user_id": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Username already exists"
  }
  ```
  ```json
  {
    "error": "Email already exists"
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/auth/register \
       -H "Content-Type: application/json" \
       -d '{
             "username": "john_doe",
             "email": "john.doe@example.com",
             "password": "secure_password123"
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "User registered successfully",
    "user_id": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Status Codes**:
  - `201 Created`
  - `400 Bad Request` (for invalid data)
  - `409 Conflict` (if username or email already exists)

### 2. POST /auth/login
- **Purpose**: Authenticate a user and issue a JWT token.
- **HTTP Method**: POST
- **URL**: `/auth/login`
- **Authentication Required**: No
- **Request Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "username": "john_doe",
    "password": "secure_password123"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Invalid credentials"
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/auth/login \
       -H "Content-Type: application/json" \
       -d '{
             "username": "john_doe",
             "password": "secure_password123"
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `400 Bad Request` (for invalid data)
  - `401 Unauthorized` (if credentials are incorrect)

### 3. GET /auth/profile
- **Purpose**: Get the user's profile information.
- **HTTP Method**: GET
- **URL**: `/auth/profile`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
- **Success Response**:
  ```json
  {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "john_doe",
    "email": "john.doe@example.com"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/auth/profile \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```
- **Example Response**:
  ```json
  {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "username": "john_doe",
    "email": "john.doe@example.com"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)

### 4. PUT /auth/profile
- **Purpose**: Update the user's profile information.
- **HTTP Method**: PUT
- **URL**: `/auth/profile`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "username": "new_john_doe",
    "email": "new.john.doe@example.com"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Profile updated successfully"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
  ```json
  {
    "error": "Username already exists"
  }
  ```
  ```json
  {
    "error": "Email already exists"
  }
  ```
- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3000/auth/profile \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
       -H "Content-Type: application/json" \
       -d '{
             "username": "new_john_doe",
             "email": "new.john.doe@example.com"
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "Profile updated successfully"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `400 Bad Request` (for invalid data)
  - `401 Unauthorized` (if token is invalid or expired)

## Report APIs

### 1. POST /reports
- **Purpose**: Create a new report.
- **HTTP Method**: POST
- **URL**: `/reports`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "description": "Pothole on Main St.",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    }
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Report created successfully",
    "report_id": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/reports \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
       -H "Content-Type: application/json" \
       -d '{
             "description": "Pothole on Main St.",
             "location": {
               "latitude": 37.7749,
               "longitude": -122.4194
             }
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "Report created successfully",
    "report_id": "123e4567-e89b-12d3-a456-426614174000"
  }
  ```
- **Status Codes**:
  - `201 Created`
  - `400 Bad Request` (for invalid data)
  - `401 Unauthorized` (if token is invalid or expired)

### 2. GET /reports
- **Purpose**: Retrieve a list of reports.
- **HTTP Method**: GET
- **URL**: `/reports`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
- **Success Response**:
  ```json
  {
    "reports": [
      {
        "report_id": "123e4567-e89b-12d3-a456-426614174000",
        "description": "Pothole on Main St.",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194
        },
        "status": "reported"
      }
    ]
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/reports \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```
- **Example Response**:
  ```json
  {
    "reports": [
      {
        "report_id": "123e4567-e89b-12d3-a456-426614174000",
        "description": "Pothole on Main St.",
        "location": {
          "latitude": 37.7749,
          "longitude": -122.4194
        },
        "status": "reported"
      }
    ]
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)

### 3. GET /reports/:report_id
- **Purpose**: Retrieve a specific report.
- **HTTP Method**: GET
- **URL**: `/reports/:report_id`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
- **Success Response**:
  ```json
  {
    "report_id": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Pothole on Main St.",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "status": "reported"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
  ```json
  {
    "error": "Report not found"
  }
  ```
- **Example Request**:
  ```bash
  curl -X GET http://localhost:3000/reports/123e4567-e89b-12d3-a456-426614174000 \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```
- **Example Response**:
  ```json
  {
    "report_id": "123e4567-e89b-12d3-a456-426614174000",
    "description": "Pothole on Main St.",
    "location": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "status": "reported"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)
  - `404 Not Found` (if report does not exist)

### 4. PUT /reports/:report_id
- **Purpose**: Update a specific report.
- **HTTP Method**: PUT
- **URL**: `/reports/:report_id`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "description": "Updated pothole description",
    "status": "in_progress"
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Report updated successfully"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
  ```json
  {
    "error": "Report not found"
  }
  ```
- **Example Request**:
  ```bash
  curl -X PUT http://localhost:3000/reports/123e4567-e89b-12d3-a456-426614174000 \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
       -H "Content-Type: application/json" \
       -d '{
             "description": "Updated pothole description",
             "status": "in_progress"
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "Report updated successfully"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `400 Bad Request` (for invalid data)
  - `401 Unauthorized` (if token is invalid or expired)
  - `404 Not Found` (if report does not exist)

### 5. DELETE /reports/:report_id
- **Purpose**: Delete a specific report.
- **HTTP Method**: DELETE
- **URL**: `/reports/:report_id`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
- **Success Response**:
  ```json
  {
    "message": "Report deleted successfully"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
  ```json
  {
    "error": "Report not found"
  }
  ```
- **Example Request**:
  ```bash
  curl -X DELETE http://localhost:3000/reports/123e4567-e89b-12d3-a456-426614174000 \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```
- **Example Response**:
  ```json
  {
    "message": "Report deleted successfully"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)
  - `404 Not Found` (if report does not exist)

## AI APIs

### 1. POST /ai/predict
- **Purpose**: Get a prediction from the AI model.
- **HTTP Method**: POST
- **URL**: `/ai/predict`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "data": [
      [0.5, 0.3, 0.8],
      [0.1, 0.9, 0.2]
    ]
  }
  ```
- **Success Response**:
  ```json
  {
    "predictions": [
      {
        "class": "ClassA",
        "confidence": 0.85
      },
      {
        "class": "ClassB",
        "confidence": 0.72
      }
    ]
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/ai/predict \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
       -H "Content-Type: application/json" \
       -d '{
             "data": [
               [0.5, 0.3, 0.8],
               [0.1, 0.9, 0.2]
             ]
           }'
  ```
- **Example Response**:
  ```json
  {
    "predictions": [
      {
        "class": "ClassA",
        "confidence": 0.85
      },
      {
        "class": "ClassB",
        "confidence": 0.72
      }
    ]
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)

## Notifications APIs

### 1. POST /notifications/send
- **Purpose**: Send a notification to the user.
- **HTTP Method**: POST
- **URL**: `/notifications/send`
- **Authentication Required**: Yes
- **Request Headers**:
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "user_id": "123e4567-e89b-12d3-a456-426614174000",
    "message": "Your report has been processed."
  }
  ```
- **Success Response**:
  ```json
  {
    "message": "Notification sent successfully"
  }
  ```
- **Error Responses**:
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
- **Example Request**:
  ```bash
  curl -X POST http://localhost:3000/notifications/send \
       -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
       -H "Content-Type: application/json" \
       -d '{
             "user_id": "123e4567-e89b-12d3-a456-426614174000",
             "message": "Your report has been processed."
           }'
  ```
- **Example Response**:
  ```json
  {
    "message": "Notification sent successfully"
  }
  ```
- **Status Codes**:
  - `200 OK`
  - `401 Unauthorized` (if token is invalid or expired)

## Standard Responses

### Success Response
```json
{
  "status": "success",
  "data": {
    // Data specific to the API endpoint
  }
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Error message"
}
```

## Authentication

All endpoints require authentication using a JWT token. The token must be included in the `Authorization` header with the format `Bearer <token>`.