
const Jwt_Secret=require("../config")
const Jwt=require("jsonwebtoken");
async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    
    const token= req.headers.authorization;
    const words= token.split(" ");
    const jwttoken=words[1];
    const verify= await Jwt.verify(jwttoken,Jwt_Secret);
    
    if(verify){
        req.username=verify;
        next();
    }
    else{
        console.log(verify.username)
        res.json({
            message:"you are not authorized"
        })
    }


}

module.exports = userMiddleware;