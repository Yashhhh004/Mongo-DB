# 16 - Embedding and Referencing in MongoDB

Understand the two fundamental data modeling approaches in MongoDB, when to use each, and how to work with nested data.

---

## 1. What is Embedding?

**Embedding** (also called **Denormalization**) means storing related data directly inside the same document as nested objects or arrays.

### Example:
```javascript
// A single student document contains their course details
{
  "_id": 1,
  "name": "Rahul",
  "email": "rahul@example.com",
  "courses": [
    { "courseId": 101, "name": "BCA", "price": 12000, "duration": 3 },
    { "courseId": 102, "name": "Web Dev", "price": 5000, "duration": 1 }
  ]
}
```

- **Pros**: Fast read operations (fetches all data in a single query), atomic updates for the entire document.
- **Cons**: Subject to MongoDB's **16MB** document size limit; can lead to data duplication if the same course info is repeated across many students.

---

## 2. What is Referencing?

**Referencing** (also called **Normalization**) means storing related data in separate collections and linking them using identifiers (`_id`).

### Example:
```javascript
// Students Collection
{
  "_id": 1,
  "name": "Rahul",
  "courseIds": [101, 102] // References _id from the courses collection
}

// Courses Collection
{
  "_id": 101,
  "name": "BCA",
  "price": 12000,
  "duration": 3
}
```

- **Pros**: No data duplication (update once, reflects everywhere), no document size limit issues.
- **Cons**: Requires multiple queries or `$lookup` (JOIN) stages, which are slower than single-document reads.

---

## 3. What is Normalization?

**Normalization** is the practice of splitting data across separate collections to eliminate duplication and keep a single source of truth for each piece of data.
- Uses **Referencing**.
- Similar to traditional relational databases (SQL).
- Best when data is updated often and shared across many entities.

---

## 4. What is Denormalization?

**Denormalization** is the practice of combining related data into a single collection/document to optimize read performance.
- Uses **Embedding**.
- Embraces MongoDB's document model.
- Best when data is read together frequently and updates are rare.

---

## 5. Which Approach is Good in Which Scenario?

| Scenario | Recommended Approach | Why? |
| :--- | :--- | :--- |
| **1-to-1** (User and Profile) | **Embedding** | Data is small and almost always retrieved together. |
| **1-to-Few** (User and Addresses) | **Embedding** | A user rarely has more than 2-3 addresses; stays well under 16MB. |
| **1-to-Many (Unbounded)** (Post and thousands of Comments) | **Referencing** | Comments can grow indefinitely and exceed the 16MB document limit. |
| **Many-to-Many** (Students and Courses) | **Referencing** | Courses change frequently and are shared by many students. |
| **High Read, Low Write** | **Embedding** | Read performance is fastest when everything is in one document. |
| **High Write / Shared Data** | **Referencing** | Updating one shared document updates it for everyone without sync issues. |

---

## 6. How to Perform Operations on Embedded Documents?

All examples assume a `students` collection containing embedded `courses` arrays:

### A. Query by Nested Field (Dot Notation)
```javascript
// Find students enrolled in the "BCA" course
db.students.find({ "courses.name": "BCA" });
```

### B. Add an Item to an Embedded Array (`$push`)
```javascript
// Add a new course to Rahul's document
db.students.updateOne(
  { _id: 1 },
  {
    $push: {
      courses: { courseId: 103, name: "NodeJS", price: 4000, duration: 1 }
    }
  }
);
```

### C. Update a Specific Nested Item (`$` Positional Operator)
```javascript
// Update the price of BCA course for student with _id: 1
db.students.updateOne(
  { _id: 1, "courses.courseId": 101 },
  {
    $set: { "courses.$.price": 15000 }
  }
);
```

### D. Remove an Item from an Embedded Array (`$pull`)
```javascript
// Remove course with courseId 102
db.students.updateOne(
  { _id: 1 },
  {
    $pull: { courses: { courseId: 102 } }
  }
);
```
