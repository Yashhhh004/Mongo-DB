# 08 - MongoDB `_id` & `ObjectId` Deep Dive

Understanding the special `_id` field and how the 12-byte binary `ObjectId` guarantees distributed uniqueness.

---

## 1. What is the `_id` Field?

Every document stored in a MongoDB collection **requires** a unique `_id` field that functions as its **Primary Key**.

- If you don't specify an `_id` during insert, MongoDB automatically assigns one of type `ObjectId`.
- **Immutable**: Once inserted, a document's `_id` cannot be changed.
- **Unique Index**: MongoDB creates a unique index on `_id` automatically (`_id_`), enabling fast $O(\log N)$ lookups.

---

## 2. The 12-Byte Binary Anatomy of an `ObjectId`

An `ObjectId` is a **12-byte (96-bit) binary value** represented as a **24-character hexadecimal string**:

```
 4 Bytes            5 Bytes               3 Bytes
┌──────────────────┬─────────────────────┬──────────────────┐
│    Timestamp     │    Random Value     │    Counter       │
│  (Seconds since  │  (Unique to process │  (Incrementing   │
│   Unix Epoch)    │    and machine)     │     value)       │
└──────────────────┴─────────────────────┴──────────────────┘
 8 Hex Characters    10 Hex Characters     6 Hex Characters
```

| Section | Size | Hex Characters | Purpose |
| :--- | :--- | :--- | :--- |
| **1. Timestamp** | 4 Bytes (32 bits) | 8 chars | Unix epoch time in seconds when generated. |
| **2. Random Value** | 5 Bytes (40 bits) | 10 chars | Unique to the machine and process generating the ID. |
| **3. Counter** | 3 Bytes (24 bits) | 6 chars | Incrementing counter to avoid collisions in the same second. |

**Total**: $4 + 5 + 3 = 12\text{ bytes} = 24\text{ hex characters}$.

---

## 3. Key Advantages

1. **Decentralized Generation**: Drivers generate IDs on the client side without database network roundtrips.
2. **Chronological Sorting**: Sorting by `_id` (`.sort({ _id: 1 })`) orders documents roughly by creation time.
3. **Embedded Timestamp**: Extracts exact creation time without needing a separate `createdAt` field:
   ```javascript
   const id = ObjectId("670c7934c979c2311b5e1a2b");
   id.getTimestamp(); // ISODate("2024-10-14T01:50:44.000Z")
   ```

---

## 4. Querying by `ObjectId`

### MongoDB Shell (`mongosh`):
```javascript
db.users.findOne({ _id: ObjectId("670c7934c979c2311b5e1a2b") });
```

### Native Node.js Driver:
```javascript
import { ObjectId } from 'mongodb';
const user = await collection.findOne({ _id: new ObjectId("670c7934c979c2311b5e1a2b") });
```

### Mongoose ODM:
Mongoose automatically casts 24-character hex strings into `ObjectId`:
```javascript
const user = await User.findById("670c7934c979c2311b5e1a2b");
```
