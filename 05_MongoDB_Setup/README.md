# 05 - MongoDB Setup & Installation Guide

A complete guide to installing and configuring MongoDB Community Server, `mongosh` CLI, and MongoDB Compass GUI.

---

## 1. Key Components of the MongoDB Ecosystem

```
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Local Environment                │
├──────────────────────────────┬──────────────────────────────┤
│       Client Tools           │       Core Database Server   │
│  - MongoDB Compass (GUI)     │       mongod                 │
│  - mongosh CLI (Shell)       │───►   Daemon Engine          │
│                              │       Default Port: 27017    │
└──────────────────────────────┴──────────────────────────────┘
```

- **`mongod`**: The core background daemon process that manages storage, writes/reads data, and listens on `mongodb://localhost:27017`.
- **`mongosh`**: The modern Command-Line Interface (CLI) interactive REPL for running queries and administrative commands.
- **MongoDB Compass**: The official Graphical User Interface (GUI) for visually exploring databases, collections, and constructing queries.

---

## 2. Windows Installation Steps

### Step 1: Install MongoDB Community Server
1. Download the latest MSI installer from [MongoDB Community Server](https://www.mongodb.com/try/download/community).
2. Run the `.msi` file:
   - Select **Complete** setup.
   - Ensure **"Install MongoDB as a Service"** is checked.
   - Check **"Install MongoDB Compass"** to install the GUI automatically.

### Step 2: Install MongoDB Shell (`mongosh`)
1. Download `mongosh` from [MongoDB Shell Download](https://www.mongodb.com/try/download/shell).
2. Extract the archive or run the Windows installer.

---

## 3. Configure Environment Variables (PATH)

To run `mongod` and `mongosh` from any command prompt or PowerShell terminal:

1. Copy the path to the bin folder (default):
   ```
   C:\Program Files\MongoDB\Server\<version>\bin
   ```
   and your extracted `mongosh` directory:
   ```
   C:\Program Files\mongosh\bin
   ```
2. Press `Win + S`, search for **Environment Variables**, and select **Edit system environment variables**.
3. Under **System Variables**, click `Path` ➔ **Edit** ➔ **New**, paste the paths, and click **OK**.

---

## 4. Verify & Manage the Service

Open PowerShell and verify:

```powershell
# Check versions
mongod --version
mongosh --version

# Connect to the local MongoDB server
mongosh
```

### Starting and Stopping the Windows Service:
```powershell
# Check service status
Get-Service -Name MongoDB

# Start or Stop service (run PowerShell as Administrator)
Start-Service -Name MongoDB
Stop-Service -Name MongoDB
```
