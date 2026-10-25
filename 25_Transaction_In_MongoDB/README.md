# 25 - Transactions in MongoDB

Transactions allow you to group multiple database operations into a single atomic execution unit. Either all operations succeed and become permanent, or the entire transaction fails and leaves the database completely unchanged.

---

## 1. What are Transactions?

A **transaction** is a sequence of read and write operations treated as a single logical unit of work.
- Follows the **"All or Nothing"** principle.
- If any operation inside the transaction encounters an error or network drop, the entire transaction is rolled back (`abortTransaction`), leaving no partial or corrupt state.
- Single-document operations in MongoDB are always atomic by default. Multi-document transactions extend this atomicity across multiple documents, collections, and databases.

---

## 2. What are ACID Properties?

ACID is a set of four guarantees that ensure reliable database transactions:

### A. Atomicity ("All or Nothing")
- All operations in the transaction succeed together or fail together.
- Example: In a bank transfer, deducting money from Account A and crediting Account B are performed as a single atomic unit. If crediting Account B fails, the deduction from Account A is rolled back automatically.

### B. Consistency ("Valid State to Valid State")
- Any transaction will bring the database from one valid state to another, maintaining all schema validation rules, unique constraints, and business logic.
- Total system funds remain constant before and after a fund transfer.

### C. Isolation ("Invisible Intermediate States")
- Concurrent transactions execute independently without interfering with each other.
- The intermediate, incomplete state of a running transaction is invisible to other operations until the transaction is officially committed.

### D. Durability ("Permanent Once Committed")
- Once a transaction is committed, its changes are permanently written to non-volatile disk storage (via write concern and journaling), surviving crashes or power outages.

---

## 3. Requirements for Using Transactions in MongoDB

To use multi-document transactions in MongoDB, the following prerequisites are required:

1. **Storage Engine**: Must use the default **WiredTiger** storage engine.
2. **Deployment Topology**: Must run on a **Replica Set** or a **Sharded Cluster** (stand-alone single instances do not support multi-document transactions).
3. **Client Sessions**: Transactions must be bound to a client session (`startSession()`).
4. **Time Limit**: Transactions should be kept short (default execution limit is 60 seconds) to prevent locking resources and accumulating transaction logs.

---

## 4. When to Use Transactions (Real-World Examples)

In MongoDB, document embedding often avoids the need for transactions because single-document updates are inherently atomic. However, multi-document transactions are necessary in scenarios such as:

1. **Banking & Financial Transfers**:
   - Debiting money from a sender's account and crediting a receiver's account across separate account documents.
2. **E-Commerce Order Checkout**:
   - Decrementing product inventory in the `inventory` collection, creating an order record in `orders`, and generating a charge entry in `payments`.
3. **User Deletion & Data Cleanup**:
   - Deleting a user profile while simultaneously anonymizing or reassigning their audit logs across multiple collections.

---

## 5. Practical Implementation Pattern

Here is the standard implementation pattern in modern `mongosh` / Node.js:

```javascript
// 1. Start a client session
const session = db.getMongo().startSession();

// 2. Begin the transaction
session.startTransaction({
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' }
});

try {
  const accounts = session.getDatabase('bank').accounts;

  // Step 1: Deduct $500 from Yash
  accounts.updateOne(
    { name: 'Yash' },
    { $inc: { balance: -500 } }
  );

  // Step 2: Credit $500 to Kashish
  accounts.updateOne(
    { name: 'Kashish' },
    { $inc: { balance: 500 } }
  );

  // Step 3: Commit the transaction
  session.commitTransaction();
  console.log("Transaction successfully committed.");
} catch (error) {
  // Roll back all changes if an error occurs
  session.abortTransaction();
  console.error("Transaction aborted due to error:", error);
} finally {
  // Always close the session to release resources
  session.endSession();
}
```

---

## 6. Summary

- Transactions guarantee **ACID** properties across multiple documents and collections.
- Single-document operations are atomic by default; multi-document transactions should be reserved for operations spanning multiple records.
- Transactions require a **Replica Set / Sharded Cluster** and must be executed within a **Client Session**.
