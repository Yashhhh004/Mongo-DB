use('mydb')

// Logical Operators: $and, $or, $not, $nor

db.products.find(
    {
        $nor: [
            {
                category: "beauty",
            },
            {
                price: {
                    $gt: 10
                }
            }
        ]
    },
    {
        title: 1,
        category: 1,
        price: 1
    },
)

// NOT
// db.products.find(
//     {
//         $or: [
//             {
//                 category: "beauty",
//             },
//             {
//                 price: {
//                     $not: {
//                         $lt: 12.99
//                     }
//                 }
//             }
//         ]
//     },
//     {
//         title: 1,
//         category: 1,
//         price: 1
//     },
// )

// OR
// db.products.find(
//     {
//         $or: [
//             {
//                 category: "beauty",
//             },
//             {
//                 price: {
//                     $lt: 12.99
//                 }
//             }
//         ]
//     },
//     {
//         title: 1,
//         category: 1,
//         price: 1
//     },
// )


// DEFAULT MONGO TAKE AND OPERATOR
// db.products.find(
//     {
//         category: "beauty",
//         price: {
//             $lt: 12.99
//         }
//     },
//     {
//         title: 1,
//         category: 1,
//         price: 1
//     },
// )

// LOGICAL AND
// db.products.find(
//     {
//         $and: [
//             {
//                 category: "beauty"
//             },
//             {
//                 price: {
//                     $lt: 12.99
//                 }
//             }
//         ]
//     },
//     {
//         title: 1,
//         category: 1,
//         price: 1
//     },
// )






















































