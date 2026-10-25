use('bank');

// 1. Initial Setup: Create demo accounts
// db.accounts.drop();
// db.accounts.insertMany([
//     { _id: 1, name: "Yash", balance: 5000 },
//     { _id: 2, name: "Kashish", balance: 3000 }
// ]);

// ----------------------------------------------------
// SCENARIO 1: WITHOUT TRANSACTION (Vulnerable to Partial Failure)
// ----------------------------------------------------
// try {
//     db.accounts.updateOne({ name: "Yash" }, { $inc: { balance: -500 } });
//     console.log("Money deducted from Yash");
//
//     // Simulating an unexpected server failure before second update:
//     throw new Error("Server crashed unexpectedly!");
//
//     db.accounts.updateOne({ name: "Kashish" }, { $inc: { balance: 500 } });
//     console.log("Money credited to Kashish");
// } catch (err) {
//     console.error("Operation failed without transaction. Yash lost $500, but Kashish never received it!");
// }

// ----------------------------------------------------
// SCENARIO 2: WITH TRANSACTION (Atomic - All or Nothing)
// Note: Requires a replica set environment to run
// ----------------------------------------------------
const session = db.getMongo().startSession();

try {
    session.startTransaction({
        readConcern: { level: 'snapshot' },
        writeConcern: { w: 'majority' }
    });

    const accounts = session.getDatabase('bank').accounts;

    // Step 1: Deduct from Yash
    accounts.updateOne(
        { name: "Yash" },
        { $inc: { balance: -500 } }
    );
    console.log("Deducted $500 from Yash");

    // Uncomment the line below to test rollback on error:
    // throw new Error("Simulated network timeout during transfer!");

    // Step 2: Credit to Kashish
    accounts.updateOne(
        { name: "Kashish" },
        { $inc: { balance: 500 } }
    );
    console.log("Credited $500 to Kashish");

    // Step 3: Commit the transaction
    session.commitTransaction();
    console.log("Transaction committed successfully. Both accounts updated atomically.");
} catch (error) {
    session.abortTransaction();
    console.log("Transaction aborted due to error. No account balances were changed:", error.message);
} finally {
    session.endSession();
}

// Check final balances
db.accounts.find();