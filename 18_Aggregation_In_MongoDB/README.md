# 18 - Aggregation Framework in MongoDB

The Aggregation Framework is MongoDB's advanced data processing engine. It allows you to transform, filter, group, and calculate metrics on your data through sequential multi-step pipelines.

---

## 1. What is Aggregation?

**Aggregation** is a pipeline-based framework for data transformation and analytics in MongoDB. 
- Think of it like a **factory assembly line**: Raw documents enter at one end, pass through a series of stations (stages) where they are filtered, transformed, or grouped, and the final processed result emerges at the other end.
- While `find()` is used for simple retrieval, `aggregate()` is used for calculations, data analysis, grouping, and multi-collection joins.

---

## 2. When to Use `aggregate()` vs `find()`?

| Operation | `find()` | `aggregate()` |
| :--- | :--- | :--- |
| **Simple Reads & Filtering** | Recommended (Faster & simpler) | Overkill |
| **Field Projection / Exclusion** | Supported | Supported |
| **Calculating Totals / Averages** | Not supported | Required (`$group`, `$sum`, `$avg`) |
| **Reshaping Documents & Computed Fields** | Not supported | Required (`$project`, `$addFields`) |
| **Joining Collections (SQL-style JOIN)** | Not supported | Required (`$lookup`) |
| **Flattening Nested Arrays** | Not supported | Required (`$unwind`) |

> **Rule of Thumb**: Use `find()` for basic CRUD operations. Use `aggregate()` whenever you need to compute values, group documents, join collections, or transform shapes.

---

## 3. What are Pipeline Stages?

An **aggregation pipeline** consists of an array of one or more stages executed sequentially:

```
[ Documents ] 
      ⬇
[ Stage 1: $match ]   --> Filter out unwanted documents
      ⬇
[ Stage 2: $group ]   --> Group matching documents & calculate sums
      ⬇
[ Stage 3: $sort ]    --> Order the grouped results
      ⬇
[ Final Output ]
```

- Each stage takes the output of the preceding stage as its input.
- Documents are transformed step-by-step.

---

## 4. In Which Order Should Stages Be Used for Better Performance?

1. **Filter Early with `$match`**:
   - Always put `$match` as early as possible in your pipeline.
   - It reduces the total number of documents passed to downstream stages.
   - When placed first, `$match` can take advantage of collection **indexes**.
2. **Sort Early with `$sort`**:
   - If you need sorted results and have an index, put `$sort` directly after `$match` so it uses the index rather than sorting in memory.
3. **Project Early with `$project`**:
   - Strip out fields you do not need to reduce RAM overhead in subsequent stages.
4. **Place Heavy Stages Later (`$group`, `$lookup`, `$unwind`)**:
   - Operations like joins and array unwinding are computationally expensive. Running them after `$match` ensures they only operate on relevant documents.

---

## 5. Core Pipeline Stages Explained

### 1. `$match` (Filter Documents)
Filters the document stream to allow only matching documents to pass through to the next stage (equivalent to the query filter in `find()`).

```javascript
// Filter for mobile category products with price > 50000
db.products.aggregate([
  {
    $match: {
      category: "Mobile",
      price: { $gt: 50000 }
    }
  }
]);
```

---

### 2. `$group` (Group and Aggregate)
Groups input documents by a specified identifier (`_id`) and applies accumulator expressions like `$sum`, `$avg`, `$min`, `$max`, and `$push`.

```javascript
// Group products by category and calculate total inventory value and item count
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      totalRevenue: { $sum: "$price" },
      averagePrice: { $avg: "$price" },
      totalItems: { $sum: 1 }
    }
  }
]);
```

---

### 3. `$project` (Reshape and Compute Fields)
Passes along the documents with requested fields included, excluded, renamed, or computed into new fields.

```javascript
// Include name and price, compute discountPrice, hide _id
db.products.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      discountedPrice: { $multiply: ["$price", 0.9] } // 10% off
    }
  }
]);
```

---

### 4. `$sort` (Order Results)
Reorders documents in the stream by the specified field(s). `1` sorts ascending, `-1` sorts descending.

```javascript
// Sort products by price descending (highest first)
db.products.aggregate([
  {
    $sort: { price: -1 }
  }
]);
```

---

### 5. `$lookup` (Left Outer Join)
Performs a join to another collection in the same database to combine related data into an array field.

```javascript
// Join orders with product details
db.orders.aggregate([
  {
    $lookup: {
      from: "products",               // Target collection to join
      localField: "products.productId", // Field from the input documents
      foreignField: "_id",            // Field from the target collection
      as: "productDetails"            // New array field name for joined data
    }
  }
]);
```

---

### 6. `$unwind` (Flatten Arrays)
Deconstructs an array field from input documents, outputting one document for each element in the array.

```javascript
// If a document has tags: ["phone", "tech"], $unwind splits it into two documents
db.products.aggregate([
  {
    $unwind: "$tags"
  }
]);
```
