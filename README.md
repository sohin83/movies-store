# Movestore (newVidly)

A RESTful API for managing movies, genres, and users. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Movies Management**: Create, read, update, and delete movies.
- **Genre Management**: Manage movie genres.
- **User Management**: User registration and profile management.
- **Authentication**: Secure JWT-based authentication.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (via Mongoose)
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## API Endpoints

| Method | Endpoint      | Description            |
| :----- | :------------ | :--------------------- |
| GET    | `/api/movies` | Get all movies         |
| POST   | `/api/movies` | Create a new movie     |
| GET    | `/api/genres` | Get all genres         |
| POST   | `/api/genres` | Create a new genre     |
| POST   | `/api/users`  | Register a new user    |
| POST   | `/api/auth`   | Login user             |

*(Note: This is a high-level overview. Check source files for full API details.)*

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/newvidly
JWT_PRIVATE_KEY=your_jwt_private_key
```

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    ```

    The server will start on port 3000 (or the port defined in your `.env`).

3.  **Run Production Server**

    ```bash
    npm start
    ```

## Scripts

- `npm run dev`: Starts the application in watch mode using `tsx`.
- `npm start`: Starts the application using `tsx`.
- `npm run format`: Formats code using Prettier.
