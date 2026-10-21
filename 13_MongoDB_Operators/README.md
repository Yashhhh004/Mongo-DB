# 13 - MongoDB Operators Reference & Guide

Operators are special keywords starting with `$` used to filter, compare, evaluate, and modify documents.

---

## 1. Comparison Operators
File: [`comparision-operators.mongodb.js`](./comparision-operators.mongodb.js)

| Operator | Meaning | Example |
| :--- | :--- | :--- |
| `$eq` / `$ne` | Equal to / Not equal to | `{ price: { $eq: 499 } }` |
| `$gt` / `$gte` | Greater than / Greater than or equal | `{ price: { $gte: 100 } }` |
| `$lt` / `$lte` | Less than / Less than or equal | `{ price: { $lte: 50 } }` |
| `$in` / `$nin` | Matches any / none in array | `{ category: { $in: ["beauty", "groceries"] } }` |

---

## 2. Logical Operators
File: [`logical-operator.mongodb.js`](./logical-operator.mongodb.js)

- **`$and`**: Joins query clauses where all must match (implicit by default in MongoDB).
- **`$or`**: Matches documents satisfying at least one condition:
  ```javascript
  db.products.find({ $or: [{ category: "beauty" }, { price: { $lt: 15 } }] });
  ```
- **`$not`**: Inverts the effect of a query expression (`{ price: { $not: { $lt: 20 } } }`).
- **`$nor`**: Matches documents that fail all query conditions.

---

## 3. Element Operators
File: [`element-operators.mongodb.js`](./element-operators.mongodb.js)

- **`$exists`**: Checks if a field exists (`{ age: { $exists: true } }`).
- **`$type`**: Matches by BSON data type (`{ age: { $type: "string" } }` or type number `2`).

---

## 4. Evaluation Operators
File: [`evaluation.mongodb.js`](./evaluation.mongodb.js)

- **`$expr`**: Allows comparing two fields within the same document:
  ```javascript
  db.products.find({ $expr: { $gt: ["$discountPrice", "$price"] } });
  ```
- **`$regex`**: Performs pattern matching (`{ name: { $regex: "^Y", $options: "i" } }`).
- **`$mod`**: Performs modulo calculation (`{ value: { $mod: [2, 0] } }` finds even numbers).

---

## 5. Array Operators
File: [`array-operators.mongodb.js`](./array-operators.mongodb.js)

- **`$all`**: Matches arrays containing all specified elements (`{ skills: { $all: ["HTML", "CSS"] } }`).
- **`$size`**: Matches arrays with an exact number of elements (`{ skills: { $size: 3 } }`).
- **`$elemMatch`**: Matches documents if at least one array element satisfies all criteria:
  ```javascript
  db.products.find({ reviews: { $elemMatch: { user: "Rahul", rating: 5 } } });
  ```

---

## 6. Update Field & Array Operators
File: [`update-operators.mongodb.js`](./update-operators.mongodb.js)

- **`$set` / `$unset`**: Assigns a value / deletes a field.
- **`$inc` / `$mul`**: Increments / multiplies a numeric value.
- **`$min` / `$max`**: Only updates if value is less than / greater than specified value.
- **`$push`**: Appends an item to an array.
- **`$pull`**: Removes all matching items from an array.
- **`$addToSet`**: Appends unique values only (prevents duplicates).
