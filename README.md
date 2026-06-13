<div align="center">

# 🍕 Pizzara — Full-Stack Pizza Delivery Application

**OIBSIP Web Development & Designing | Level 3 – Final Task**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://github.com/ChetanSenta/OIBSIP_Web_Development_Designing_Pizzara)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Test_Mode-02042B?style=for-the-badge&logo=razorpay&logoColor=white)](https://razorpay.com/)

A production-grade pizza ordering platform featuring a **photo-realistic custom pizza builder**, JWT-secured authentication, Razorpay payment processing, and a full administrative control panel with automated low-stock email alerts.

</div>

---

## 📌 Project Objective

Build an end-to-end web application that lets users register securely, customize a pizza with real-time visual feedback, complete payments through a test gateway, and track their order through every stage of delivery. On the admin side, the platform automates inventory deduction, order lifecycle management, and low-stock email notifications.

---

## ✨ Feature Highlights

### 🧑‍💻 Customer Experience
| Feature | Description |
|---|---|
| 🔐 Secure Auth | JWT-based login/register with bcrypt hashing and email verification gating |
| 🍕 Pizza Builder | Step-by-step customizer — base, sauce, cheese, veggies, and meat toppings |
| 🖼️ Live Preview Canvas | Layered transparent PNG overlays with fade-in animations for a food-photography feel |
| 💳 Razorpay Payments | End-to-end order creation, payment, and signature verification (test mode) |
| 📦 Order Tracking | Real-time status updates: Placed → Received → Kitchen → Out for Delivery → Delivered |

### 🛠️ Admin Panel
| Feature | Description |
|---|---|
| 📊 Dashboard | Revenue counters, total orders, and at-a-glance business metrics |
| 📋 Inventory Control | Manage bases, sauces, cheeses, vegetables, and meat stock quantities |
| 🔄 Order Management | Filterable order list with inline status selectors |
| 📧 Email Alerts | Automatic restock notifications when any ingredient drops below the safety threshold |

---

## 🛠️ Tech Stack

### Frontend
- **Vite + React 19** — Fast, modular UI with hot module replacement
- **React Router v7** — Declarative client-side routing with `ProtectedRoute` and `AdminRoute` guards
- **Axios** — Promise-based HTTP client for all API interactions
- **React Toastify** — Non-blocking toast notification system
- **Vanilla CSS** — Custom responsive styling with glassmorphism aesthetics and keyframe animations

### Backend
- **Node.js + Express.js** — RESTful API server
- **MongoDB + Mongoose ODM** — Schema design for `User`, `Order`, and `Inventory` collections
- **JWT + bcryptjs** — Token-based session management and secure password hashing
- **Nodemailer** — SMTP transactional email for verification and admin stock alerts

### Payment Gateway
- **Razorpay SDK (Test Mode)** — Order creation, payment simulation, and HMAC signature verification

---

## 🗂️ Project Structure

```
OIBSIP_Web_Development_Designing_Pizzara/
├── frontend/               # Vite + React 19 client
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page views
│   │   ├── context/        # Auth & cart context providers
│   │   └── assets/         # Static assets
│   └── package.json
├── backend/                # Node.js + Express API server
│   ├── models/             # Mongoose schemas (User, Order, Inventory)
│   ├── routes/             # Auth, order, inventory, admin routes
│   ├── middleware/         # JWT auth & role-check middleware
│   ├── utils/              # Nodemailer & Razorpay helpers
│   ├── seed.js             # DB seed script
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)
- Razorpay account (test mode keys)
- SMTP credentials (e.g. [Ethereal Email](https://ethereal.email/) for local testing)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ChetanSenta/OIBSIP_Web_Development_Designing_Pizzara.git
cd OIBSIP_Web_Development_Designing_Pizzara
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pizza-delivery
JWT_SECRET=your-secret-jwt-key

# Razorpay (test mode)
RAZORPAY_KEY_ID=rzp_test_your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# SMTP (Ethereal for local dev)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=your_ethereal_user
EMAIL_PASS=your_ethereal_password

ADMIN_EMAIL=admin@pizzara.com
CLIENT_URL=http://localhost:5173
STOCK_THRESHOLD=20
```

Seed the database with default inventory and an admin account:

```bash
node seed.js
```

Start the development server:

```bash
npm run dev
```

> API runs at **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> App runs at **http://localhost:5173**

---

### 🔑 Default Seed Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@pizzara.com` | `admin@123` |

> ⚠️ Change these credentials before deploying to production.

---

## 📸 Application Walkthrough

### Custom Pizza Builder
The builder walks users through a step-by-step ingredient selection flow. Each choice instantly updates a layered preview canvas — transparent PNG overlays are composited in real time to show crust thickness, sauce color, melted cheese, and stacked toppings with fade-in animations.

### Checkout & Payments
On checkout, the backend creates a Razorpay order and returns credentials to the frontend. After the user completes payment, the backend verifies the HMAC signature, persists the order, and atomically decrements ingredient stock. If any item falls below `STOCK_THRESHOLD`, an alert email is fired immediately.

### Admin Dashboard
Admins see live order counts, total revenue, and per-ingredient stock levels in one view. Order statuses can be updated inline; inventory quantities can be edited directly with changes reflected immediately.

---

## 📚 Key Engineering Concepts Practiced

- Full-stack MERN application architecture
- REST API design with role-based access control
- JWT authentication flow with email verification
- NoSQL schema design and data seeding
- Payment gateway integration and HMAC signature verification
- Automated background processes (stock threshold monitoring)
- Component-level state management in React 19
- Responsive design with CSS custom properties and animations

---

## 🙏 Acknowledgements

Developed as **Level 3 – Final Task** for the **Web Development & Designing** domain internship at **[Oasis Infobyte (OIBSIP)](https://oasisinfobyte.com/)**.

---

<div align="center">

Made with by [Chetan Senta](https://github.com/ChetanSenta)

</div>
