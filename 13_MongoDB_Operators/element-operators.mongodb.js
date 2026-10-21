use("my-users")

// db.users.insertMany(
//   [
//     {
//       name: "Yash",
//       age: 20
//     },
//     {
//       name: "Chintan"
//     },
//     {
//       age: 44
//     },
//     {
//       name: "Sohang",
//       age: 25
//     },
//     {
//       name: "om",
//       age: '24'
//     },
//     {
//       name: "Ankur",
//       age: 22
//     }
//   ]
// )


// db.users.find()

// db.users.find(
//   {
//     age: {
//       $exists: true,
//     }
//   }
// )

db.users.find(
  {
    age: {
      $type: 'string',
    }
  }
)