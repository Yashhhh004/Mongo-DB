use("test")

// db.products.insertMany([
//     {
//         name: "Gaming Laptop",
//         price: 75000,
//         category: "electronics",
//         stock: 15,
//         discount: 10,
//         tags: ["gaming", "laptop", "electronics"]
//     },
//     {
//         name: "Smartphone",
//         price: 25000,
//         category: "electronics",
//         stock: 8,
//         discount: 15,
//         tags: ["phone", "android", "electronics"]
//     },
//     {
//         name: "Wireless Mouse",
//         price: 800,
//         category: "accessories",
//         stock: 50,
//         discount: 5,
//         tags: ["mouse", "computer", "electronics"]
//     },
//     {
//         name: "Mechanical Keyboard",
//         price: 3500,
//         category: "accessories",
//         stock: 20,
//         discount: 12,
//         tags: ["keyboard", "gaming", "computer"]
//     },
//     {
//         name: "LED Monitor",
//         price: 12000,
//         category: "electronics",
//         stock: 5,
//         discount: 18,
//         tags: ["monitor", "display", "electronics"]
//     },
//     {
//         name: "Office Chair",
//         price: 6000,
//         category: "furniture",
//         stock: 0,
//         discount: 20,
//         tags: ["chair", "office", "furniture"]
//     },
//     {
//         name: "Gaming Headset",
//         price: 4500,
//         category: "electronics",
//         stock: 12,
//         discount: 25,
//         tags: ["gaming", "audio", "electronics"]
//     }
// ])


// Q. 26
// db.products.find({
//     price: {
//         $gt: 1000
//     }
// })


// Q. 27
// db.products.find({
//     price: {
//         $gte: 500,
//         $lte: 2000
//     }
// })


// Q. 28
// db.products.find({
//     category: "electronics"
// })


// Q. 29
// db.products.find({
//     stock: {
//         $lt: 10
//     }
// })


// Q. 30
// db.products.find({
//     stock: {
//         $lte: 0
//     }
// })


//Q. 31
//db.products.find().sort({ price: 1 })


// Q. 32
// db.products.find().sort({ price: -1 }).limit(5)


// Q.33
// db.products.find({
//     name: /phone/
// })


// Q. 34
// db.products.find({
//     discount : {
//         $gt: 20
//     }
// })


// Q. 35
// db.products.find({
//     category: {
//         $ne: 'electronics'
//     }
// })


// Q. 36
// db.products.find({
//     tags: {
//         $in : ['gaming']
//     }
// })


// Q. 37
// db.products.find({
//     tags: { $all: ['gaming', 'laptop'] }
// })

// db.products.find({
//     $expr: {
//         $and: [
//             { $in: ["gaming", "$tags"] },
//             { $in: ["laptop", "$tags"] }
//         ]
//     }
// })


// Q. 38
// db.products.find({
//     tags: {$size : 3}
// })

// db.products.find({
//     $expr: {
//         $eq: [
//             { $size: "$tags" },
//             3
//         ]
//     }
// })


// Q. 39
// db.products.updateMany(
//     {},
//     {
//         $push: { tags: "new" }
//     }
// )

// db.products.updateMany(
//     {},
//     {
//         $push: { tags: ["old"] }
//     }
// )


// Q. 40

// db.products.updateMany({}, {
//     $pull : {
//         tags: ["old"]
//     }
// })

// db.products.updateMany({}, {
//     $pull : {
//         tags: "new"
//     }
// })


// db.orders.insertMany([
//     {
//         user: "Rahul Sharma",
//         totalAmount: 80000,
//         status: "delivered",
//         orderDate: new Date("2025-02-10")
//     },
//     {
//         user: "Priya Singh",
//         totalAmount: 3000,
//         status: "pending",
//         orderDate: new Date("2025-03-01")
//     },
//     {
//         user: "Amit Verma",
//         totalAmount: 15000,
//         status: "cancelled",
//         orderDate: new Date("2024-12-15")
//     },
//     {
//         user: "Rahul Sharma",
//         totalAmount: 4500,
//         status: "delivered",
//         orderDate: new Date("2025-01-20")
//     },
//     {
//         user: "Sneha Gupta",
//         totalAmount: 1200,
//         status: "pending",
//         orderDate: new Date("2025-03-05")
//     }
// ])


// Q. 41
// db.orders.find({
//     user: "Rahul Sharma"
// })


// Q. 42
// db.orders.find({
//     totalAmount: {
//         $gt: 5000
//     }
// })


// Q. 43
// db.orders.find({
//     orderDate : {
//         $gt : new Date('2025-01-01')
//     }
// })


// Q. 44
// db.orders.find({
//     status: "delivered"
// })


// Q. 45
// db.orders.find({
//     status: {
//         $ne : "cancelled"
//     }
// })


// Q. 46
// db.products.updateMany({},
//     [
//         {
//             $set: {
//                 price: { $multiply: ["$price", 1.1] }
//             }
//         }
//     ]
// )


// Q. 47
// db.products.updateMany({},
//     {
//         $inc: {
//             stock: 50
//         }
//     }
// )


// Q. 48
// db.products.updateMany(
//     {},
//     {
//         $rename: {"price": "productPrice"}
//     }
// )


// Q. 49
// db.products.updateMany(
//     {},
//     {
//         $unset: { "discount" : ""}
//     }
// )


// Q. 50
// db.products.updateMany({}, 
//     {
//         $set: {"featured": true}
//     }
// )


// Q. 51
// db.products.deleteMany({
//     stock: {
//         $eq: 0
//     }
// })


// Q. 52
// db.users.deleteMany({
//     orders: {
//         $size: 0
//     }
// })


// Q. 53
// db.orders.deleteMany({
//     orderDate: {
//         $lt: new Date(new Date().setFullYear(new Date().getFullYear() - 5))
//     }
// })

//  db.blogs.insertMany([
//     {
//         title: "MongoDB Basics",
//         views: 120,
//         comments: [
//             { user: "Rahul", text: "Great tutorial" },
//             { user: "Amit", text: "Very helpful" }
//         ]
//     },
//     {
//         title: "JavaScript Async Guide",
//         views: 300,
//         comments: [
//             { user: "Priya", text: "Awesome explanation" }
//         ]
//     },
//     {
//         title: "Node.js Performance Tips",
//         views: 80,
//         comments: []
//     }
// ])


// Q. 54
// db.blogs.updateMany({},
//     {
//         $inc: {
//             views: 1
//         }
//     }
// )


// Q. 55

// db.blogs.updateMany({}, 
//     {
//         $push: {
//             comments: {
//                 user: "Yash",
//                 text: "need help from me ?"
//             }
//         }
//     }
// )


// Q. 56
// db.blogs.updateOne({},
//     {
//         $pull: {
//             comments: {
//                 user: "Yash",
//                 text: "need help from me ?"
//             }
//         }
//     }
// )


// Q. 57
// db.users.updateOne(
//     {
//         name: 'Amit Verma'
//     },
//     {
//         $push: {
//             wishlist: {
//                 id: 101
//             }
//         }
//     }
// )

// Q. 58
// db.users.updateOne(
//     {
//         name: 'Amit Verma'
//     },
//     {
//         $pull: {
//             wishlist: {
//                 id: 101
//             }
//         }
//     }
// )


// Q. 59
// db.users.updateOne(
//     {},
//     {
//         $push: {
//             cart: {
//                 productId: ObjectId('7bd6e9ee4b80d5e8dfd343e4'),
//                 name: 'Gaming Laptop',
//                 price: 75000,
//                 quantity: 1
//             }
//         }
//     }
// )


// Q. 60
// db.users.updateOne(
//     {}, 
//     {
//         $pull: {
//            cart: { productId: ObjectId('7bd6e9ee4b80d5e8dfd343e4') }
//         }
//     }
// )







