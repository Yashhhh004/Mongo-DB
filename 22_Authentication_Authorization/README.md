# 22 - Authentication and Authorization in MongoDB

Security in MongoDB relies on two fundamental pillars: **Authentication** (verifying who you are) and **Authorization** (determining what operations and resources you are permitted to access).

---

## 1. What is Authentication?

**Authentication** is the process of verifying the identity of a client or user connecting to the database.
- It answers: *"Who are you?"*
- MongoDB verifies identity using credentials (such as username/password via `SCRAM`, x.509 certificates, or LDAP).
- When access control is enabled, unauthenticated connections cannot read, write, or inspect database contents.

---

## 2. What is Authorization?

**Authorization** is the process of determining whether an authenticated user has permission to perform a specific action on a specific database resource.
- It answers: *"What are you allowed to do?"*
- MongoDB uses **Role-Based Access Control (RBAC)**. Users are granted one or more roles, and each role grants privileges (actions like `find`, `insert`, `update`) on specified resources (databases or collections).

---

## 3. How to Enable Authentication

By default, local MongoDB installations run without authentication enabled. To enforce security:

1. Open your MongoDB configuration file (e.g., `mongod.cfg` on Windows, usually located in `C:\Program Files\MongoDB\Server\<version>\bin\mongod.cfg`).
2. Add or uncomment the security section:
   ```yaml
   security:
     authorization: enabled
   ```
3. Restart the MongoDB service.

> **Tip:** Always create your **Super Admin (root)** user *before* enabling authentication in `mongod.cfg`, or use the localhost exception on your first connection.

---

## 4. How to Set Root User (Super Admin) in MongoDB

The Super Admin user must be created on the `admin` database with the `root` role:

```javascript
// 1. Switch to the admin database
use admin;

// 2. Create the root administrator
db.createUser({
  user: 'admin',
  pwd: 'StrongPassword123',
  roles: [
    { role: 'root', db: 'admin' }
  ]
});

// 3. Authenticate as admin
db.auth('admin', 'StrongPassword123');
```

---

## 5. Database-Specific Users & Operations

### A. Creating a Read-Only User on a Specific Database

```javascript
use myApp;

// Create a user with read-only access to 'myApp' database
db.createUser({
  user: 'readerUser',
  pwd: 'ReadPassword123',
  roles: [
    { role: 'read', db: 'myApp' }
  ]
});

// Authenticate as the reader user
db.auth('readerUser', 'ReadPassword123');

// This read operation SUCCEEDS:
db.users.find();

// This write operation FAILS (unauthorized):
db.users.insertOne({ name: 'Test' }); // Error: unauthorized
```

### B. Creating a Read/Write User on a Specific Database

```javascript
use myApp;

db.createUser({
  user: 'appService',
  pwd: 'AppPassword123',
  roles: [
    { role: 'readWrite', db: 'myApp' }
  ]
});
```

---

## 6. Built-in Roles and Permissions in MongoDB

MongoDB provides comprehensive predefined roles grouped by responsibility:

### 1. Database User Roles
- **`read`**: Allows querying collections and reading data within the specified database.
- **`readWrite`**: Allows both reading and modifying (insert, update, delete) data on non-system collections.

### 2. Database Administration Roles
- **`dbAdmin`**: Allows performing administrative tasks such as creating indexes, viewing stats, and compacting collections, without granting direct read/write to data.
- **`userAdmin`**: Allows creating and modifying users and custom roles on that specific database.
- **`dbOwner`**: Combines `readWrite`, `dbAdmin`, and `userAdmin` permissions for full control of a single database.

### 3. Cluster Administration Roles (Assigned on `admin` DB)
- **`clusterAdmin`**: Highest cluster management role; includes `clusterManager`, `clusterMonitor`, and `hostManager`.
- **`clusterManager`**: Allows managing replication, sharding, and cluster topology.
- **`clusterMonitor`**: Read-only monitoring access to cluster performance, server status, and metrics.
- **`hostManager`**: Allows monitoring and restarting servers.

### 4. Backup and Restore Roles (Assigned on `admin` DB)
- **`backup`**: Grants minimum privileges required to run `mongodump` across all databases.
- **`restore`**: Grants minimum privileges required to run `mongorestore` to restore data.

### 5. All-Database Roles (Assigned on `admin` DB)
- **`readAnyDatabase`**: Grants `read` access across all databases (except `local` and `config`).
- **`readWriteAnyDatabase`**: Grants `readWrite` access across all databases.
- **`userAdminAnyDatabase`**: Grants user administration rights across all databases.
- **`dbAdminAnyDatabase`**: Grants database administration privileges across all databases.

### 6. Superuser Roles (Assigned on `admin` DB)
- **`root`**: Complete administrative and data access to the entire cluster and all databases.

---

## 7. Useful User Management Commands

```javascript
// List all users in the current database
db.getUsers();

// View current authenticated user information
db.runCommand({ connectionStatus: 1 });

// Change a user's password
db.changeUserPassword('appService', 'NewPassword456');

// Grant an additional role to an existing user
db.grantRolesToUser('appService', [{ role: 'dbAdmin', db: 'myApp' }]);

// Remove a user
db.dropUser('readerUser');
```
