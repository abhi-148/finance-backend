# 🏆 Assignment Project - Zorvyn Finance Dashboard Backend

## 💰 Finance Dashboard Backend API

## 📌 Overview

This project is a backend system for a Finance Dashboard built using Node.js, Express, and MongoDB.
It allows users to manage financial records, apply filters, and view summarized financial data with role-based access control (RBAC).

---

## 🚀 Features

### 👤 User Management

* Create users with roles:

  * Admin
  * Analyst
  * Viewer
* User status management (active/inactive)

---

### 💳 Financial Records

* Create, Read, Update, Delete (CRUD) operations
* Fields:

  * amount
  * type (income/expense)
  * category
  * notes
  * date

---

### 📊 Dashboard Summary

* Total Income
* Total Expense
* Net Balance
* Category-wise summary

---

### 🔐 Role-Based Access Control (RBAC)

* **Admin** → Full access (CRUD operations)
* **Analyst** → Read + Summary access
* **Viewer** → Limited read-only access

---

### ⚡ Enhancements (Bonus)

* Pagination → `?page=1&limit=5`
* Filtering → `?type=income&category=Salary`
* Sorting → Latest records first
* Clean API response format
* Proper error handling & validation

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## 📡 API Endpoints

### 👤 Users

* `POST /api/users` → Create user
* `GET /api/users` → Get all users

---

### 💳 Records

* `POST /api/records` → Create record (**Admin only**)
* `GET /api/records` → Get records (pagination + filters)
* `PUT /api/records/:id` → Update record (**Admin only**)
* `DELETE /api/records/:id` → Delete record (**Admin only**)

---

### 📊 Summary

* `GET /api/records/summary` → Financial summary (**Admin & Analyst**)

---

## 🔑 Authentication (Assumption)

* User ID is passed in request headers:

  ```
  userid: <user_id>
  ```
* Middleware validates user existence and role-based permissions

---

## ⚙️ Setup Instructions

1. Clone the repository:

   ```
   git clone https://github.com/abhi-148/finance-backend.git
   ```

2. Navigate to project folder:

   ```
   cd finance-backend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create `.env` file:

   ```
   MONGO_URI=mongodb://127.0.0.1:27017/financeDB
   PORT=5000
   ```

5. Run the server:

   ```
   npm run dev
   ```

---

## 🧪 Testing

* Use Postman for API testing
* Add `userid` in headers for protected routes
* Test RBAC using Admin, Analyst, and Viewer roles

---

## 📈 Future Improvements

* JWT-based authentication system
* Frontend integration (React Dashboard UI)
* Data visualization (charts/graphs)
* Export reports (PDF/CSV)

---

## 👨‍💻 Author

**Abhishek Kumar**
MERN Stack Developer
GitHub: https://github.com/abhi-148
