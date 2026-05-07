# TindahanPro

TindahanPro is a full-stack web-based Sari-Sari Store Management System designed to help small business owners manage inventory, sales transactions, profit tracking, supplier information, and customer credit (“utang”) efficiently.

The system focuses on improving daily store operations through digital record-keeping, automated financial computation, inventory monitoring, and business analytics.

The frontend is built using TypeScript and Vite, while the backend is powered by NestJS, TypeORM, and MySQL.

---

# Core Features

The system is designed to help manage:

* product inventory and stock monitoring
* sales transactions and profit computation
* low stock alerts
* supplier management
* customer credit (“utang”) tracking
* dashboard analytics and charts
* reports and sales summaries
* inventory tracking
* financial monitoring

---

# Tech Stack

## Frontend

* TypeScript
* Vite
* Chart.js
* Vanilla Web UI

## Backend

* NestJS
* TypeORM
* MySQL
* REST API

---

# Project Structure

```txt
TindahanPro/
│
├── frontend/
│   └── src/
│       ├── services/
│       ├── views/
│       └── styles/
│
├── backend/
│   └── src/
│       ├── products/
│       ├── sales/
│       ├── suppliers/
│       ├── credits/
│       └── reports/
│
└── README.md
```

---

# Prerequisites

Before running the project, install the following:

* Node.js 18 or later
* npm
* MySQL Server

---

# Database Setup

The backend is configured to connect to a MySQL database.

Example database configuration:

```ts
host: 'localhost'
port: 3306
username: 'root'
password: ''
database: 'tindahanpro_db'
```

Create the database first in MySQL:

```sql
CREATE DATABASE tindahanpro_db;
```

Then make sure the database credentials match your local MySQL configuration.

---

# Step-By-Step Installation And Setup

Follow these steps from the main project folder.

---

## 1. Open the project folder

```bash
cd TindahanPro
```

---

## 2. Create the MySQL database

Log in to MySQL, then run:

```sql
CREATE DATABASE tindahanpro_db;
```

---

## 3. Install backend dependencies

```bash
cd backend
npm install
```

---

## 4. Start the backend server

```bash
npm run start:dev
```

Backend URL:

```txt
http://localhost:3000
```

---

## 5. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

---

## 6. Start the frontend

```bash
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

# Current System Features

## 1. Dashboard

The dashboard provides an overview of store performance and inventory status.

Features include:

* total sales tracking
* profit monitoring
* transaction counting
* low stock item alerts
* sales trend chart
* sales distribution chart
* daily, weekly, and monthly filters

---

## 2. Product Management

The product module allows store owners to manage inventory efficiently.

Features include:

* add products
* edit products
* delete products
* manage stock quantity
* set selling price
* set buying price
* low stock monitoring

---

## 3. Sales Recording

The sales module records transactions and updates inventory automatically.

Features include:

* record sales
* calculate totals automatically
* calculate profit automatically
* reduce stock after sales
* save transaction history
* filter sales by date

---

## 4. Supplier Management

The supplier module manages supplier information for restocking purposes.

Features include:

* add supplier
* delete supplier
* store supplier contact information
* manage supplier records

---

## 5. Credit (“Utang”) Tracking

The credit module tracks customer debts and payment records.

Features include:

* add customer credit
* add description
* record due dates
* track payment information
* delete credit records
* monitor unpaid balances

---

## 6. Reports & Analytics

The reports module provides business insights and financial summaries.

Features include:

* sales reports
* profit reports
* transaction analytics
* sales charts
* date-based filtering
* inventory monitoring

---

# Current Backend API Routes

## Products

```txt
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```

## Sales

```txt
GET /sales
POST /sales
DELETE /sales/:id
```

## Suppliers

```txt
GET /suppliers
POST /suppliers
DELETE /suppliers/:id
```

## Credits

```txt
GET /credits
POST /credits
DELETE /credits/:id
```

## Reports

```txt
GET /reports
```

---

# Feature Overview

## Inventory Alert System

The system automatically detects low-stock items and displays them on the dashboard.

This helps store owners avoid inventory shortages.

---

## Profit Calculator

The system computes profits automatically based on product cost and selling price.

This allows easier financial monitoring and business analysis.

---

## Dashboard Analytics

Charts and summaries help visualize sales performance and inventory activity.

The dashboard includes:

* sales trend graph
* product sales distribution chart
* sales and profit summaries

---

## Credit Tracking System

The credit system reflects real sari-sari store practices where customers can buy products on credit (“utang”).

The system helps monitor unpaid balances and customer records.

---

# Non-Functional Requirements

* responsive interface
* user-friendly design
* fast transaction recording
* real-time inventory updates
* organized dashboard layout
* persistent database storage

---

# Suggested Development Flow

The recommended development order for the system is:

1. Products
2. Sales
3. Dashboard
4. Suppliers
5. Credits
6. Reports
7. Analytics Improvements

---

# Future Improvements

Possible future enhancements include:

* user authentication and login
* printable receipts
* export reports to PDF or Excel
* profile picture upload
* notifications and alerts
* customer management
* barcode scanning
* dark mode
* sales receipt printing

---

# Testing

## Frontend

```bash
cd frontend
npm test
```

## Backend

```bash
cd backend
npm test
```

---

# Notes

* The frontend currently connects to:

```txt
http://localhost:3000
```

* Chart.js is used for dashboard analytics.
* The backend uses TypeORM with MySQL.
* CORS is enabled in the NestJS backend.

---

# Academic Value

This project demonstrates:

* CRUD operations
* inventory management
* financial computation
* sales transaction processing
* profit analysis
* dashboard analytics
* TypeScript frontend development
* NestJS backend development
* MySQL database integration

The system is designed around real-world sari-sari store operations and provides a practical business management solution for small retail stores.
