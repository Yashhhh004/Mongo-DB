# 27 - Backup and Restore in MongoDB

Regular backups are essential for any production database to protect against data corruption, hardware failure, accidental user deletion, and ransomware. MongoDB provides powerful command-line utilities to export and restore data.

---

## 1. What is a Database Backup?

A **backup** is a representative copy of your database taken at a specific point in time, stored on a separate storage system or server.
- **Disaster Recovery**: Restores service quickly if the primary server or data center fails.
- **Accidental Deletion Rollback**: Allows restoring data if an administrator or software bug mistakenly drops a collection or updates records incorrectly.
- **Compliance & Auditing**: Meets legal requirements for historical data retention.

---

## 2. Types of Database Backups

MongoDB supports two primary backup strategies:

### A. Logical Backup (`mongodump` / `mongorestore`)
- Reads documents from collections and exports them into binary **BSON** files along with index metadata.
- **Pros**: Highly portable across different operating systems and MongoDB versions; allows filtering by database or collection.
- **Cons**: Can take significant time and CPU/memory on multi-terabyte datasets.

### B. Physical Backup (Filesystem / Disk Snapshots)
- Takes a point-in-time snapshot of the underlying storage volume (e.g., AWS EBS snapshot, LVM snapshot) holding the WiredTiger data files.
- **Pros**: Extremely fast (instantaneous snapshot), minimal overhead on running database.
- **Cons**: Requires filesystem-level access and snapshot capabilities; less portable across different environments.

---

## 3. `mongodump` vs `mongoexport`

| Feature | `mongodump` / `mongorestore` | `mongoexport` / `mongoimport` |
| :--- | :--- | :--- |
| **Data Format** | Binary BSON + Index metadata | Human-readable JSON / CSV |
| **Data Type Preservation** | 100% preservation of all BSON types | Loses precision on complex BSON types |
| **Primary Use Case** | Full database backup & disaster recovery | Data exchange, reporting, spreadsheets |

---

## 4. Practical Backup & Restore Commands

`mongodump` and `mongorestore` are standalone command-line tools (installed via MongoDB Database Tools).

### 1. Full Database Backup & Restore

```bash
# Backup all databases into a target folder
mongodump --out "C:\backups\mongo_dump"

# Restore all databases from the dump folder
mongorestore "C:\backups\mongo_dump"
```

### 2. Backing Up and Restoring a Specific Database

```bash
# Backup only the 'shop' database
mongodump --db shop --out "C:\backups\mongo_dump"

# Restore only the 'shop' database
mongorestore --db shop "C:\backups\mongo_dump\shop"
```

### 3. Backing Up and Restoring a Specific Collection

```bash
# Backup only the 'orders' collection from 'shop'
mongodump --db shop --collection orders --out "C:\backups\mongo_dump"

# Restore only the 'orders' collection
mongorestore --db shop --collection orders "C:\backups\mongo_dump\shop\orders.bson"
```

---

## 5. Production Best Practices (Gzip & Archive)

In production environments, writing thousands of loose files can be slow. Use `--gzip` and `--archive` to create a single compressed backup file:

```bash
# Create a single compressed archive file
mongodump --db shop --gzip --archive="C:\backups\shop_backup.gz"

# Restore from the compressed archive file with --drop (cleans existing collection first)
mongorestore --gzip --archive="C:\backups\shop_backup.gz" --drop
```

> **Warning:** Use `--drop` with caution: it drops existing collections in the target database before restoring documents from the backup.

---

## 6. Summary

- **Logical Backups** (`mongodump` / `mongorestore`) are ideal for day-to-day backups and cross-version portability.
- **Physical Backups** (disk snapshots) are best for massive multi-terabyte production deployments.
- Always use `--gzip` and `--archive` for fast, space-efficient backups.
- Regularly test your restore procedures to verify backup validity before an emergency occurs.
