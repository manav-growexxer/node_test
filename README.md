# Node Test Project

## 📌 Project Overview

This is a **Node.js** application that implements a **REST API** using **Express.js** and **MongoDB**. The project follows industry-standard best practices, including **JWT authentication**, **product & order management**, **email notifications**, and **secure data handling**.

## 🚀 Features

- **User Authentication** (JWT-based)
- **Product Management** (CRUD operations, filtering, pagination, image upload)
- **Order Management** (placing orders, updating status, retrieving user orders)
- **Email Notifications** (Nodemailer for order confirmation)
- **Security Enhancements** (Helmet, xss-clean, rate-limiting, mongo sanitization)
- **Linting & Formatting** (ESLint, Prettier, Airbnb style guide)

## 🛠️ Tech Stack

- **Node.js** (Backend runtime)
- **Express.js** (Web framework)
- **MongoDB** + **Mongoose** (Database & ODM)
- **JWT (JSON Web Tokens)** (Authentication)
- **Multer + Sharp** (Image Upload & Processing)
- **Nodemailer** (Email Services)
- **Stripe** (Payment Gateway Integration - Future Scope)
- **Parcel.js** (Bundling frontend assets)

## 📂 Project Structure

```
node_test/
│── controllers/        # Business logic for routes
│── models/            # Mongoose database schemas
│── routes/            # API routes for different modules
│── middlewares/       # Middleware for authentication & validation
│── utils/             # Utility functions (email, error handling, etc.)
│── public/            # Frontend assets (if any)
│── app.js             # Express app configuration
│── server.js          # Server entry point
│── config.env         # Environment variables
│── .eslintrc.json     # ESLint configuration
│── .gitignore         # Files to ignore in Git
│── package.json       # Project dependencies & scripts
│── README.md          # Project documentation
```

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/node_test.git
cd node_test
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file and add the following:

```
NODE_ENV=development
PORT=3003
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
MAILTRAP_USER=your_mailtrap_username
MAILTRAP_PASS=your_mailtrap_password
```

### **4️⃣ Run the Server**

#### **Development Mode**

```sh
npm start
```

#### **Production Mode**

```sh
npm run start:prod
```

## 🔥 API Endpoints

### **User Routes**

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/api/users/register` | Register a new user        |
| POST   | `/api/users/login`    | Authenticate user          |
| GET    | `/api/users/me`       | Get logged-in user details |

### **Product Routes**

| Method | Endpoint            | Description                                    |
| ------ | ------------------- | ---------------------------------------------- |
| POST   | `/api/products/`    | Create a new product                           |
| GET    | `/api/products/`    | Get all products (with filtering & pagination) |
| GET    | `/api/products/:id` | Get product details by ID                      |
| PATCH  | `/api/products/:id` | Update a product                               |
| DELETE | `/api/products/:id` | Delete a product                               |

### **Order Routes**

| Method | Endpoint                   | Description             |
| ------ | -------------------------- | ----------------------- |
| POST   | `/api/orders/`             | Place an order          |
| GET    | `/api/orders/:id`          | Get order details by ID |
| GET    | `/api/orders/user/:userId` | Get orders by user ID   |
| PATCH  | `/api/orders/:id`          | Update order status     |

## ✅ Code Quality & Linting

To ensure clean and maintainable code, run:

```sh
npm run lint
```

## 📬 Contributions

Contributions are welcome! Feel free to fork this repository, create a feature branch, and submit a pull request.

## 📜 License

This project is **open-source** under the **ISC License**.

---

### 🔗 **Connect with Me**

📧 Email: [your-email@example.com](mailto:your-email@example.com)
🔗 GitHub: [your-github-profile](https://github.com/your-username)
