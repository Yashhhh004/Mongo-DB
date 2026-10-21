# 11 - Ordered vs Unordered Operations in MongoDB

Learn how the `ordered` option controls error handling and execution flow during bulk operations like `insertMany()`.

---

## 1. What is the `ordered` Flag?

When inserting multiple documents using `insertMany()`, MongoDB accepts an options object:

```javascript
db.collection.insertMany([ doc1, doc2, doc3, ... ], { ordered: true | false });
```

The `ordered` boolean determines how MongoDB responds when an error (such as a duplicate key) occurs midway through the batch.

---

## 2. Ordered Inserts (Default: `{ ordered: true }`)

By default, `insertMany()` is **ordered** (`ordered: true`).

### Behavior:
1. Documents are inserted strictly in the array order.
2. If an error occurs on any document (e.g., duplicate `_id`), **MongoDB halts execution immediately**.
3. Any documents located **after** the failed document in the array are **NOT** inserted.

### Example:
```javascript
db.users.insertMany([
  { _id: 1, name: "Yash" },
  { _id: 2, name: "Manan" },
  { _id: 1, name: "Jenil" }, // ❌ Duplicate Key Error!
  { _id: 3, name: "Meet" }   // ⚠️ Skipped! Never inserted.
], { ordered: true });
```
*Result*: Only `_id: 1 (Yash)` and `_id: 2 (Manan)` are inserted. `_id: 3 (Meet)` is omitted because the operation aborted at index 2.

---

## 3. Unordered Inserts (`{ ordered: false }`)

When set to `false`, MongoDB attempts to insert **every** document in the array, regardless of errors.

### Behavior:
1. Documents are processed independently (and can be executed in parallel).
2. If an error occurs on a document, MongoDB reports the error but **continues inserting all remaining valid documents**.

### Example:
```javascript
db.users.insertMany([
  { _id: 1, name: "Yash" },
  { _id: 2, name: "Manan" },
  { _id: 1, name: "Jenil" }, // ❌ Fails (duplicate key)
  { _id: 3, name: "Meet" }   // ✅ Successfully inserted!
], { ordered: false });
```
*Result*: Documents with `_id: 1`, `_id: 2`, and `_id: 3` exist in the database. Only the conflicting duplicate is skipped.

---

## 4. Summary & Best Practices

| Feature | Ordered (`ordered: true`) | Unordered (`ordered: false`) |
| :--- | :--- | :--- |
| **Default** | Yes | No (must specify `{ ordered: false }`) |
| **On Error** | Stops immediately | Continues processing all documents |
| **Execution** | Sequential (one-by-one) | Can be parallelized for higher speed |
| **Best Used When** | Order matters (e.g., historical transactions) | Bulk importing independent logs or records |

Check the runnable script in [`orderedvsunordered.mongodb.js`](./orderedvsunordered.mongodb.js).
