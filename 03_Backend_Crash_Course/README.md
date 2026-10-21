# 03 - Backend Crash Course (Node.js, Express.js & Mongoose)

Learn to build RESTful APIs using **Express.js** and connect them to **MongoDB** using **Mongoose ODM**.

---

## 1. Why Express.js vs Native Node.js?

While Node.js includes a built-in `http` module, building APIs with it requires manual routing (`if / else`), manual stream parsing for JSON bodies (`req.on('data')`), and manual response headers.

**Express.js** provides:
- Clean routing methods (`app.get()`, `app.post()`, `app.put()`, `app.delete()`).
- Built-in JSON middleware (`app.use(express.json())`).
- Convenient response helpers (`res.status(200).json(...)`).

> 💡 *See [`server/node_vs_express.js`](./server/node_vs_express.js) for a side-by-side comparison.*

---

## 2. Quick Setup & Express Server

```bash
cd server
npm install express
npm install -D nodemon
npm run dev
```

Basic Express server structure ([`server/server.js`](./server/server.js)):

```javascript
import express from 'express';
const app = express();

app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => res.json({ message: "Server healthy!" }));

app.post('/create-user', (req, res) => {
  const { name, age } = req.body;
  res.status(201).json({ success: true, data: { name, age } });
});

app.listen(8000, () => console.log('Server running on port 8000'));
```

---

## 3. Testing with Postman

1. Open Postman and set method to `POST`.
2. Enter URL: `http://localhost:8000/create-user`.
3. Under **Body** ➔ select **raw** ➔ **JSON**:
   ```json
   { "name": "Yash", "age": 21 }
   ```
4. Click **Send** to verify the `201 Created` status code and JSON response.

---

## 4. Connecting to MongoDB with Mongoose

Mongoose is an **Object Data Modeling (ODM)** library providing schema validation and typed models:

```javascript
import mongoose from 'mongoose';

await mongoose.connect("mongodb://localhost:27017/db1");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
```

---

## 5. Full CRUD REST API Overview

Implemented in [`api/server.js`](./api/server.js):

| Action | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Create** | `POST` | `/create-user` | Inserts a new user (`User.create(req.body)`) |
| **Read All** | `GET` | `/get-all-users` | Fetches all users (`User.find()`) |
| **Read One** | `GET` | `/get-single-user/:id` | Fetches user by ID (`User.findById(id)`) |
| **Update** | `PUT` | `/update-user/:id` | Modifies user (`User.findByIdAndUpdate(id, ...)`) |
| **Delete** | `DELETE` | `/delete-user/:id` | Removes user (`User.findByIdAndDelete(id)`) |

### Running the Complete CRUD Server:
```bash
cd api
npm install
npm run dev
```
Server starts on `http://localhost:8000`.
