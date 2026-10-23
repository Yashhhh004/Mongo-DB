use('test');

// ==========================================
// 1. EMBEDDING (DENORMALIZED DATA MODEL)
// ==========================================

// Insert a student with embedded courses
db.students.insertOne({
  _id: 1,
  name: "Rahul Sharma",
  email: "rahul@example.com",
  courses: [
    {
      courseId: 101,
      name: "BCA",
      price: 12000,
      duration: 3
    },
    {
      courseId: 102,
      name: "Full Stack Web Dev",
      price: 15000,
      duration: 6
    }
  ]
});

// Query all students
db.students.find();

// Query using Dot Notation on embedded field
db.students.find({ "courses.name": "BCA" });

// Add a new course to an embedded array ($push)
db.students.updateOne(
  { _id: 1 },
  {
    $push: {
      courses: {
        courseId: 103,
        name: "Data Structures",
        price: 8000,
        duration: 2
      }
    }
  }
);

// Update a specific embedded course price ($ positional operator)
db.students.updateOne(
  { _id: 1, "courses.courseId": 101 },
  {
    $set: { "courses.$.price": 14000 }
  }
);

// Remove an embedded course from array ($pull)
db.students.updateOne(
  { _id: 1 },
  {
    $pull: { courses: { courseId: 103 } }
  }
);


// ==========================================
// 2. REFERENCING (NORMALIZED DATA MODEL)
// ==========================================

// Insert course documents into courses collection
db.courses.insertMany([
  { _id: 201, title: "React Masterclass", fee: 4999 },
  { _id: 202, title: "Node.js & MongoDB", fee: 5999 }
]);

// Insert student document holding reference IDs
db.users.insertOne({
  _id: 10,
  name: "Sneha Verma",
  enrolledCourseIds: [201, 202]
});

// Query student and join course details using $lookup
db.users.aggregate([
  {
    $match: { _id: 10 }
  },
  {
    $lookup: {
      from: "courses",
      localField: "enrolledCourseIds",
      foreignField: "_id",
      as: "enrolledCourses"
    }
  }
]);
