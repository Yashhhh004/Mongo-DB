# 24 - Sharding in MongoDB

Sharding is MongoDB’s method for horizontal scaling, allowing you to store and query datasets that exceed the storage, memory, or throughput capacity of a single physical server.

---

## 1. What is Sharding?

**Sharding** is the process of partitioning large datasets and distributing them across multiple physical database servers (called shards).
- As dataset volume and query traffic grow, sharding allows you to add more machines to maintain high performance.
- Sharding is transparent to the client application: queries and writes look like they are interacting with a single unified database.

---

## 2. Vertical vs Horizontal Scaling

| Feature | Vertical Scaling (Scale Up) | Horizontal Scaling (Scale Out / Sharding) |
| :--- | :--- | :--- |
| **Approach** | Adding more CPU, RAM, or faster NVMe disks to a single machine. | Adding more commodity servers to distribute the workload. |
| **Limits** | Hard hardware ceilings and exponentially increasing hardware costs. | Virtually unlimited scaling by adding nodes as needed. |
| **Downtime** | Often requires downtime to upgrade hardware. | Nodes can be added dynamically with zero application downtime. |
| **Cost** | High-end enterprise servers are extremely expensive. | Cost-effective using standard cloud instances or commodity hardware. |

---

## 3. Sharded Cluster Architecture

A MongoDB sharded cluster consists of three main components:

```
          [ Client Application ]
                    │
                    ▼
            [ mongos Router ]
             /      │      \
            /       │       \
    [ Config Servers ]       \
    (Cluster Metadata)        \
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
     [ Shard 1 ]         [ Shard 2 ]         [ Shard 3 ]
   (Replica Set)       (Replica Set)       (Replica Set)
```

1. **Shards**:
   - Each shard contains a subset of the sharded data.
   - In production, each shard is deployed as a **Replica Set** for high availability and redundancy.
2. **Config Servers**:
   - Store the cluster’s configuration metadata, chunk ranges, and routing mappings.
   - Deployed as a dedicated replica set for high reliability.
3. **Mongos (Query Router)**:
   - A lightweight, stateless routing service that acts as the interface between the client application and the cluster.
   - Reads metadata from Config Servers to determine which shard holds the requested data.

---

## 4. How Query Routing Works

When a client application sends a query to `mongos`, routing behaves in one of two ways:

1. **Targeted Queries (Fast & Efficient)**:
   - If the query includes the **Shard Key**, `mongos` looks up the chunk location in its cached routing table and directs the query to only the relevant shard(s).
2. **Scatter-Gather Queries (Higher Overhead)**:
   - If the query does *not* include the shard key, `mongos` must broadcast (scatter) the query to **all shards**, collect (gather) their results, merge and sort them, and return the response to the client.

---

## 5. What is a Shard Key?

A **Shard Key** is an indexed field (or compound fields) present in every document that determines how data is distributed across the shards.
- The shard key divides collection data into contiguous blocks called **chunks**.
- When chunks reach a maximum size (default 64MB), MongoDB automatically splits them and balances them evenly across shards.
- **Important**: Once selected, choosing a shard key carefully is critical because it dictates query performance and data distribution across your cluster.

---

## 6. Range-Based Sharding vs Hashed Sharding

MongoDB supports two primary data distribution strategies:

### A. Range-Based Sharding
- Documents are partitioned based on contiguous ranges of the shard key value (e.g., `A–F` on Shard 1, `G–M` on Shard 2, `N–Z` on Shard 3).
- **Pros**: Highly efficient for range queries (`$gte`, `$lte`), because data within a range resides on the same shard.
- **Cons**: Risk of hotspotting (e.g., auto-incrementing IDs or dates send all new inserts to a single shard).

### B. Hashed Sharding
- MongoDB computes an MD5 hash of the shard key value and distributes chunks based on the hashed values.
- **Pros**: Ensures completely even and uniform distribution of writes across all shards, avoiding write hotspots.
- **Cons**: Range queries become scatter-gather operations across all shards, since consecutive values are scattered randomly.

---

## 7. Basic Sharding Commands (Cheat Sheet)

```javascript
// 1. Connect to mongos
// mongosh --port 27017

// 2. Enable sharding on a database
sh.enableSharding("ecommerce");

// 3. Shard a collection with Range-Based Sharding
sh.shardCollection("ecommerce.users", { country: 1 });

// 4. Shard a collection with Hashed Sharding
sh.shardCollection("ecommerce.orders", { orderId: "hashed" });

// 5. Check cluster sharding status and chunk distribution
sh.status();
```

---

## 8. Summary

- **Sharding** provides horizontal scaling across multiple servers.
- Architecture contains: **Shards** (data storage), **Config Servers** (metadata), and **Mongos** (routing).
- Queries using the **Shard Key** are directly targeted; queries without it require a scatter-gather scan.
- Use **Range-based sharding** for range query optimization, and **Hashed sharding** for uniform write distribution.
