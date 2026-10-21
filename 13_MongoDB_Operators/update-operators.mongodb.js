use("e-commerce")

// db.products.updateMany(
//   {},
//   {
//     $set: {
//       price: 0
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $unset: {
//       price: 0
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $inc: {
//       stock: 10
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $inc: {
//       stock: -10
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $mul: {
//       stock: 2
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $rename: {
//       satock: 'stock'
//     }
//   }
// )

// If greater than 100 then make it 100
// db.products.updateMany(
//   {},
//   {
//     $min: {
//       stock: 100
//     }
//   }
// )

// If less than 100 then make it 100
// db.products.updateMany(
//   {},
//   {
//     $max: {
//       stock: 100
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $max: {
//       stock: 100
//     }
//   }
// )

// db.products.updateMany(
//   {},
//   {
//     $push:{
//       tags: 'ysh'
//     }
//   }
// )

// db.products.updateMany(
// {},
// {
//   $pull:{
//     tags: 'ysh'
//   }
// }
// )

// db.products.updateMany(
//   {},
//   {
//     $addToSet:{
//       tags: 'ysh'
//     }
//   }
// )

db.products.find({}, { tags: 1 })





