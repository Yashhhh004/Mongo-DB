/* global use, db, ObjectId */
// ============================================================================
// MongoDB ObjectId & _id Playground Demonstration
// ============================================================================

use('test');

// 1. Generate a new ObjectId
const newId = new ObjectId();
console.log("Generated ObjectId:", newId);

// 2. Extract embedded UTC creation timestamp from ObjectId
const creationTimestamp = newId.getTimestamp();
console.log("Embedded Timestamp:", creationTimestamp);

// 3. Inspect string representation (24-character hexadecimal)
const hexString = newId.toString();
console.log("Hex String (24 chars):", hexString);

// 4. Convert a 24-character hexadecimal string back into an ObjectId
const reconstructedId = new ObjectId(hexString);
console.log("Reconstructed ObjectId equals newId?", reconstructedId.equals(newId));

// 5. Query example using ObjectId
db.users.drop();
const inserted = db.users.insertOne({
  name: "Gada Electronics",
  owner: "Jethalal"
});

// Find document by its generated _id
const foundDoc = db.users.findOne({ _id: inserted.insertedId });
console.log("Found document:", foundDoc);

// Return result to playground output
foundDoc;