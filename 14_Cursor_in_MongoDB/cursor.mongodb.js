use('test')

// let arr = [];

// for (let i = 1; i <= 100; i++) {

//   arr.push({ value: i })
// }

// db.data.insertMany(
//   arr
// )

// const cursor = db.data.find()

// console.log(cursor)
// console.log(cursor.next())
// console.log(cursor.next())
// console.log(cursor.next())
// console.log(cursor.hasNext())

// while(cursor.hasNext()){
//   console.log(cursor.next())
// }

// db.data.find().sort({ value: 1 })
// db.data.find().sort({ value: -1 })

// db.data.find().limit(5)
// db.data.find().skip(90)

// const data = db.data.find().sort({ value: -1 }).skip(5).limit(5)
// console.log(data)

let page = 1
let limit = 10
let skip = (page - 1) * limit

let data = db.data.find().skip(skip).limit(limit)

console.log(data)









