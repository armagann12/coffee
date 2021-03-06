const jwt = require("jsonwebtoken")
const User = require("./../model/userModel")
const bcrypt = require("bcrypt")
const {promisify} = require("util")

//Middleware for auth
exports.verifyToken = async (req,res,next) =>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        token = req.headers.authorization.split(" ")[1]
    }
    if(!token){
        return res.status(403).send("Token Required for Auth")  
    }

    try{
        const decoded = await promisify(jwt.verify)(token, process.env.TOKEN_KEY)
        req.user = decoded
        
    }catch(err){
        res.status(400).json(err.message);
    }
    next()
}

exports.loginUser = async(req, res) =>{
    try{
        //Get user input for valid
        const {email, password} =req.body;
        
        //Validate
        if(!(email && password)){
            res.status(400).send("Required")
        }

        //Check if user exist
        const user = await User.findOne({email})

        //await bcrypt.compare(password, user.password)) password first hash then bcrypt

        if(user&&password){
            //Create Token
            const token = jwt.sign(
                {id:user._id}, process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            )
            res.status(200).json({
                token
            })
        }
        res.status(400).send(Invalid)
    }catch(err){
        res.status(400)
    }
}


exports.registerUser = async(req, res) => {
    try{
        //Create User
        const newUser = await User.create({        
            name: req.body.name,         
            email : req.body.email,
            password: req.body.password
        })              

        //Create Token
        const token = jwt.sign(
            {id: newUser._id,}, process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        )
        //Return new user with token 
        res.status(201).json({
            token,
            data:{
                user: newUser
            }
        })
    }catch(err){
        res.status(400).json(err.message);
    }
}


exports.restrictTo = (...roles)=> {
    return async (req, res, next) =>{
        //Take the token from the header Bearer ... 
            //[1] token part
        const token = req.headers.authorization.split(" ")[1]
        //Decode the token
        const decoded_token = jwt.verify(token, process.env.TOKEN_KEY)
        //Take the tokens id part
        const user_id = decoded_token.id
        //Find the user by id
        const user = await User.findById(user_id)
        //Take the user Role
        const role = user.role
        //If the role equals to the restriction return continue else throw error
        if(roles[0] !== role){
            console.log("Not authorized")
            return next(res.status(400).json("Error"))
        }
    next()
    }
}



//register 


        /*
        //Get user input for valid
        const {email, password} =req.body;
        
        //Validate
        if(!(email && password)){
            res.status(400).send("Required")
        
        //Check if user exist
        const oldUser = await UserfindOne({email})
        if(oldUser){
            return res.status(409).send("User Already exist")
        }
        //Encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10)
        */