use("test")

// db.getCollectionNames()

// db.students.drop()

// db.students.insertMany([
//   {
//     name: "Yash",
//     skills: ['HTML', 'CSS', 'JavaScript'],
//     marks: [70, 80, 90]
//   },
//   {
//     name: "Priya",
//     skills: ['Python', 'Java'],
//     marks: [60, 75]
//   },
//   {
//     name: "Amit",
//     skills: ['JavaScript', 'Node.Js', 'MongoDB'],
//     marks: [85, 88, 92]
//   }
// ])


// ALL Operator
// db.students.find({
//   skills: {
//     $all: ['JavaScript', 'Node.Js']
//   }
// })

// db.students.find({
//   skills: {
//     $all: ['HTML', 'CSS']
//   }
// })


// SIZE 
// db.students.find({
//   skills: {
//     $size: 3
//   }
// })


// IN
// db.students.find({
//   skills: {
//     $in: ['JavaScript', 'Node.Js']
//   }
// })

// NIN
// db.students.find({
//   skills: {
//     $nin: ['JavaScript', 'Node.Js']
//   }
// })

// db.products.insertMany([
//     {
//     name:"Laptop",
//     reviews:[
//             {user:"Rahul", rating:4},
//             {user:"Amit", rating:5}
//         ]
//     },
//     {
//     name:"Mobile",
//     reviews:[
//             {user:"Priya", rating:3},
//             {user:"Ankit", rating:4},
//             {user:"Rahul", rating:5},
//         ]
//     }
// ])

// Wrong
// db.products.find({
//   'reviews.user': 'Rahul',
//   'reviews.rating': 5
// })

db.products.find({
  reviews: {
    $elemMatch: {
      user: 'Rahul',
      rating: 5
    }
  }
})


















