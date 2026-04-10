# TaskPlanet Social App 🚀

A full-stack mini social media application built as part of the **3W Full Stack Internship Assignment**. Users can sign up, create posts with text or images, view a public feed, and like or comment on posts — inspired by the Social Page in the TaskPlanet app.

🔗 **Live Demo:** [social-app-beta-three.vercel.app](https://social-app-beta-three.vercel.app)

---

## ✨ Features

- 🔐 **Authentication** — Sign up and log in with email and password
- 📝 **Create Posts** — Post text, images, or both
- 📰 **Public Feed** — View all posts from all users in real time
- ❤️ **Likes** — Like any post; like count updates instantly
- 💬 **Comments** — Comment on any post; usernames are saved with each comment
- 👥 **Follow Users** — Follow/unfollow other users
- 🔍 **Search Users** — Find other users by name
- 🔔 **Notifications** — Get notified of activity
- 📂 **Feed Filters** — Switch between All, Following, and Trending tabs

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Render |
| Styling | CSS |

---

## 📁 Project Structure

```
social-app/
├── client/          # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── server/          # Node.js + Express backend
    ├── routes/
    ├── models/
    ├── middleware/
    └── index.js
```

> The database uses **two MongoDB collections** as per the assignment guidelines:
> - `users` — stores user accounts and auth info
> - `posts` — stores all posts with likes and comments

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone https://github.com/LeoSwing1/social-app.git
cd social-app
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the server:

```bash
npm start
```

The backend will run at `http://localhost:5000`

### 3. Set Up the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `/client` directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 📸 Screenshots

### Login Page
![Login](https://social-app-beta-three.vercel.app)

### Feed
![Feed](https://social-app-beta-three.vercel.app)

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and receive token |
| GET | `/api/posts` | Get all posts (feed) |
| POST | `/api/posts` | Create a new post |
| PUT | `/api/posts/:id/like` | Like or unlike a post |
| POST | `/api/posts/:id/comment` | Add a comment to a post |

---

## 🏗 Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 👤 Author

**Leo**
- GitHub: [@LeoSwing1](https://github.com/LeoSwing1)
- Email: kevinleoswing@gmail.com

---

## 📄 Assignment

This project was built as **Task 1** of the 3W Full Stack Developer Internship assignment.
