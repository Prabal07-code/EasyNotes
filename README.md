# EasyNotes — Notes App with Search

A full-stack note-taking app built with **React + Node.js + MongoDB**.

## Features
- ✅ Create, Read, Update, Delete notes
- ✅ Fast keyword search (MongoDB text index, debounced 250ms)
- ✅ Keyword highlighting in results
- ✅ Colorful notes with tags
- ✅ Pin important notes to top
- ✅ Clean, responsive UI

## Prerequisites
- Node.js v18+
- MongoDB running locally (`mongod`) OR a MongoDB Atlas URI

---

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Edit `.env` if needed (default uses `localhost:27017`):
```
MONGO_URI=mongodb://localhost:27017/notesapp
PORT=5000
```

Start the backend:
```bash
npm run dev    # with nodemon (auto-reload)
# or
npm start      # plain node
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/notes?q=keyword` | Get all / search notes |
| GET | `/api/notes/:id` | Get single note |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |
| GET | `/api/health` | Health check |

## Backend Query Optimization
- MongoDB **text index** on `title`, `content`, `tags` fields
- Compound sort: pinned notes first, then by `updatedAt`
- Debounced search (250ms) on frontend to avoid excessive requests
