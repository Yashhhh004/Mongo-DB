use('testDb')

// db.createCollection('users')


db.users.insertMany(
  [
    {
      _id: 1,
      name: "Yash"
    },
    {
      _id: 2,
      name: "Manan"
    },
    {
      _id: 1,
      name: "Jenil"
    },
    {
      _id: 3,
      name: "Meet"
    },
  ], 
  {
    ordered : false
  }
)



// db.users.insertMany(
//   [
//     {
//       _id: 1,
//       name: "Yash"
//     },
//     {
//       _id: 2,
//       name: "Manan"
//     },
//     {
//       _id: 1,
//       name: "Jenil"
//     },
//     {
//       _id: 3,
//       name: "Meet"
//     },
//   ]
// )