# 🚀 Real-Time Expert Session Booking System

A full-stack real-time booking system built using:

- Frontend: React (Vite) + Tailwind CSS + Socket.io Client
- Backend: Node.js + Express.js + MongoDB + Socket.io
- Database: MongoDB (Mongoose ODM)

---

## 📌 Project Overview

This application allows users to:

- View a list of experts
- Search and filter experts
- View expert details and available time slots
- Book expert sessions
- Prevent double booking (race-condition safe)
- See real-time slot updates when another user books
- View bookings by email with status tracking

---

## ✨ Features

### 1️⃣ Expert Listing
- Pagination
- Search by name
- Filter by category
- Responsive UI with Tailwind

### 2️⃣ Expert Detail
- Slots grouped by date
- Real-time slot locking
- Booked slots automatically disabled

### 3️⃣ Booking System
- Proper validation
- Double booking prevention
- Meaningful error responses
- Status tracking (Pending / Confirmed / Completed)

### 4️⃣ My Bookings
- Fetch bookings by email
- Status color indicators

---

## 🔥 Real-Time Implementation

Socket.io is used for real-time slot updates.

### Flow:

1. User A books a slot
2. Backend saves booking
3. Backend updates slot (`isBooked = true`)
4. Backend emits:
   ```
   slotBooked
   ```
5. All connected clients instantly disable that slot

This ensures a smooth real-time user experience.

---

## 🛡 Double Booking Prevention

Implemented using:

### ✅ MongoDB Compound Unique Index

```
{ expert: 1, date: 1, time: 1 }
```

If duplicate booking occurs:
- MongoDB throws error `11000`
- Backend returns `409 Conflict`

This makes the system race-condition safe.

---

## 📂 Project Structure

### Backend

```
backend/
│
├── config/
│     └── db.js
│
├── models/
│     ├── Expert.js
│     └── Booking.js
│
├── controllers/
│     ├── expertController.js
│     └── bookingController.js
│
├── routes/
│     ├── expertRoutes.js
│     └── bookingRoutes.js
│
├── server.js
└── .env
```

### Frontend

```
frontend/
│
├── src/
│     ├── api/
│     ├── pages/
│     ├── components/
│     ├── App.jsx
│     └── main.jsx
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone Repository

```bash
git clone <repo_link>
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Endpoints

### GET /api/experts
Supports:
- Pagination
- Search
- Filter

---

### GET /api/experts/:id
Get expert details + slots

---

### POST /api/bookings
Create booking

---

### GET /api/bookings?email=
Fetch bookings by email

---

### PATCH /api/bookings/:id/status
Update booking status

---

## 🌐 Deployment (Optional)

Recommended:

- Backend → Render
- Frontend → Vercel
- MongoDB → Atlas

---

## 🎯 Interview Talking Points

- Implemented real-time updates using Socket.io
- Prevented race conditions using MongoDB compound unique index
- Designed scalable REST API structure
- Clean folder structure (MVC pattern)
- Proper validation and error handling
- Environment variables for secure configuration

---

## 👨‍💻 Author

Developed by Abhijeet Soni  
MERN Stack Developer

---

## 📜 License

This project is built for internship assignment purposes.