# 20 - Schema Validation in MongoDB

MongoDB is widely known as a schema-flexible document database. However, production applications often require data consistency, type enforcement, and mandatory field rules. Schema validation allows you to enforce strict rules at the database level.

---

## 1. Is MongoDB Really Schemaless?

**No, MongoDB is not strictly "schemaless" — it is schema-flexible.**

- **Flexible by default**: Different documents in the same collection can have different fields and data types. This allows rapid prototyping and easy updates as applications evolve.
- **Enforceable when needed**: MongoDB provides native **JSON Schema validation (`$jsonSchema`)**. When enabled, MongoDB acts like a schema-enforced database, rejecting or warning on writes that violate your rules.
- **Best of both worlds**: You get the flexibility of document storage combined with the data integrity and safety guarantees of a traditional relational schema.

---

## 2. Why Use Schema Validation?

1. **Data Integrity**: Ensures critical fields (like `email`, `price`, or `status`) are never omitted or corrupted with invalid data types.
2. **Database-Level Defense**: Prevents rogue scripts, bugs in backend code, or misconfigured clients from inserting bad data.
3. **Self-Documenting Models**: The collection validator acts as a clear contract for the structure of stored documents.
4. **Gradual Migration**: You can enforce rules strictly on new documents while allowing older legacy documents to exist without breaking.

---

## 3. The `$jsonSchema` Validator Structure

MongoDB uses the standard JSON Schema draft 4 specification with BSON data type extensions.

Key keywords include:
- `bsonType`: Specifies required BSON type (`string`, `int`, `double`, `bool`, `array`, `object`, `date`, `objectId`, etc.).
- `required`: Array of mandatory field names.
- `properties`: Object defining rules for each individual field.
- `additionalProperties`: If `false`, rejects any field not explicitly defined in `properties`.
- `minimum` / `maximum`: Defines numeric boundaries.
- `items`: Defines validation rules for elements inside an array.

---

## 4. Validation Actions and Validation Levels

When configuring validation, you can control how strictly MongoDB enforces the rules:

### Validation Actions (`validationAction`)
- **`error` (Default)**: Rejects the insert or update operation immediately and throws a validation error.
- **`warn`**: Allows the write operation to succeed, but logs a warning in the MongoDB server log. Useful when testing new validation rules in production.

### Validation Levels (`validationLevel`)
- **`strict` (Default)**: Applies validation rules to all inserts and updates.
- **`moderate`**: Applies validation rules to all inserts, but only validates updates on documents that *already* satisfy the validation rules. Existing invalid documents can still be updated without error.

---

## 5. Practical Implementation Examples

### Example 1: Creating a Validated Collection

```javascript
use('shop');

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'age'],
      additionalProperties: true, // allows extra fields if needed
      properties: {
        _id: {},
        name: {
          bsonType: 'string',
          description: 'Name must be a string and is required'
        },
        email: {
          bsonType: 'string',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          description: 'Email must be a valid email string and is required'
        },
        age: {
          bsonType: 'int',
          minimum: 18,
          maximum: 100,
          description: 'Age must be an integer between 18 and 100'
        },
        role: {
          enum: ['user', 'admin', 'moderator'],
          description: 'Role can only be user, admin, or moderator'
        }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});
```

### Example 2: Testing Validation Failure

```javascript
// This insert will FAIL because age is a string instead of an int
db.users.insertOne({
  name: 'Yash',
  email: 'yash@example.com',
  age: '21' // Error: Document failed validation
});

// This insert will SUCCEED
db.users.insertOne({
  name: 'Yash',
  email: 'yash@example.com',
  age: 21,
  role: 'admin'
});
```

### Example 3: Modifying Validation Rules on an Existing Collection

You do not need to drop the collection to update its schema rules. Use the `collMod` command:

```javascript
db.runCommand({
  collMod: 'users',
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email'],
      properties: {
        name: { bsonType: 'string' },
        email: { bsonType: 'string' }
      }
    }
  },
  validationAction: 'warn' // Switch to warn mode
});
```

---

## 6. Summary

- MongoDB is **schema-flexible**, allowing you to combine rapid document design with strict rules.
- Use `$jsonSchema` inside `db.createCollection()` or `collMod`.
- Use `validationAction: 'error'` to block invalid writes, or `'warn'` to log warnings.
- Keep validation focused on core business rules and data types without overcomplicating rules.
