// Modern ES Module Syntax (requires "type": "module" in package.json)
import express from 'express';

const app = express();
const PORT = 8000;

// Middleware: Automatically parses incoming JSON request bodies into req.body
app.use(express.json());

// 1. GET Route: Fetch sample users
app.get('/', (req, res) => {
    const sampleUsers = [
        { id: 1, name: "Yash", age: 20 },
        { id: 2, name: "Kashish", age: 20 },
        { id: 3, name: "Manan", age: 23 }
    ];

    res.status(200).json({
        success: true,
        data: sampleUsers
    });
});

// 2. POST Route: Create a new user with request body validation
app.post("/create-user", (req, res) => {
    const { name, age } = req.body;

    if (!name || age === undefined) {
        return res.status(400).json({
            success: false,
            message: "Both 'name' and 'age' are required fields."
        });
    }

    res.status(201).json({
        success: true,
        message: "User Created Successfully!",
        data: {
            name,
            age
        }
    });
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
