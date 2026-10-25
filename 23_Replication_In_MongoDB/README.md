# 23 - Replication in MongoDB

Replication is MongoDB’s mechanism for synchronizing data across multiple database servers to deliver redundancy, fault tolerance, and high data availability.

---

## 1. What is Replication?

**Replication** is the continuous copying of data across multiple database servers.
- **Redundancy & Safety**: If one physical server crashes, your data remains safe and accessible on other servers.
- **No Single Point of Failure**: Guarantees your application stays online even during hardware failures or scheduled system maintenance.
- **Disaster Recovery**: Allows geographical distribution of data across different data centers.

---

## 2. What is a Replica Set?

A **Replica Set** is a cluster of `mongod` instances that maintain the same dataset. A typical production replica set contains an odd number of members (minimum 3):

1. **Primary Node (1)**:
   - The only node that receives write operations (`insert`, `update`, `delete`).
   - Records all operations in its internal operations log (**Oplog**).
2. **Secondary Nodes (1 or more)**:
   - Replicate the Primary's Oplog asynchronously and apply changes to their own local datasets.
   - Can serve read queries depending on your Read Preference settings.
   - Eligible to be elected as the new Primary if the current Primary goes offline.
3. **Arbiter Node (Optional)**:
   - Holds no data copies and cannot become Primary.
   - Only participates in elections to break ties if an odd number of voting nodes is needed.

---

## 3. How Replication Works Internally

Replication operates on three core building blocks:

### A. The Oplog (`local.oplog.rs`)
- The **Oplog (Operations Log)** is a capped collection on the Primary node.
- Every write operation made to the Primary is recorded as an idempotent operation in the Oplog.
- Secondary nodes continuously tail and replay these operations to keep their data in sync.

### B. Heartbeats (Health Monitoring)
- Every member of a replica set sends a heartbeat (ping) to every other member every **2 seconds**.
- If a member does not respond within **10 seconds**, the cluster marks it as unreachable.

### C. Automated Elections & Failover
- If the Primary node fails or loses network connectivity, the remaining Secondaries automatically detect the failure and initiate an election.
- The Secondary with the most up-to-date Oplog and highest priority is elected as the new Primary.
- The election typically completes within **10–12 seconds** without manual administrator intervention.

---

## 4. Setting Up a Local Replica Set (Hands-On)

To test a replica set on your local machine, run 3 separate `mongod` processes on different ports with unique data directories.

### Step 1: Start 3 MongoDB Instances
```bash
# Terminal 1 - Node 1
mongod --replSet rs0 --port 27018 --dbpath "C:\data\db1"

# Terminal 2 - Node 2
mongod --replSet rs0 --port 27019 --dbpath "C:\data\db2"

# Terminal 3 - Node 3
mongod --replSet rs0 --port 27020 --dbpath "C:\data\db3"
```
*(Ensure directories `C:\data\db1`, `db2`, and `db3` exist before starting).*

### Step 2: Initialize the Replica Set
Connect to one of the nodes using `mongosh`:
```bash
mongosh --port 27018
```

Run the initialization command in `mongosh`:
```javascript
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27018" },
    { _id: 1, host: "localhost:27019" },
    { _id: 2, host: "localhost:27020" }
  ]
});
```

Verify the status:
```javascript
rs.status(); // Checks cluster health, node roles, and sync state
```

---

## 5. What is Read Preference?

In a replica set, **Read Preference** determines how read operations are routed to members in the cluster. By default, all reads are directed to the **Primary** node for strict consistency.

### The 5 Read Preference Modes

| Mode | Routing Behavior | Best Use Case |
| :--- | :--- | :--- |
| **`primary`** (Default) | Reads exclusively from Primary. Fails if Primary is down. | Financial and critical operations requiring strict consistency. |
| **`primaryPreferred`** | Reads from Primary; falls back to Secondary if Primary is offline. | Applications prioritizing reads over strict freshness. |
| **`secondary`** | Reads exclusively from Secondary nodes. Fails if no Secondary is reachable. | Analytical reports and batch jobs that should not burden Primary. |
| **`secondaryPreferred`**| Reads from Secondary nodes; falls back to Primary if no Secondary is available. | High-read consumer applications with tolerance for eventual consistency. |
| **`nearest`** | Reads from the node with lowest network latency (Primary or Secondary). | Multi-region, geographically distributed setups. |

---

## 6. How to Implement Read Preference

### Method 1: Via Connection String URI
Pass `readPreference` directly in your application connection string:

```bash
mongosh "mongodb://localhost:27018,localhost:27019,localhost:27020/?replicaSet=rs0&readPreference=secondaryPreferred"
```

In a Node.js Driver / Mongoose connection:
```javascript
const uri = "mongodb://localhost:27018,localhost:27019,localhost:27020/myDb?replicaSet=rs0&readPreference=secondaryPreferred";
```

### Method 2: Query-Level Read Preference in `mongosh`
You can override read preference on specific queries using `.readPref()`:

```javascript
// Read exclusively from a secondary
db.products.find().readPref("secondary");

// Read from the member with lowest latency
db.products.find().readPref("nearest");
```

---

## 7. Summary

- **Replication** delivers high availability and automated failover via Replica Sets (1 Primary + Secondaries).
- Changes sync asynchronously using the **Oplog** (`local.oplog.rs`).
- Health is tracked by 2-second heartbeats; elections elect a new Primary automatically during failure.
- **Read Preference** controls read traffic distribution across cluster nodes.