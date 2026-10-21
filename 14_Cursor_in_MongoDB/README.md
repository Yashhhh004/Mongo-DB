# 14 - Cursors in MongoDB

Learn how MongoDB cursors work under the hood, how data is streamed in batches, and how to implement pagination.

---

## 1. What is a Cursor?

When you execute a `find()` query, MongoDB does **not** fetch all documents into memory at once. Instead, it returns a pointer called a **Cursor**.

- A Cursor points to the result set on the server and streams documents to the client **batch by batch** (default batch: 101 documents or up to 16MB).
- This prevents the database and application server from exhausting memory when querying massive datasets.

---

## 2. Iterating with Cursor Methods

In the MongoDB Shell or script ([`cursor.mongodb.js`](./cursor.mongodb.js)):

```javascript
const cursor = db.data.find();

// 1. Check if another document is available
console.log(cursor.hasNext()); // true or false

// 2. Fetch the next document
console.log(cursor.next());

// 3. Loop through entire cursor
while (cursor.hasNext()) {
  console.log(cursor.next());
}
```

---

## 3. Cursor Modifiers

You can chain modifier methods directly onto the cursor before execution:

- **`.sort({ field: 1 | -1 })`**: Orders results ascending (`1`) or descending (`-1`).
- **`.limit(n)`**: Restricts the maximum number of documents returned.
- **`.skip(n)`**: Bypasses the first `n` matching documents.

```javascript
// Get top 5 documents with highest value, skipping first 2
db.data.find().sort({ value: -1 }).skip(2).limit(5);
```

---

## 4. Implementing Pagination with Cursors

In REST APIs, cursors enable clean, predictable page-based pagination:

```javascript
const page = 2;       // Target page number
const limit = 10;     // Documents per page
const skip = (page - 1) * limit; // (2 - 1) * 10 = skip 10

// Fetch page 2 (documents 11 to 20)
const pageData = db.data.find().sort({ value: 1 }).skip(skip).limit(limit);
```

### Advantages of Cursors:
- **Low Memory Overhead**: Only active batch resides in memory.
- **Non-blocking Streaming**: Client receives initial results almost immediately.
- **Composable**: Easily chains sorting, limiting, and skipping.
