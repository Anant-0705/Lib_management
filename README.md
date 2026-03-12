# Library Management System

**B.Tech 4th Semester | AI308B - AI Driven Full Stack Development**
**MSE-1 Examination (Practical) - Even Sem 2025-26**

---

## Project Overview

A web-based Library Management System to manage books, members, and borrowing records.

---

## Project Structure

```
lib_management/
├── server/          # Node.js + Express + MongoDB Backend
│   ├── controllers/
│   │   └── bookController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Book.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── client/          # React + Tailwind CSS Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── BookList.jsx
    │   │   ├── BookCard.jsx
    │   │   ├── BookForm.jsx
    │   │   └── SearchBar.jsx
    │   ├── services/
    │   │   └── bookService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    └── package.json
```

---

## Setup Instructions

### Backend (Server)

```bash
cd server
npm install
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend (Client)

```bash
cd client
npm install
npm run dev
```

---

## REST API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | /books                | Add a new book       |
| GET    | /books                | Get all books        |
| GET    | /books/:id            | Get book by ID       |
| PUT    | /books/:id            | Update book details  |
| DELETE | /books/:id            | Delete a book        |
| GET    | /books/search?title=  | Search by title      |
| GET    | /books/search?author= | Search by author     |

---

## Environment Variables

### Server `.env`
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library_db
```

### Client `.env`
```
VITE_API_URL=http://localhost:5000
```

---

## Deployment

- **GitHub:** [Add your GitHub link here]
- **Render:** [Add your Render deployment link here]

---

## HTTP Status Codes Used

| Code | Meaning       |
|------|---------------|
| 200  | Success       |
| 201  | Created       |
| 400  | Bad Request   |
| 404  | Not Found     |
| 500  | Server Error  |
