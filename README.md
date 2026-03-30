# URLastic — Backend

Express.js REST API for the URLastic URL shortener. Handles URL creation, redirection, user authentication, and URL management.

## Tech Stack

- **Runtime**: Node.js 18
- **Framework**: Express.js 4
- **Database**: MongoDB 7 via Mongoose
- **Auth**: JWT (jsonwebtoken) + Argon2 password hashing
- **Other**: CORS, dotenv, Nodemon (dev)

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance running (or use Docker Compose from the root)

### Install & Run

```bash
cd URLastic-backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/urlastic
JWT_SECRET=your_secret_here
PORT=3001
```

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

The server runs on `http://localhost:3001`.

### Run with Docker

From the project root:

```bash
docker compose up --build
```

## Project Structure

```
URLastic-backend/
├── controllers/       # Request handlers (business logic)
│   ├── loginController.js
│   ├── registerController.js
│   ├── urlController.js
│   └── usersController.js
├── middleware/        # Express middleware
│   ├── jwtVerify.js   # Required auth
│   └── jwtOptional.js # Optional auth
├── models/            # Data access layer
│   ├── connection.js
│   ├── urlManager.js
│   └── UsersManager.js
├── routes/            # Route definitions
│   ├── indexRoute.js
│   ├── loginRoute.js
│   ├── registerRoute.js
│   ├── urlsRoute.js
│   └── usersRoute.js
├── schemas/           # Mongoose schemas
│   ├── urls.js
│   └── user.js
├── index.js           # Server entry point
└── Dockerfile
```

## API Reference

### Auth

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | /register | `{ firstName, lastName, email, password }` | Create a new user |
| POST | /login | `{ email, password }` | Returns a JWT token |

### URLs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /urls | No | List all URLs |
| GET | /urls/:id | No | Get URL by ID |
| POST | /urls | Optional | Create a shortened URL |
| PATCH | /urls/:id | Required | Set a custom short code |
| DELETE | /urls/:id | Required | Delete a URL |
| GET | /urls/r/:shortUrl | No | Redirect to original URL (301) |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /users/:userId/urls | Required | Get all URLs created by the user |

### Authentication

Protected endpoints require a `Bearer` token in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Data Models

**User**
```
firstName: String
lastName:  String
email:     String (unique)
password:  String (hashed with Argon2)
```

**URL**
```
originalUrl: String
shortenUrl:  String (unique, 8-char random or custom)
user:        ObjectId (ref: User, optional)
createdAt:   Date
updatedAt:   Date
```
