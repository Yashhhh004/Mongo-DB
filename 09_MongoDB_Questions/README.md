# 09 - MongoDB Hands-On Practice Questions (Levels 1 to 7)

A step-by-step progressive exercise set to build confidence in database operations, CRUD queries, and relational data modeling.

---

## 🎯 Practice Levels Overview

The exercises are implemented in [`question.mongodb.js`](./question.mongodb.js) across 7 progressive stages:

| Level | Topic | Key Concepts Practiced |
| :---: | :--- | :--- |
| **Level 1** | **Database & Collection Setup** | `use('shopApp')`, `show dbs`, `db.createCollection()` |
| **Level 2** | **User Data Ingestion** | `insertOne()`, `insertMany()`, basic `find({ city: "Surat" })` |
| **Level 3** | **E-Commerce Catalog** | Product schema, multi-insert, `find()`, `countDocuments()` |
| **Level 4** | **Document Updates** | `$set` (updating city/price), `$inc` (increasing stock by 2) |
| **Level 5** | **Document Deletion** | `deleteOne({ name: ... })`, `deleteMany({ age: { $lt: 20 } })` |
| **Level 6** | **Advanced Queries** | `$gt`, `$lt` comparisons, filtering by category and price |
| **Level 7** | **Data Modeling & References** | Instagram clone: Linking `posts` to `users` via `author: ObjectId` |

---

## 🚀 Key Learning Highlights

### 1. Document References (Level 7)
In MongoDB, you can link related documents across collections using the `ObjectId` of the parent document:

```javascript
// 1. Insert User
const user = db.users.insertOne({ name: "Yash", mail: "yash@mail.com" });

// 2. Insert Post with Author Reference
db.posts.insertOne({
  title: "My First Post",
  caption: "Learning MongoDB references!",
  author: user.insertedId // Stores ObjectId referencing users collection
});

// 3. Find all posts by this author
db.posts.find({ author: user.insertedId });
```

### 2. Updating with Operators (Level 4)
- **`$set`**: Modifies existing fields or adds new fields if they do not exist.
- **`$inc`**: Increments numeric values atomically without race conditions:
  ```javascript
  db.products.updateMany(
    { category: "Electronic Device" },
    { $inc: { stock: 2 } }
  );
  ```

---

## 💻 How to Run the Exercises

1. Open [`question.mongodb.js`](./question.mongodb.js) in VS Code.
2. Ensure MongoDB local server is running on `mongodb://localhost:27017`.
3. Uncomment the level you want to test and click **Play (▶)** or press `Ctrl + Alt + S`.
4. Inspect the output in the split editor panel.
