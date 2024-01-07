const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const{Admin}=require("../db/index")
const Jwt= require("jsonwebtoken");
const Jwt_Secret=require("../config")
const {Course}=require("../db/index")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;

    Admin.create({
        username,
        password
    })
    .then((value)=>{
        res.json({
            message:"admin created successfully"
        })
    })
    .catch((err)=>{
        res.send(err);
    })



});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;

    const findUser=await Admin.findOne({
        username,
        password
    })

    if(findUser){

        const JWT= await Jwt.sign(username,Jwt_Secret)
        
        res.send(JWT);
    }
    else{
        res.json({
            message:"token not created"
        })
    }

    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price = req.body.price;

    const course=await Course.create({
        title:title,
        description:description,
        imageLink:imageLink,
        price:price

    })

    res.json({
        message:"course created successfully",
        courseId:course._id
    })


});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses= await Course.find({});
    res.json({
        courses
    })
});

module.exports = router;