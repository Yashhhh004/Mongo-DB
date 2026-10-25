# 🍃 The Complete MongoDB Mastery Series

> A comprehensive, hands-on developer guide covering MongoDB from fundamental architecture to production-grade Express.js REST APIs, Mongoose integration, and database internals.

[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20v7+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js%20v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js%20v5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📚 Table of Contents & Roadmap

| # | Chapter / Module | Topics Covered | Link |
| :-: | :--- | :--- | :-: |
| **01** | **Study Flow & Prerequisites** | Modern JavaScript requirements, ES6+, async/await, mental model | [Explore](./01_Study_Flow/README.md) |
| **02** | **Full-Stack Architecture** | Three-tier architecture (Client, Server, Database), request-response lifecycle | [Explore](./02_Basic_Architecture_of_Full_Stack_Project/README.md) |
| **03** | **Backend Crash Course** | Express.js fundamentals, Node vs Express, Postman guide, Mongoose CRUD API | [Explore](./03_Backend_Crash_Course/README.md) |
| **04** | **MongoDB Introduction** | NoSQL, DBMS, SQL vs NoSQL, Deep dive into JSON vs BSON | [Explore](./04_MongoDB_Introduction/README.md) |
| **05** | **MongoDB Setup & Tools** | Installing Community Server (`mongod`), `mongosh` CLI, and MongoDB Compass | [Explore](./05_MongoDB_Setup/README.md) |
| **06** | **MongoDB Shell Commands** | Categorized `mongosh` commands: Database, Collection, and Document CRUD | [Explore](./06_Basic_Mongo_Shall_Command/README.md) |
| **07** | **VS Code Integration** | MongoDB extension setup, `.mongodb.js` Playgrounds, running scripts | [Explore](./07_MongoDB_Set_Up_In_VS_Code/README.md) |
| **08** | **MongoDB `_id` & `ObjectId`** | 12-byte binary anatomy, timestamp extraction, machine ID, uniqueness | [Explore](./08_MongoDB_Id/README.md) |
| **09** | **MongoDB Questions** | 7 progressive levels: setup, inserts, catalog, updates, deletes, references | [Explore](./09_MongoDB_Questions/README.md) |
| **10** | **Projection in MongoDB** | Field inclusion (`1`), exclusion (`0`), and rules for the `_id` field | [Explore](./10_Projection_In_MongoDB/README.md) |
| **11** | **Ordered vs Unordered** | Bulk operations (`insertMany`), batch error handling and parallelization | [Explore](./11_Ordered_vs_Unordered/README.md) |
| **12** | **Import & Export** | Using `mongoimport` & `mongoexport` with JSON arrays, NDJSON, and CSV files | [Explore](./12_Import_Export/README.md) |
| **13** | **MongoDB Operators** | Comparison, Logical, Element, Evaluation, Array, and Update operators | [Explore](./13_MongoDB_Operators/README.md) |
| **14** | **Cursor in MongoDB** | Streaming cursors, batching, `.next()`, `.hasNext()`, and pagination | [Explore](./14_Cursor_in_MongoDB/README.md) |
| **15** | **Practice 100 Questions** | 100 comprehensive practice questions: Normal, Intermediate, and Advanced | [Explore](./15_Practice_100_questions/README.md) |
| **16** | **Embedding & Referencing** | Denormalization vs Normalization, embedded document operations (`$push`, `$pull`) | [Explore](./16_Embeding_and_Referencing/README.md) |
| **17** | **Indexing in MongoDB** | B-Tree internals, single/compound/multikey/TTL indexes, covered queries, execution stats | [Explore](./17_Indexing_In_MongoDB/README.md) |
| **18** | **Aggregation in MongoDB** | Pipeline architecture, `$match`, `$group`, `$project`, `$sort`, `$lookup`, `$unwind` | [Explore](./18_Aggregation_In_MongoDB/README.md) |
| **19** | **Aggregation Practice** | 10 real-world aggregation challenges with complete step-by-step solutions | [Explore](./19_Aggregation_Practice/README.md) |
| **20** | **Schema Validation** | `$jsonSchema`, BSON types, validation actions (`error`/`warn`), and `collMod` | [Explore](./20_Schema_Validation_In_MongoDB/README.md) |
| **21** | **Advanced MongoDB Overview** | High-level roadmap: Transactions, Replication, Sharding, Tuning, Backup | [Explore](./21_Advance_MongoDB/README.md) |
| **22** | **Authentication & Authorization** | RBAC, Super Admin (`root`), DB users, built-in roles, and security config | [Explore](./22_Authentication_Authorization/README.md) |
| **23** | **Replication in MongoDB** | Replica Sets, Primary/Secondary/Arbiter, Oplog, automated failover, Read Preferences | [Explore](./23_Replication_In_MongoDB/README.md) |
| **24** | **Sharding in MongoDB** | Horizontal scaling, Shards, Config Servers, `mongos`, Range vs Hashed Sharding | [Explore](./24_Sharding_In_MongoDB/README.md) |
| **25** | **Transactions in MongoDB** | Multi-document ACID transactions, Client Sessions, commit/abort workflows | [Explore](./25_Transaction_In_MongoDB/README.md) |
| **26** | **Read & Write Concerns** | Write concerns (`w`, `j`, `wtimeout`), Read preferences, durability vs latency | [Explore](./26_Read_And_Write/README.md) |
| **27** | **Backup & Restore** | Logical (`mongodump`/`mongorestore`) vs Physical backups, archive and gzip flags | [Explore](./27_BackUp_And_Restore/README.md) |

---

## 🚀 Quick Start Guide

### 1. Verify MongoDB & Run the API Server
```bash
# Verify MongoDB connection
mongosh

# Start Express.js CRUD API Server
cd "03_Backend_Crash_Course/api"
npm install
npm run dev # Server runs on http://localhost:8000
```

### 2. Available API Endpoints (CRUD)
- `GET /` — API Health Check
- `POST /create-user` — Create user (`{"name": "Yash", "age": 21}`)
- `GET /get-all-users` — Fetch all user documents
- `GET /get-single-user/:id` — Fetch user by `_id`
- `PUT /update-user/:id` — Update user (`{"name": "Yash Lal", "age": 22}`)
- `DELETE /delete-user/:id` — Delete user by `_id`

### 3. Running VS Code MongoDB Playgrounds
1. Install the official **MongoDB for VS Code** extension.
2. Open any `.mongodb.js` file (e.g., [`07_MongoDB_Set_Up_In_VS_Code/crud.mongodb.js`](./07_MongoDB_Set_Up_In_VS_Code/crud.mongodb.js)).
3. Click the **Play (▶)** button or press `Ctrl + Alt + S` to execute and view results in real time.

---

## 📄 License
This project is licensed under the MIT License.
