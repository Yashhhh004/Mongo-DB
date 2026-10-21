# 07 - MongoDB Setup in VS Code (Extension & Playgrounds)

Learn to connect to MongoDB and run queries directly inside VS Code using official extensions and `.mongodb.js` Playgrounds.

---

## 1. Installing the Extension

1. Open VS Code and open the Extensions view (`Ctrl + Shift + X`).
2. Search for:
   ```
   MongoDB for VS Code
   ```
   *(Publisher: MongoDB)*
3. Click **Install**. A green leaf icon will appear in the Activity Bar on the left.

---

## 2. Connecting to Your Database

1. Click the **MongoDB leaf icon** in the left sidebar.
2. Click **"Add Connection"** (or click the **+** icon).
3. Select **"Connect using a Connection String"**.
4. Enter the default local URI:
   ```
   mongodb://localhost:27017
   ```
5. Click **Connect**. You can now browse databases, collections, and documents visually.

---

## 3. What are MongoDB Playgrounds?

A **Playground** is an executable JavaScript file with the extension `.mongodb.js`.

### Benefits:
- **IntelliSense**: Auto-completion for shell methods (`db.collection.find()`, `$match`, etc.).
- **Live Output**: Results open directly in a side split tab titled `Playground Result.json`.
- **Git Friendly**: Playground files can be saved, version-controlled, and shared with your team.

---

## 4. Running a Playground

To run [`crud.mongodb.js`](./crud.mongodb.js):
1. Open [`crud.mongodb.js`](./crud.mongodb.js) in the editor.
2. Click the **Play (▶)** button in the top-right toolbar.
3. *Or press the keyboard shortcut:*
   - **Windows / Linux**: `Ctrl + Alt + S`
   - **macOS**: `Cmd + Option + S`

---

## 5. Overview of `crud.mongodb.js`

The file demonstrates an idempotent, repeatable workflow:

```javascript
// 1. Select active database
use('ecommerce');

// 2. Clear collection for clean re-runs
db.users.drop();

// 3. Create (Insert)
db.users.insertMany([
  { name: "Champak", role: "Admin", age: 45, email: "champak@example.com", active: true },
  { name: "Jethalal", role: "Store Owner", age: 40, email: "jethalal@example.com", active: true },
  { name: "Tapu", role: "Member", age: 18, email: "tapu@example.com", active: false }
]);

// 4. Update
db.users.updateOne({ name: "Tapu" }, { $set: { active: true }, $inc: { age: 1 } });

// 5. Delete
db.users.deleteOne({ name: "Jethalal" });

// 6. Read
db.users.find({ active: true }, { name: 1, role: 1, age: 1 }).sort({ age: -1 });
```
