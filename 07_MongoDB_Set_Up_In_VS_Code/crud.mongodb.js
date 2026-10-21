/* global use, db */
// ============================================================================
// MongoDB Playground in VS Code
// ============================================================================
// To run this playground:
// 1. Install the official "MongoDB for VS Code" extension.
// 2. Connect to your local instance (mongodb://localhost:27017).
// 3. Click the "Play" button in the top right or press (Ctrl + Alt + S / Cmd + Option + S).
// ============================================================================

// 1. Select the database to use
use('ecommerce');

// 2. Drop collection before running to keep playground runs idempotent (clean test run)
db.users.drop();

// 3. CREATE: Insert multiple documents
db.users.insertMany([
  {
    name: "Champak",
    role: "Admin",
    age: 45,
    email: "champak@example.com",
    active: true
  },
  {
    name: "Jethalal",
    role: "Store Owner",
    age: 40,
    email: "jethalal@example.com",
    active: true
  },
  {
    name: "Tapu",
    role: "Member",
    age: 18,
    email: "tapu@example.com",
    active: false
  }
]);

// 4. UPDATE: Update one document
db.users.updateOne(
  { name: "Tapu" },
  { 
    $set: { active: true },
    $inc: { age: 1 } 
  }
);

// 5. DELETE: Delete a user document
db.users.deleteOne({ name: "Jethalal" });

// 6. READ: Query all remaining active users
db.users.find(
  { active: true },
  { name: 1, role: 1, age: 1, email: 1 }
).sort({ age: -1 });
