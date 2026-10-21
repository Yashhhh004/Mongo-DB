# 10 - Projection in MongoDB

Projection controls which fields MongoDB returns in query results, reducing network payload size and improving application performance.

---

## 1. What is Projection?

When querying a document, MongoDB returns all fields by default. **Projection** allows you to specify exactly which fields you want (inclusion) or do not want (exclusion).

### General Syntax:
```javascript
db.collection.find(queryFilter, projection);
```
- `1` (or `true`): Include the field in the output.
- `0` (or `false`): Exclude the field from the output.

---

## 2. Inclusion vs Exclusion

### 1. Inclusion (`1`): Return only specified fields
```javascript
// Returns ONLY name, username, and _id (by default)
db.users.find({}, { name: 1, username: 1 });
```

### 2. Exclusion (`0`): Exclude sensitive or bulky fields
```javascript
// Returns all fields EXCEPT company and address
db.users.find({}, { company: 0, address: 0 });
```

---

## 3. ⚠️ The Golden Rule of Projections

> **You cannot mix inclusion (`1`) and exclusion (`0`) in a single projection, with ONE exception: the `_id` field.**

### Allowed:
```javascript
// Mixing allowed ONLY for _id:
db.users.find({}, { name: 1, email: 1, _id: 0 }); // VALID

// Pure exclusion:
db.users.find({}, { password: 0, token: 0 }); // VALID
```

### Not Allowed (Throws Error):
```javascript
// ERROR: Cannot do inclusion and exclusion together on different fields:
db.users.find({}, { name: 1, address: 0 }); // INVALID! Throws Projection Error
```

---

## 4. Query with Projection & Filter

You can combine query filtering with projection:

```javascript
// Find user named "Leanne Graham" and return only name and username
db.users.find(
  { name: 'Leanne Graham' },
  { name: 1, username: 1, _id: 0 }
);
```

---

## 5. Running the Examples

Explore runnable projection examples in [`projection.mongodb.js`](./projection.mongodb.js). Click **Play (▶)** in VS Code to see live split results.
