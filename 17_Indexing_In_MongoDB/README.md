# 17 - Indexing in MongoDB

Indexes are specialized data structures that optimize read queries. Without indexes, MongoDB must scan every document in a collection to satisfy a query.

---

## 1. What is Indexing?

An **index** is a data structure (B-Tree) that stores a small, sorted portion of the collection's data in memory.
- **Without an index (`COLLSCAN`)**: MongoDB executes a *Collection Scan*, inspecting every document one-by-one from disk.
- **With an index (`IXSCAN`)**: MongoDB executes an *Index Scan*, directly jumping to the matching documents in logarithmic time.

By default, MongoDB automatically creates a unique index on the `_id` field for every collection.

---

## 2. Real-Life Example: The Book Index

Imagine you have a 500-page book on Computer Science and want to find information about **"B-Trees"**:
- **Without an Index (Collection Scan)**: You start at page 1 and read every single page until page 500. This is slow and wasteful.
- **With an Index (Index Scan)**: You flip to the alphabetical index at the back of the book, look up "B-Tree -> page 142", and jump directly to page 142.

---

## 3. How Indexes Work Internally

- MongoDB uses a **B-Tree (Balanced Tree)** data structure.
- The keys in the B-Tree are kept in sorted order.
- Each index entry holds the indexed field's value and a disk pointer directly to the document.
- Searching an index has a time complexity of **$O(\log N)$**, compared to **$O(N)$** for scanning the whole collection.

---

## 4. Types of Indexes in MongoDB

1. **Single Field Index**: Index on one specific field.
2. **Compound Index**: Index on multiple fields together.
3. **Multikey Index**: Index on fields containing arrays.
4. **Text Index**: For text search across string content.
5. **TTL (Time-To-Live) Index**: Automatically deletes documents after a set duration.
6. **Unique Index**: Ensures no duplicate values exist for the field.
7. **Partial Index**: Indexes only documents that meet a filter condition.
8. **Sparse Index**: Only indexes documents that contain the specified field.

---

## 5. Single Field Index

An index created on a single document property. `1` specifies ascending order, `-1` specifies descending order.

```javascript
// Create an index on the "email" field
db.users.createIndex({ email: 1 });

// Query using this index
db.users.find({ email: "rahul@example.com" });
```

---

## 6. Compound Index

An index on two or more fields. Order of fields matters due to the **Prefix Rule**.

```javascript
// Create compound index on category (ascending) and price (descending)
db.products.createIndex({ category: 1, price: -1 });
```

> **Prefix Rule**: The index can support queries filtering on:
> 1. `{ category: ... }` (leading prefix)
> 2. `{ category: ..., price: ... }` (full index)
> 
> It **cannot** support queries filtering only on `{ price: ... }` because `price` is not a leading prefix.

---

## 7. Multikey Index

When you index a field that holds an **array**, MongoDB automatically creates a **Multikey Index**. It creates a separate index key for every element in the array.

```javascript
// Document structure: { name: "Post 1", tags: ["tech", "coding", "mongo"] }
db.posts.createIndex({ tags: 1 });

// Fast lookup for any tag inside the array
db.posts.find({ tags: "mongo" });
```

---

## 8. Text Index

Used to search for words within string fields. Supports tokenization and word-level search.

```javascript
// Create text index on title and description
db.articles.createIndex({ title: "text", description: "text" });

// Search using $text and $search
db.articles.find({ $text: { $search: "database tutorial" } });
```

---

## 9. What is Index Intersection?

**Index Intersection** occurs when MongoDB fulfills a query by using two or more separate single-field indexes together, rather than requiring a compound index.

- For example, if you have an index on `{ status: 1 }` and another index on `{ age: 1 }`, a query like `db.users.find({ status: "active", age: 25 })` can intersect both indexes to locate matches.
- A compound index is generally faster than index intersection, but intersection provides flexibility without creating excess indexes.

---

## 10. Partial Filter Expression (Partial Index)

Indexes **only documents that meet a specific criteria**. This saves valuable RAM and disk space.

```javascript
// Only index users whose age is greater than 18
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gt: 18 } } }
);
```

---

## 11. Expire After Seconds (TTL Index)

**Time-To-Live (TTL)** indexes automatically delete documents from a collection after a specified amount of time.
- Must be created on a single field holding a **Date** type.
- A background thread runs every 60 seconds to purge expired documents.

```javascript
// Automatically delete session documents 1 hour (3600 seconds) after createdAt
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);
```

---

## 12. Covered Query

A **Covered Query** is the fastest query in MongoDB:
- The index contains **all fields** requested by the query filter and the projection.
- MongoDB never needs to look up or load documents from disk (`totalDocsExamined: 0`).

```javascript
// Index on { name: 1, age: 1 }
db.users.createIndex({ name: 1, age: 1 });

// Covered query: filter and projection are completely covered by index
db.users.find(
  { name: "Rahul" },
  { name: 1, age: 1, _id: 0 }
);
```

---

## 13. Winning Plan and Rejected Plan

When a query runs, MongoDB's **Query Optimizer** evaluates available candidate indexes:
1. It runs the query using multiple candidate plans in parallel for a short burst.
2. The plan that returns results the fastest is chosen as the **Winning Plan** and cached for future queries.
3. The slower plans are marked as **Rejected Plans**.

View plan details using `.explain("executionStats")`:
```javascript
db.users.find({ name: "Rahul" }).explain("executionStats");
```

---

## 14. Index Cardinality

**Cardinality** refers to the number of unique values in a field:
- **High Cardinality** (Best for indexing): Fields with mostly unique values (e.g., `email`, `userId`, `orderNumber`). MongoDB quickly narrows down results to 1 document.
- **Low Cardinality** (Poor for indexing): Fields with very few distinct values (e.g., `gender`, `status: active/inactive`, boolean flags). Scanning the index offers little benefit over a collection scan.

---

## 15. Sparse Index

A **Sparse Index** only contains entries for documents that actually have the indexed field. Documents missing the field are skipped.

```javascript
// Only index documents where the "passportNumber" field exists
db.users.createIndex(
  { passportNumber: 1 },
  { sparse: true }
);
```

---

## 16. Index Performance and Optimization

To keep your database performant:
1. **Follow the ESR Rule for Compound Indexes**:
   - **E**quality: Fields checked for exact equality go first.
   - **S**ort: Fields used for sorting go second.
   - **R**ange: Fields checked for ranges (`$gt`, `$lt`, `$in`) go last.
2. **Keep Indexes in RAM**: If your working set of indexes doesn't fit in memory, queries must read from disk, drastically slowing down response times.
3. **Monitor with `.explain("executionStats")`**:
   - `stage`: Look for `IXSCAN` (good), avoid `COLLSCAN` (bad).
   - `totalDocsExamined`: Should be close or equal to `nReturned`.

---

## 17. When to Use Indexes?

- On fields you frequently use in `.find()` filters.
- On fields used in `.sort()` operations to avoid in-memory sorting.
- On fields used in `$lookup` join operations (`localField` and `foreignField`).
- On fields that require uniqueness (e.g., email, phone number, username).

---

## 18. When NOT to Use Indexes?

- **Small Collections**: For collections with only a few hundred documents, a collection scan in memory is faster than reading an index.
- **Low Cardinality Fields**: Fields with only 2-3 distinct values (e.g., `isVerified: true/false`).
- **Write-Heavy Collections with Rare Reads**: E.g., raw logging or IoT telemetry where writes happen continuously and reads rarely occur.
- **Unused Indexes**: Each unused index wastes RAM and slows down write operations.

---

## 19. The Core Trade-Off: Read Fast, Write Slow

> **Trade-Off**: Every index you create speeds up **READ** operations, but slows down **WRITE** operations (`insert`, `update`, `delete`), because MongoDB must update both the document and all associated B-Tree indexes on disk. Keep only the indexes your application actually uses.