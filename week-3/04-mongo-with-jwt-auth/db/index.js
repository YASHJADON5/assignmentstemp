const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb+srv://jadonyash2:Yash%40%4052425242@cluster0.ko4pxkf.mongodb.net/assignment-2");

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    purchasedCourses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses"
    }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description:String,
    imageLink:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}