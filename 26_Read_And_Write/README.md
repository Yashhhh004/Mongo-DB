# 26 - Read & Write Concerns and Read Preferences in MongoDB

In distributed databases like MongoDB, data consistency and performance are always a trade-off. **Write Concern** and **Read Preference** give you precise control over this balance.

---

## 1. What is Write Concern?

**Write Concern** describes the level of acknowledgment requested from MongoDB for write operations (`insert`, `update`, `delete`).
- It answers: *"How many servers must confirm they received and wrote this data before MongoDB tells the client the write was successful?"*
- Higher write concerns provide higher durability and zero data loss, but increase write latency.
- Lower write concerns provide maximum throughput and lower latency, but increase data loss risk during unexpected crashes.

---

## 2. Write Concern Parameters

A write concern document contains up to three options: `{ w: <value>, j: <boolean>, wtimeout: <number> }`.

### A. The `w` Parameter (Acknowledgment Count)
- **`w: 0` (Unacknowledged)**:
  - The client sends the write request and immediately assumes success without waiting for any server response.
  - Fastest throughput, but highest risk: cannot catch network errors, duplicate key errors, or schema validation failures.
- **`w: 1` (Default in Standalone & Basic Setups)**:
  - MongoDB confirms the write after the **Primary** node applies the write in memory.
  - Fast, but if the Primary crashes before writing to disk journal or replicating to secondaries, the write could be lost during failover.
- **`w: "majority"` (Default in Replica Sets in MongoDB 5.0+)**:
  - MongoDB confirms the write only after a calculated majority of replica set nodes have applied the write.
  - Provides strong durability: prevents rollbacks if the Primary fails immediately after the write.

### B. The `j` Parameter (Journaling)
- **`j: true`**: Confirms that MongoDB has written the operation to the on-disk **journal** before responding to the client.
- Guarantees the write will survive an immediate physical power failure or sudden OS reboot.
- **`j: false` (Default)**: Confirms memory write without waiting for disk journal flush (WiredTiger flushes memory to journal every 100ms by default).

### C. The `wtimeout` Parameter (Timeout Protection)
- Specifies a time limit in milliseconds for the write concern to be satisfied.
- Prevents write operations from blocking indefinitely if a secondary node becomes unreachable while waiting for `w: "majority"`.
- If timeout occurs, MongoDB returns an error, but the write already committed to the Primary is *not* rolled back.

### Example Code:
```javascript
// Inserting a document with majority acknowledgment and a 5-second timeout
db.orders.insertOne(
  { item: "Laptop", price: 1200, status: "completed" },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
);
```

---

## 3. What are Read Preferences?

**Read Preference** determines which node in a replica set handles a given read query.

### The 5 Read Preference Modes

| Mode | Behavior | Best Used For |
| :--- | :--- | :--- |
| **`primary`** (Default) | Reads exclusively from Primary. Fails if Primary is down. | Real-time critical reads where reading stale data is unacceptable (e.g. account balances). |
| **`primaryPreferred`** | Reads from Primary if available; falls back to Secondary during failover. | Applications that favor freshness, but prefer stale reads over complete read downtime. |
| **`secondary`** | Reads exclusively from Secondary nodes. Fails if no Secondary is available. | Resource-intensive analytical queries and background reporting jobs. |
| **`secondaryPreferred`**| Reads from Secondary nodes; falls back to Primary only if all Secondaries are down. | High-volume consumer reads (e.g., product catalog or public blogs). |
| **`nearest`** | Reads from whichever node has lowest network latency (Primary or Secondary). | Multi-region deployments spanning global geographical locations. |

---

## 4. How to Configure Read Preferences

### A. Inside MongoDB Shell (`mongosh`)
```javascript
// Querying a collection using secondary preference
db.products.find().readPref("secondary");

// Querying using nearest node preference
db.products.find().readPref("nearest");
```

### B. In Connection String URI
```bash
mongodb://node1:27018,node2:27019,node3:27020/?replicaSet=rs0&readPreference=secondaryPreferred
```

---

## 5. Summary Cheat Sheet

| Setting | What It Governs | Primary Goal |
| :--- | :--- | :--- |
| **Write Concern** | How many nodes must confirm a write | Data safety, durability, and crash resistance |
| **Read Preference** | Which nodes serve read queries | Read throughput, latency, and read availability |
