#  CollabNotes

A full-stack collaborative note-taking app where you can write notes, upload files, and share them with others in real time.

Built with **React + Tailwind** on the frontend and **Express + MongoDB** on the backend.

---

##  Features

-  **Auth** — Register and login with JWT-based authentication
-  **Rich Text Editor** — Write notes using Quill (bold, italic, lists, headings)
-  **File Uploads** — Attach PDFs and images to any note
-  **Public Link Sharing** — Generate a public link anyone can view
-  **Invite Collaborators** — Invite specific users by username to view or edit
-  **Real-time Collaboration** — Multiple users can edit a note together via Socket.io
-  **Auto-save** — Notes save automatically as you type (debounced)

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS |
| Rich Text | Quill.js |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Upload | Multer |
| Real-time | Socket.io |

---

##  Project Structure

```
collabnotes/
│
├── server/                  # Express backend
│   ├── index.js             # Entry point, Socket.io setup
│   ├── .env                 # Environment variables
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Note.js          # Note schema (with files + collaborators)
│   ├── routes/
│   │   ├── auth.js          # Register, Login
│   │   └── notes.js         # CRUD, upload, sharing
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   └── uploads/             # Stored uploaded files
│
└── client/                  # React frontend
    └── src/
        ├── api/
        │   └── axios.js         # Axios instance with auto token
        ├── context/
        │   └── AuthContext.jsx  # Global auth state
        ├── components/
        │   ├── Navbar.jsx
        │   ├── NoteCard.jsx
        │   └── ProtectedRoute.jsx
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            ├── Dashboard.jsx
            └── NotePage.jsx
```

---

##  Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

---

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/collabnotes.git
cd collabnotes
```

---

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGO_URI=mongodb://localhost:27017/collabnotes
JWT_SECRET=your_super_secret_key_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the server:

```bash
npm run dev
```

Server runs at **http://localhost:5000**

---

### 3. Set up the frontend

```bash
cd ../client
npm install
npm run dev
```

App runs at **http://localhost:5173**

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Login and get JWT token |

### Notes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/notes` | ✅ | Get all your notes |
| GET | `/api/notes/:id` | ✅ | Get a single note |
| GET | `/api/notes/share/:token` | ❌ | View a public note |
| POST | `/api/notes` | ✅ | Create a new note |
| PUT | `/api/notes/:id` | ✅ | Update title or content |
| DELETE | `/api/notes/:id` | ✅ | Delete a note (owner only) |
| POST | `/api/notes/:id/upload` | ✅ | Upload files to a note |
| PUT | `/api/notes/:id/share/public` | ✅ | Toggle public link |
| POST | `/api/notes/:id/share/invite` | ✅ | Invite a user by username |

---

##  How Auth Works

1. User registers → password is hashed with **bcrypt**
2. User logs in → server returns a **JWT token**
3. Token is stored in **localStorage**
4. Every API request automatically sends the token in the `Authorization` header
5. Server verifies the token on every protected route

---

##  How Sharing Works

**Public Link:**
- Owner toggles "Make Public" on a note
- A unique UUID token is generated and stored with the note
- Anyone with the link (`/share/:token`) can view it — no login needed

**Invite by Username:**
- Owner types a username and clicks Invite
- That user is added to the note's `collaborators` array
- They can now see the note in their Dashboard under "Shared with me"
- Real-time edits are synced via Socket.io

---

## 💾 How Auto-save Works

Instead of saving on every keystroke (which would spam the backend), we use a **debounce** pattern:

- User types → a 1.5 second timer starts
- If user types again → timer resets
- When user stops typing for 1.5 seconds → note saves automatically

This means the backend only gets called when the user actually pauses — efficient and seamless.

---

##  File Upload Rules

- Allowed types: **PDF, JPEG, PNG, GIF, WEBP**
- Max file size: **10MB per file**
- Max files per upload: **5 at a time**
- Files are stored in the `/server/uploads/` folder
- Served statically at `http://localhost:5000/uploads/filename`

---

##  Phases Built

- [x] Phase 1 — Backend (Auth + Notes CRUD + File Upload + Sharing APIs)
- [x] Phase 2 — Frontend (Auth pages + Dashboard + Components)
- [ ] Phase 3 — NotePage (Quill Editor + File UI + Share Panel)
- [ ] Phase 4 — Real-time Collaboration (Socket.io)

---

##  Pages

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Login with email + password |
| Register | `/register` | Create a new account |
| Dashboard | `/dashboard` | View all your notes |
| Note Editor | `/note/:id` | Edit a note |
| Public View | `/share/:token` | View a shared note (no login) |

---

##  Author

Built by **MANISH** 
