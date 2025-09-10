# 📧 User Management System

A simple **Next.js + Prisma + Axios** full-stack CRUD application to manage user registration, update, deletion, and listing of users. It includes form validation, toast notifications, and a clean UI with icons.

---

## ✅ Features

* User Registration
* Update User Details
* Delete User
* Display User List
* Email validation to prevent duplicates
* Toast notifications for success/error
* Sequential numbering in user list
* Intuitive icons for edit and delete actions

---

## 🚀 Technologies Used

* **Next.js (App Router)** – React-based framework for frontend and API routes
* **Prisma ORM** – Database modeling and type-safe database access
* **Axios** – HTTP client for frontend requests
* **React Toastify** – Toast notifications for success/error messages
* **Tailwind CSS** – Utility-first CSS for styling
* **Node.js** – Backend environment
* **SQLite / PostgreSQL** – Example supported database

---

## ⚙️ Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/javed-ak/basic-user-registration-app.git
   cd basic-user-registration-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Setup `.env` file with database connection
   Example for SQLite:

   ```
   DATABASE_URL="file:./dev.db"
   ```

4. Run Prisma Migrate to create database schema

   ```bash
   npx prisma migrate dev --name init
   ```

5. Run the development server

   ```bash
   npm run dev
   ```

6. Visit the app at

   ```
   http://localhost:3000
   ```

---

## ⚡ Assumptions

* The email field must be unique for every user.
* No authentication is implemented (this is a demo CRUD app).
* The API assumes the server runs locally on port `3000`.
* Simple toast-based notification for user feedback.
* Sequential user numbering is based on the current order returned from the database.

---

## 🎯 API Routes Overview

| Route               | Method | Description         |
| ------------------- | ------ | ------------------- |
| `/api/user`         | POST   | Register a new user |
| `/api/user`         | GET    | Fetch all users     |
| `/api/user`         | PUT    | Update user details |
| `/api/user?id={id}` | DELETE | Delete user by ID   |

---

## 📁 Folder Structure (Key Files)

```
/app
├── /api
│   └── user
│       └── route.ts     # API logic (CRUD)
├── /user
│   ├── register         # Register page
│   └── UpdateForm.tsx   # Update modal component
│
├── components
│   └── Button.tsx       # Reusable button component
│
├── page.tsx             # Home page with user listing
```

---

## ✅ Future Improvements (Optional)

* Add authentication (NextAuth or JWT).
* Implement pagination for large user lists.
* Add search & filtering.
* Add unit tests.
* Deploy to Vercel.

---

## 📜 License

MIT License

---