use('mydb')

// NOT EQUAL TO
// db.products.find(
//   {
//     price: { $ne: 444 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )

// EQUAL TO
// db.products.find(
//   {
//     price: { $eq: 499.99 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )

// LESS THAN EQUAL
// db.products.find(
//   {
//     price: { $lte: 444 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )

// LESS THAN
// db.products.find(
//   {
//     price: { $lt: 444 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )

// GREATER THAN EQUAL
// db.products.find(
//   {
//     price: { $gte: 444 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )

// GREATER THAN
// db.products.find(
//   {
//     price: { $gt: 444 }
//   },
//   {
//     title: 1,
//     category: 1,
//     price: 1
//   }
// )