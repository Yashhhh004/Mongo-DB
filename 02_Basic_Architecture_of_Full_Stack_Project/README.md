# 02 - Basic Architecture of a Full Stack Project

A Full-Stack Web Application combines three core tiers: **Frontend (Client)**, **Backend (Server & Logic)**, and **Database (Data Persistence)**.

---

## 🏗️ The Three-Tier Architecture

```
┌─────────────────────────────────┐
│     Frontend (Browser / App)    │  HTML, CSS, JavaScript, React
└───────────────┬─────────────────┘
                │  HTTP / HTTPS Request (JSON)
                ▼
┌─────────────────────────────────┐
│     Backend Server (Node.js)    │  Express.js, Middleware, Auth
└───────────────┬─────────────────┘
                │  Mongoose ODM / MongoDB Driver
                ▼
┌─────────────────────────────────┐
│        Database (MongoDB)       │  BSON Documents, Collections
└─────────────────────────────────┘
```

---

## 1. 🖥️ The Frontend (Client-Side)

- **What it is**: The user interface running in the browser or mobile app.
- **Key Responsibilities**:
  - Renders UI components (forms, buttons, cards, navigation).
  - Handles user interactions (clicks, keyboard inputs, validations).
  - Sends asynchronous HTTP requests (`fetch()` / Axios) to backend APIs.
- **Technologies**: HTML5, CSS3, JavaScript (ES6+), React, Vue.

---

## 2. ⚙️ The Backend Server (Application Layer)

- **What it is**: The server-side environment (Node.js + Express.js) that acts as the secure intermediary between users and the database.
- **Key Responsibilities**:
  - **Routing**: Exposes RESTful endpoints (`POST /create-user`, `GET /users`).
  - **Authentication & Security**: Validates JWT tokens, hashes passwords (bcrypt).
  - **Business Logic**: Enforces application rules and data validation.
  - **Database Queries**: Communicates with MongoDB using Mongoose or native driver.
- **Technologies**: Node.js, Express.js.

---

## 3. 🗄️ The Database (Persistence Layer)

- **What it is**: An organized data store that keeps information permanently on disk.
- **Key Responsibilities**:
  - **Persistence**: Retains data across server restarts and deployments.
  - **Fast Querying**: Provides indexed retrieval, filtering, and aggregation.
  - **Integrity**: Ensures atomic document updates and schema validation.
- **Types**:
  - **SQL (Relational)**: Structured tables, rows, columns, joins (e.g., PostgreSQL, MySQL).
  - **NoSQL (Document-based)**: Flexible, JSON-like BSON documents (e.g., **MongoDB**).

---

## 🔄 4. End-to-End Request Lifecycle (User Signup)

```
[Browser Form] ──► POST /create-user ──► [Express Route] ──► Mongoose Model ──► [MongoDB Insert]
      ▲                                                                                 │
      └────────── 201 Created JSON Response ◄───────────────────────────────────────────┘
```

1. **User Action**: The user fills out a registration form and clicks "Submit".
2. **HTTP Request**: Frontend sends a `POST` request with a JSON body (`{ name, age }`).
3. **Server Validation**: Express.js parses JSON via `express.json()`, then validates the data.
4. **Database Write**: The server calls `User.create({ name, age })` to insert into MongoDB.
5. **HTTP Response**: Express returns `201 Created` with the newly created document.
6. **UI Update**: Frontend displays a success notification to the user.
