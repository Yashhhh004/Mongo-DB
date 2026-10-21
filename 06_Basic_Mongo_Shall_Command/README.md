# 06 - Basic MongoDB Shell (`mongosh`) Commands

Essential cheat sheet for commands categorized by **Database**, **Collection**, and **Document** CRUD operations.

---

## 1. Connecting to the Shell

```bash
mongosh                                      # Connect to default local instance
mongosh "mongodb://localhost:27017/shopApp"  # Connect directly to a specific database
```

---

## 2. Database & Collection Operations

### Database Commands:
- `show dbs` - Lists all databases on the server.
- `use <dbName>` - Switches to a database (created on first write).
- `db` - Displays the currently active database name.
- `db.dropDatabase()` - Drops the currently selected database.

### Collection Commands:
- `show collections` - Lists all collections in the active database.
- `db.createCollection("users")` - Explicitly creates a collection.
- `db.users.drop()` - Deletes collection and indexes.
- `db.users.countDocuments()` - Returns total count of documents.

---

## 3. Document CRUD Operations

### Create (Insert)
```javascript
db.users.insertOne({ name: "Yash", age: 21, city: "Mumbai" });
db.users.insertMany([
  { name: "Kashish", age: 20, city: "Delhi" },
  { name: "Manan", age: 23, city: "Ahmedabad" }
]);
```

### Read (Query & Filter)
```javascript
db.users.find();                                    // Find all
db.users.find({ city: "Mumbai" });                  // Filter by field
db.users.findOne({ name: "Yash" });                 // Find one
db.users.find({}, { name: 1, age: 1, _id: 0 });     // Projection (1 = include, 0 = exclude)
db.users.find().sort({ age: -1 }).skip(2).limit(5); // Sort, skip & limit
```

### Update (Modify)
```javascript
// Update one with $set and $inc
db.users.updateOne({ name: "Yash" }, { $set: { city: "Pune" }, $inc: { age: 1 } });

// Update multiple
db.users.updateMany({ city: "Delhi" }, { $set: { state: "Delhi NCR" } });
```

### Delete (Remove)
```javascript
db.users.deleteOne({ name: "Kashish" });     // Delete one
db.users.deleteMany({ age: { $lt: 20 } });   // Delete matching documents
```

---

## 4. Query Operators Cheat Sheet

| Operator | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `$eq` / `$ne` | Comparison | Equal / Not equal to | `{ age: { $eq: 21 } }` |
| `$gt` / `$gte` | Comparison | Greater than / or equal | `{ age: { $gte: 18 } }` |
| `$lt` / `$lte` | Comparison | Less than / or equal | `{ age: { $lt: 60 } }` |
| `$in` / `$nin` | Comparison | Value in / not in array | `{ city: { $in: ["Mumbai", "Delhi"] } }` |
| `$or` | Logical | Joins clauses with OR | `{ $or: [{ city: "Mumbai" }, { age: { $gt: 20 } }] }` |
| `$set` / `$inc` | Update | Set field / Increment number | `{ $set: { active: true }, $inc: { age: 1 } }` |
