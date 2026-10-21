# 15 - 100 Practice Questions Series

A comprehensive hands-on question bank covering basic queries, array operations, nested subdocuments, and advanced query operators.

---

## 📚 Practice Tiers & Structure

The 100 questions are split across three difficulty tiers:

| Tier | Script File | Target Dataset | Key Skills Tested |
| :---: | :--- | :--- | :--- |
| **Normal** | [`normal-practice.mongodb.js`](./normal-practice.mongodb.js) | Users (demographics, contact info) | Basic filtering, `$gt` / `$lt`, `$regex`, field existence (`$exists`), sorting & pagination |
| **Intermediate** | [`intermediate-practice.mongodb.js`](./intermediate-practice.mongodb.js) | Products catalog & inventory | Logical operators (`$and`, `$or`, `$nor`), numeric filters, stock & discount queries, array `$in` |
| **Advanced** | [`advanced-practice.mongodb.js`](./advanced-practice.mongodb.js) | Products with nested customer reviews | Nested object matching, array queries (`$elemMatch`), `$expr` multi-field comparisons, deep projection |

---

## 🎯 Common Query Patterns Tested

### 1. Regex & Pattern Matching (Normal Tier)
```javascript
// Find users whose name starts with "R"
db.users.find({ name: { $regex: '^R', $options: 'i' } });

// Find users with a Gmail address
db.users.find({ email: { $regex: '@gmail\\.com$' } });
```

### 2. Multi-Condition Logical Filtering (Intermediate Tier)
```javascript
// Find in-stock electronics with price below 50,000
db.products.find({
  $and: [
    { category: "electronics" },
    { stock: { $gt: 0 } },
    { price: { $lt: 50000 } }
  ]
});
```

### 3. Nested Array Queries with `$elemMatch` (Advanced Tier)
When querying an array of subdocuments, `$elemMatch` guarantees conditions match the **same** subdocument:
```javascript
// Find products reviewed by "Rahul" with a 5-star rating
db.products.find({
  reviews: {
    $elemMatch: { user: "Rahul", rating: 5 }
  }
});
```

---

## 💻 How to Use This Question Bank

1. Open any of the three practice playground files in VS Code.
2. Select or create the database connection in the MongoDB extension (`mongodb://localhost:27017`).
3. Uncomment the question block you wish to solve or test.
4. Click **Play (▶)** or press `Ctrl + Alt + S` to execute the query and review results.
