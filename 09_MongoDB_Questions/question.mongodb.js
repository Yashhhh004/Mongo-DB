// Level 1

// show('dbs')

// use('shopApp')

// db.createCollection("users")

// Level 2

// db.users.insertOne({
//   name: "Manan",
//   email: "Manan@gmail.com",
//   city: "Trier",
//   age: 22
// })

// db.users.insertMany(
//   [
//     {
//       name: "Ronak",
//       email: "ronak@gmail.com",
//       city: "Amreli",
//       age: 22
//     },
//     {
//       name: "Yagna",
//       email: "yagna@gmail.com",
//       city: "Liliya",
//       age: 19
//     },
//     {
//       name: "Ashish",
//       email: "ashish@gmail.com",
//       city: "Vadodra",
//       age: 22
//     },
//   ]
// )

// db.users.find()
// db.users.find({city: "Surat"})


// Level : 3


// use("e-commerce")

// db.createCollection("products")

// db.products.insertMany(
//   [
//     {
//       name : "i phone",
//       price : "150000",
//       category : "Electronic Device",
//       stock : 20
//     },
//     {
//       name : "Laptop",
//       price : "400000",
//       category : "Electronic Device",
//       stock : 10
//     },
//     {
//       name : "Headphones",
//       price : "1500",
//       category : "Electronic Device",
//       stock : 40
//     },
//     {
//       name : "Shoes",
//       price : "2000",
//       category : "Sports",
//       stock : 40
//     }
//   ]
// )

// db.products.find()
// db.products.find({category : "Electronic Device"})
// db.products.countDocuments();


// Level 4

// use('shopApp')
// use('e-commerce')

// db.users.updateOne({ name: "Ashish" }, { $set: {city: "Surat"} })
// db.users.updateOne({ name: "Manan" }, { $set: {email: "manan@gmail.com"} })

// db.users.find()

// db.products.updateOne(
//   { name: "i phone" },
//   {
//     $set:
//       {
//         price: "200000"
//       }
//   }
// )


// db.products.updateMany(
//   {
//     category: "Electronic Device"
//   },
//   {
//     $inc: {
//       stock: 2
//     }
//   }
// )

// db.products.find()


// Level 5

// use('shopApp')
// use('e-commerce')


// db.users.deleteOne({ name: "Ashish" })
// db.users.find()

// db.users.deleteMany({ age: { $lt: 20 } })
// db.users.find()

// db.products.deleteOne({ name: "Headphones" })
// db.products.find()


// Level 6

// use('shopApp')
// use('e-commerce')

// db.users.find({ age: { $gt: 20 } })
// db.users.find({ name: "Yash" })
// db.users.find({ city: "Surat" })
// db.users.countDocuments({ city: "Surat" })

// db.products.find({ price: { $lt: 5000 } })

// show('collections')


// Level 7

use("instagramClone")

// db.createCollection('users')
// db.createCollection('posts')

// db.users.insertOne({
//   name: "Yash",
//   mail: "yash@mail.com"
// })

// db.users.insertOne({
//   name: "Manan",
//   mail: "manan@mail.com"
// })

// db.users.find()

// db.posts.insertOne(
//   {
//     title: "Post 1",
//     caption: "Caption 1 for post 1",
//     author: ObjectId("6acf7ca2e954017e457f7d60")
//   }
// )

// db.posts.insertMany(
//   [
//     {
//       title: "Post 2",
//       caption: "Caption 2 for post 2",
//       author: ObjectId("6acf7ca2e954017e457f7d5f")
//     },
//     {
//       title: "Post 3",
//       caption: "Caption 3 for post 3",
//       author: ObjectId("6acf7ca2e954017e457f7d5f")
//     },
//     {
//       title: "Post 4",
//       caption: "Caption 4 for post 4",
//       author: ObjectId("6acf7ca2e954017e457f7d5f")
//     }
//   ]
// )

// db.posts.updateOne(
//   {
//     _id: ObjectId("6acf7e79c24b8d09c12f6ddb")
//   },
//   {
//     $set: {
//       caption: "Post Updated By Manan"
//     }
//   }
// )

// db.posts.deleteOne({_id : ObjectId('6acf7e1fb04794cc0d6de04a')})

// db.posts.find(
//   {
//     author: ObjectId('6acf7ca2e954017e457f7d5f')
//   }
// );





















