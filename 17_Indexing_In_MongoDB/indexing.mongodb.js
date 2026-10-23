use('test');

// ==========================================
// 1. QUERY EXECUTION ANALYSIS
// ==========================================

// Check execution stats to see if index is used (IXSCAN vs COLLSCAN)
db.users.find({
  name: "Rahul Sharma"
}).explain('executionStats');


// ==========================================
// 2. CREATING & MANAGING INDEXES
// ==========================================

// Create a Single Field Index
db.users.createIndex({ name: 1 });

// View all indexes on the collection
db.users.getIndexes();

// Drop a specific index
db.users.dropIndex({ name: 1 });


// ==========================================
// 3. COMPOUND INDEXES
// ==========================================

// Index multiple fields (follows prefix rule: name, or name + age)
db.users.createIndex({ name: 1, age: 1 });


// ==========================================
// 4. UNIQUE INDEX
// ==========================================

// Prevent duplicate values in the email field
db.users.createIndex({ email: 1 }, { unique: true });


// ==========================================
// 5. PARTIAL FILTER EXPRESSION
// ==========================================

// Only index documents where age > 18 (saves RAM & storage)
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gt: 18 } } }
);


// ==========================================
// 6. TTL INDEX (TIME-TO-LIVE)
// ==========================================

// Automatically delete session documents after 1 hour (3600 seconds)
// Note: Must be a Date field; background cleanup process runs every 60 seconds
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);


// ==========================================
// 7. MULTIKEY & TEXT INDEXES
// ==========================================

// Multikey Index for array fields
db.products.createIndex({ tags: 1 });

// Text Index for full-text keyword search
db.products.createIndex({ name: "text", description: "text" });
