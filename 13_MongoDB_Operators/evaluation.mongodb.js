
use("test")

// db.employess.insertMany(
//   [
//     {
//       name: "Yash",
//       salary: 12000,
//       bonus: 1300
//     },
//     {
//       name: "Sujal",
//       salary: 20000,
//       bonus: 5000
//     },
//     {
//       name: "Rahul",
//       salary: 100000,
//       bonus: 2500
//     },
//     {
//       name: "Jenil",
//       salary: 70000,
//       bonus: 13000
//     },
//     {
//       name: "Somil",
//       salary: 19000,
//       bonus: 1000
//     },
//     {
//       name: "Jatin",
//       salary: 100000,
//       bonus: 1000
//     }
//   ]
// )

// db.employees.updateOne(
//   {
//     name: "Yash"
//   },
//   {
//     $set: {
//       bonus: 14000
//     }
//   }
// )

// db.employees.find(
//   {
//     $expr: {
//       $gt: ['$salary', '$bonus']
//     }
//   }
// )

// db.employees.find(
//   {
//     $expr: {
//       $gt: [
//         {
//           $add: [
//             '$salary',
//             '$bonus'
//           ]
//         },
//         60000
//       ]
//     }
//   }
// )

// db.products.insertMany(
//   [
//     {
//       name: "Laptop",
//       price: 70000,
//       discountPrice: 55000
//     },
//     {
//       name: "Phone",
//       price: 30000,
//       discountPrice: 31000
//     },
//     {
//       name: "Tablet",
//       price: 20000,
//       discountPrice: 4500
//     },
//     {
//       name: "Headphones",
//       price: 5000,
//       discountPrice: 4500
//     }
//   ]
// )

// db.products.find({
//   $expr: {
//     $gt: [
//       '$discountPrice', '$price'
//     ]
//   }
// })


// db.orders.insertMany([
//   {
//     product: "Mouse",
//     stock: 50,
//     sold: 30
//   },
//   {
//     product: "Keyword",
//     stock: 40,
//     sold: 45
//   },
//   {
//     product: "Monitor",
//     stock: 15,
//     sold: 15
//   },
//   {
//     product: "Printer",
//     stock: 15,
//     sold: 15
//   }
// ])

// db.orders.find({
//   $expr: {
//     $gt: ['$stock', '$sold']
//   }
// })



// db.students.insertMany(
//   [
//     {
//       name: "Yash",
//       maths: 80,
//       science: 70
//     },
//     {
//       name: "Anita",
//       maths: 60,
//       science: 75
//     },
//     {
//       name: "Karan",
//       maths: 90,
//       science: 85
//     },
//     {
//       name: "Pooja",
//       maths: 50,
//       science: 65
//     }
//   ]
// )

// db.students.find(
//   {
//     $expr: {
//       $gt: ['$maths', '$science']
//     }
//   }
// )



// db.students.find({
//   name: {
//     $regex: 'ar'
//   }
// })


// db.students.find({
//   name: {
//     $regex: '^Y'
//   }
// })


// db.students.find({
//   name: {
//     $regex: 'h$'
//   }
// })

// db.students.find({
//   name: {
//     $regex: '^y',
//     $options: 'i'
//   }
// })

// db.students.find({
//   name: /^y/i
// })


// db.numbers.insertMany([
//   {value: 10},
//   {value: 2},
//   {value: 5},
//   {value: 7},
//   {value: 100},
//   {value: 350},
//   {value: 2000},
//   {value: 178},
//   {value: 209},
//   {value: 19},
// ])


// db.numbers.find()

db.numbers.find({
  value: {
    $mod: [2, 0]
  }
})





