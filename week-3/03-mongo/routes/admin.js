const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const router = Router();
const {Course}=require("../db/index")

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password=req.body.password;
    Admin.create({
        username:username,
        password:password
    })
    .then((value)=>{
        if(value){
            res.json({ message: 'Admin created successfully' })
        }
    })
    .catch((err)=>{

        res.json({ message: 'Admin not created successfully' })
    })
       

        
    

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
  
    
    const title= req.body.title;
    const description=req.body.description;
    const price= req.body.price;
    const imageLink=req.body.imageLink;

    Course.create({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })
    .then((value)=>{
        res.json({
            msg:"course created successfully",
            courseId: value._id
        })
    })

    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
   const response= await Course.find({});

   res.json({
    Course:response
   })

});

module.exports = router;