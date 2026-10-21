import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URI = "mongodb://localhost:27017/db1";

// Middleware to parse incoming JSON payloads
app.use(express.json());

// ----------------------------------------------------------------------------
// Database Connection
// ----------------------------------------------------------------------------
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected successfully! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

connectDB();

// ----------------------------------------------------------------------------
// Mongoose Schema & Model Definition
// ----------------------------------------------------------------------------
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [0, "Age cannot be negative"]
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

// ----------------------------------------------------------------------------
// CRUD API Routes
// ----------------------------------------------------------------------------

// 1. Root Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the MongoDB Express CRUD API!",
        endpoints: {
            getAllUsers: "GET /get-all-users",
            getSingleUser: "GET /get-single-user/:id (or ?id=...)",
            createUser: "POST /create-user",
            updateUser: "PUT /update-user/:id (or ?id=...)",
            deleteUser: "DELETE /delete-user/:id (or ?id=...)"
        }
    });
});

// 2. CREATE: Add a new user
app.post("/create-user", async (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name || age === undefined) {
            return res.status(400).json({
                success: false,
                message: "Please provide both 'name' and 'age'."
            });
        }

        const newUser = await User.create({ name, age });

        return res.status(201).json({
            success: true,
            message: "User created successfully!",
            data: newUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while creating user",
            error: error.message
        });
    }
});

// 3. READ: Get all users
app.get("/get-all-users", async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
});

// 4. READ: Get a single user by ID (supports route param /:id or query ?id=)
app.get(["/get-single-user/:id", "/get-single-user"], async (req, res) => {
    try {
        const id = req.params.id || req.query.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required in URL parameter or query (e.g. /get-single-user/:id or ?id=...)"
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: error.message
        });
    }
});

// 5. UPDATE: Update a user by ID (supports route param /:id or query ?id=)
app.put(["/update-user/:id", "/update-user"], async (req, res) => {
    try {
        const id = req.params.id || req.query.id;
        const { name, age } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to update a user."
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age },
            { new: true, runValidators: true } // Returns updated document & enforces schema validation
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
});

// 6. DELETE: Remove a user by ID (supports route param /:id or query ?id=)
app.delete(["/delete-user/:id", "/delete-user"], async (req, res) => {
    try {
        const id = req.params.id || req.query.id;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required to delete a user."
            });
        }

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: `User not found with id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
            deletedUserName: deletedUser.name
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
});

// ----------------------------------------------------------------------------
// Start Server
// ----------------------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`Server started successfully on: http://localhost:${PORT}`);
});
