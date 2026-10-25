// How to enable authorization:
// 1. Open your MongoDB configuration file (e.g., mongod.cfg on Windows)
// 2. Add:
//    security:
//      authorization: enabled
// 3. Restart the MongoDB service

// Switch to admin database
use('admin');

// 1. Create Root Super Admin User
db.createUser({
    user: 'admin',
    pwd: 'password123',
    roles: [
        {
            role: 'root',
            db: 'admin'
        }
    ]
});

// 2. Authenticate as Admin
db.auth('admin', 'password123');

// 3. Inspect existing users in the admin database
db.getUsers();

// 4. Switch to application database to create an app-specific user
// use('appdb');
// db.createUser({
//     user: 'appUser',
//     pwd: 'userPass123',
//     roles: [
//         { role: 'readWrite', db: 'appdb' }
//     ]
// });