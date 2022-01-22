const jwt = require("jsonwebtoken")

//Middleware for auth
const verifyToken =(req,res,next) =>{
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if(!token){
        return res.status(403).send("Token Required for Auth")  
    }
    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded
    }catch(err){
        res.status(400).json(err.message);
    }
}

module.exports = verifyToken