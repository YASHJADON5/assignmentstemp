const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User,Course}= require("../db/index")

// User Routes
router.post('/signup', async function (req, res) {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
      const existingUser= await User.findOne({
        username:username,
        password:password,

      });
    if(existingUser){
        
        res.status(404).send({msg:"user already exist"})
    }
    else{
        
        User.create({
            username:username,
            password:password
        })
        
        res.send({ message: 'User created successfully' })
    }
});

router.get('/courses', async (req, res) => {
    const username=req.headers.username;
    const password=req.headers.password;
    const response= await Course.find({});

    res.json({
     Course:response
    })
   

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const username=req.headers.username;
    const CourseId=req.params.courseId;
    
    await User.updateOne({
        username},{
             "$push":
             {purchasedCourses:CourseId}
        }
    )
    res.json({
        msg:"course purchased successfully"
    })


});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    
    const findUser= await User.findOne({
        username:req.headers.username
        
    })
    console.log(findUser);
   const courses= await Course.find({
     _id:
     {
         "$in":findUser.purchasedCourses 

     }
    

   })
    

   res.json({
    
    Courses: courses
   })


});

module.exports = router