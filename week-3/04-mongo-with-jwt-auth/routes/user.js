const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User}=require("../db")
const Jwt =require("jsonwebtoken");
const Jwt_Secret=require("../config")
const {Course}=require("../db/index")
// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username =req.body.username;
    const password =req.body.password;
    const userFind= await User.findOne({
        username,
        password
    })
    if(userFind){
        res.json({
            message:"user already exist"
        })
    }
    else{

        const createUser = await User.create({
            username,
            password
        })
        res.json({
            message:"user created successfully"
        })

    }


});

router.post('/signin', async (req, res) => {
     
    // Implement admin signup logic
        const username=req.body.username;
        const password=req.body.password;
        const findUser=User.findOne({
            username,
            password
        })
        if(findUser){
            const jwt_token= await Jwt.sign(username,Jwt_Secret);
            res.json({
                token:jwt_token
            })
        }
        else{
            res.json({
                message:"user does not exist"
            })
        }
     

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const jsontoken= req.headers.authorization;

    const words=jsontoken.split(" ");
    const token=words[1];
    const tokenVerification= await Jwt.verify(token,Jwt_Secret);

    if(tokenVerification){
        const courses=await Course.find({});
        res.json({
            Courses:courses
        })
    }
    else{
        res.json({
            message:"token is not correct"
        })
    }

});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    // Implement course purchase logic
    const courseId= req.params.courseId;
    const username= req.username;
     console.log(username);
   await User.updateOne({
       username    
   },{
    "$push":
      {purchasedCourses:courseId}
   })

   res.json({
    message:"course purchased successfully"
   })

});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const jwt_token=req.headers.authorization;
    const words=jwt_token.split(" ");
    const jwtoken= words[1];
    const token=Jwt.verify(jwtoken,Jwt_Secret);
    const username=token;
    console.log(username);
    const findUser=await User.findOne({

        username
    }
    )
    console.log(findUser);
    const courses= await Course.find({
        _id:
        {
            "$in":findUser.purchasedCourses
        }
    })
    res.json({
        courses
    })

});

module.exports = router