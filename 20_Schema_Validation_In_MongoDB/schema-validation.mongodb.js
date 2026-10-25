use('test');

// 1. Basic Document Insert
// db.users.insertOne({
//     name: 'Yash',
//     roll: 1,
//     age: 21,
// });

// 2. Common BSON Data Types in MongoDB
// db.users.insertOne({
//     _id: ObjectId('6adc35ee3f494656d6614806'), // ObjectId
//     name: "Manas",                            // String
//     age: 21,                                  // Number / Int
//     height: 5.8,                              // Double
//     isStudent: true,                          // Boolean
//     createdAt: new Date(),                    // Date
//     skills: ["JavaScript", "MongoDB", "React"], // Array
//     address: {                                // Embedded Document / Object
//         city: "Bhavnagar",
//         state: "Gujarat"
//     },
//     middleName: null,                         // Null
//     usernamePattern: /manas/i,                // Regular Expression
//     profileImage: BinData(0, "SGVsbG8="),     // Binary Data
//     lastLogin: Timestamp(),                   // Timestamp
//     accountBalance: NumberDecimal("15499.75"),// Decimal128 (accurate financial numbers)
//     youtubeSubscribers: NumberLong(250000),   // Long (64-bit integer)
//     minValue: MinKey(),                       // MinKey (lowest comparison value)
//     maxValue: MaxKey(),                       // MaxKey (highest comparison value)
// });

// 3. Drop existing collection if needed
// db.users.drop();

// 4. Create collection with JSON Schema Validator
// db.createCollection('users', {
//     validator: {
//         $jsonSchema: {
//             bsonType: 'object',
//             required: ['name', 'age'],
//             additionalProperties: false,
//             properties: {
//                 _id: {},
//                 name: {
//                     bsonType: 'string',
//                     description: 'Name must be a string and is required'
//                 },
//                 age: {
//                     bsonType: 'int',
//                     minimum: 18,
//                     maximum: 60,
//                     description: 'Age must be an integer between 18 and 60 and is required'
//                 },
//                 products: {
//                     bsonType: 'array',
//                     description: 'Optional list of products',
//                     items: {
//                         bsonType: 'object',
//                         required: ['productName', 'price'],
//                         additionalProperties: false,
//                         properties: {
//                             productName: {
//                                 bsonType: 'string',
//                                 description: 'Product name must be a string'
//                             },
//                             price: {
//                                 bsonType: 'number',
//                                 description: 'Price must be a number'
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     },
//     validationAction: 'error', // 'error': rejects write; 'warn': allows write and logs warning
//     validationLevel: 'strict'   // 'strict': validates all writes; 'moderate': skips existing invalid docs
// });

// 5. Validation Test Example:
// This will fail validation because age is passed as a string rather than an integer
db.users.insertOne({
    name: "Yash",
    age: "21"
});
