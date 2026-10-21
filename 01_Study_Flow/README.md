# 01 - Study Flow & Learning Roadmap

Welcome to the **MongoDB Series**! Before diving into database internals and CRUD operations, it is critical to build a strong foundational mental model of how modern web applications function and how MongoDB fits into the full-stack ecosystem.

---

## 📌 Prerequisites

To make the most of this MongoDB series, you should have a solid grasp of modern JavaScript (ES6+):

| JavaScript Topic | Key Concepts to Know |
| :--- | :--- |
| **Language Fundamentals** | Variables (`let`, `const`), Data Types, Conditionals, Loops (`for`, `for...of`, `forEach`) |
| **Data Structures** | Strings, Arrays (methods like `.map()`, `.filter()`, `.reduce()`), Objects (keys, values, nested objects) |
| **Functions** | Arrow functions, Callbacks, Higher-order functions, Closures, Default parameters |
| **Modern ES6+ Syntax** | Destructuring (`const { name, age } = user`), Spread/Rest operator (`...`), Template literals |
| **Asynchronous JavaScript** | Event Loop, Callbacks, Promises (`.then()`, `.catch()`), `async` / `await` |
| **Modules System** | CommonJS (`require` / `module.exports`) vs ES Modules (`import` / `export`) |
| **APIs & Data Formats** | HTTP Methods (GET, POST, PUT, DELETE), JSON serialization & parsing (`JSON.stringify`, `JSON.parse`) |

---

## 🗺️ Architectural Study Flow

A complete full-stack web application follows this layered execution pipeline:

```
[ Frontend (UI / Client) ]
           │
           │  HTTP Requests (JSON)
           ▼
[ API / Routing Layer (Express.js) ]
           │
           │  Request Processing & Middleware
           ▼
[ Business Logic Layer (Node.js Controller) ]
           │
           │  Queries / Mutations (Mongoose ODM / Driver)
           ▼
[ Database Layer (MongoDB) ]
```

### Breakdown of the Pipeline:

1. **Frontend (Client)**:
   - Built with React, Vue, HTML/CSS/JS, or mobile apps.
   - Responsible for presentation, handling user input, and sending HTTP requests (Fetch/Axios).

2. **Backend Web Server (Node.js + Express.js)**:
   - Listens for incoming HTTP requests on defined routes (e.g., `POST /create-user`).
   - Parses incoming payload (`express.json()`).
   - Executes validation, authentication, and core business rules.

3. **Database Layer (MongoDB)**:
   - Stores documents in collections using BSON format.
   - Handles persistence, querying, indexing, and data integrity.
   - Communicates with Node.js via the native MongoDB Node Driver or Mongoose ODM.

---

## 🎯 Series Progression Overview

- **01. Study Flow**: Foundations & Prerequisites *(You are here)*
- **02. Full Stack Architecture**: Client, Server, and Database communication
- **03. Backend Crash Course**: Express.js server, REST APIs & Mongoose integration
- **04. MongoDB Introduction**: NoSQL, DBMS, SQL vs NoSQL, JSON vs BSON
- **05. MongoDB Setup**: Installing MongoDB Server, Compass & mongosh CLI
- **06. MongoDB Shell Commands**: Database, Collection & Document CRUD operations
- **07. MongoDB in VS Code**: Extension setup & `.mongodb.js` Playgrounds
- **08. MongoDB _id & ObjectId**: 12-byte binary anatomy & uniqueness
- **09. MongoDB Questions**: 7-level progressive hands-on query challenges
- **10. Projection in MongoDB**: Field inclusion (`1`) and exclusion (`0`) rules
- **11. Ordered vs Unordered**: Error handling in batch insertions
- **12. Import & Export**: Working with `mongoimport` and `mongoexport` (JSON/CSV)
- **13. MongoDB Operators**: Comparison, Logical, Element, Evaluation & Array operators
- **14. Cursor in MongoDB**: Batching, `.next()`, `.hasNext()`, and pagination
- **15. Practice 100 Questions**: Normal, Intermediate, and Advanced challenges
