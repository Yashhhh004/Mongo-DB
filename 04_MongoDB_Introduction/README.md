# 04 - MongoDB Introduction & Core Concepts

An introduction to modern database architecture, the rise of NoSQL, and the key differences between JSON and BSON.

---

## 1. What is a DBMS?

A **Database Management System (DBMS)** is software that interacts with users, applications, and physical storage to capture, analyze, and manage data securely:
- **Persistence**: Retains data across system reboots and crashes.
- **Concurrency**: Prevents conflicts when multiple users read/write simultaneously.
- **Security**: Manages authentication, access permissions, and encryption.
- **Query Engine**: Optimizes indexes and query execution for high performance.

---

## 2. What is MongoDB?

**MongoDB** is an open-source, distributed **NoSQL document database**. Instead of rigid tables, MongoDB stores data as self-contained, flexible **BSON documents** organized into collections.

### Core Features:
- **Flexible Schema**: Documents in the same collection can have different fields.
- **Embedded Documents**: Nest objects and arrays directly inside records.
- **Horizontal Scalability**: Scales out smoothly across clusters using **Sharding**.
- **High Availability**: Automated replication and failover with **Replica Sets**.

---

## 3. SQL (Relational) vs NoSQL (MongoDB)

| Feature | SQL Databases (e.g., PostgreSQL, MySQL) | MongoDB (NoSQL Document Store) |
| :--- | :--- | :--- |
| **Data Unit** | Tables, Rows, Columns | Databases, Collections, BSON Documents |
| **Schema** | Rigid, predefined upfront via DDL | Flexible, dynamic, polymorphic schema |
| **Relations** | Foreign Keys and complex `JOIN`s | Embedded subdocuments and references |
| **Scaling** | Vertical (Scale-up: bigger CPU / RAM) | Horizontal (Scale-out: sharding across clusters) |
| **Best For** | Heavy relational, legacy banking ERPs | Web apps, real-time analytics, mobile apps, agile systems |

---

## 4. Understanding JSON vs BSON

While clients exchange **JSON** over HTTP, MongoDB stores and processes records as **BSON** (Binary JSON) on disk and wire protocol.

```
[ Frontend / Client ]  ◄── JSON (HTTP Text) ──►  [ Express Server ]  ◄── BSON (Binary Protocol) ──►  [ MongoDB Engine ]
```

### Key Differences:

| Criterion | JSON (JavaScript Object Notation) | BSON (Binary JSON) |
| :--- | :--- | :--- |
| **Format** | Human-readable UTF-8 text string | Machine-readable binary format |
| **Primary Use** | Web API payloads (HTTP requests) | MongoDB storage engine & wire protocol |
| **Parsing Speed** | Slower (requires text lexical parsing) | Very fast (length prefixes allow fast skipping) |
| **Data Types** | 6 basic types (String, Number, Bool, Array, Object, null) | Rich types: `ObjectId`, `Date`, `int32`, `int64`, `Decimal128`, `BinData` |
| **Storage** | Compact for text; slow to parse | Slight overhead for headers, but optimized for indexing & querying |

### Example Document:
```json
{
  "_id": ObjectId("670c7934c979c2311b5e1a2b"),
  "name": "Yash",
  "email": "yash@example.com",
  "address": { "city": "Mumbai", "pincode": 400001 },
  "tags": ["developer", "mongodb"],
  "createdAt": ISODate("2026-10-14T10:00:00Z")
}
```
