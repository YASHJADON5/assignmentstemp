// Middleware for handling auth

const Jwt_Secret=require("../config")
const Jwt=require("jsonwebtoken");
 async function adminMiddleware (req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token= req.headers.authorization;
    const words= token.split(" ");
    const jwttoken=words[1];
    const verify= await Jwt.verify(jwttoken,Jwt_Secret);
    
    if(verify){
        next()
    }
    else{
        console.log(verify.username)
        res.json({
            message:"you are not authorized"
        })
    }


}

module.exports = adminMiddleware;