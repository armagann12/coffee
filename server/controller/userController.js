const User = require("./../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.loginUser = async(req, res) =>{
    try{
        //Get user input for valid
        const {email, password} =req.body;
        
        //Validate
        if(!(email && password)){
            res.status(400).send("Required")
        }

        //Check if user exist
        const user = await UserfindOne({email})

        if(user&&(await bcrypt.compare(password, user.password)) ){
            //Create Token
            const token = jwt.sign(
                {user_id:user._id, email},
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            )
            //Save user token
            user.token = token

            //User
            res.status(200).json(user)
        }
        res.status(400).send(Invalid)
    }catch(err){
        res.status(400).json(err.message);
    }
}


exports.registerUser = async(req, res) => {
    try{
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
        encryptedPassword = await bcrypt.hash(password, 10)

        //Create User
        const user = new User({                 //await User.create??
            email :email.toLowerCase(),
            password: encryptedPassword
        })              

        //Create Token
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        )
        
        //Save user token
        user.token= token

        //Return new user
        res.status(201).json(user)

        }
    }catch(err){
        res.status(400).json(err.message);
    }
}

exports.getUser = async (req, res) =>  {
    try{
        const user= await User.findById(req.params.id)
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message})
    }
};

exports.updateUser = async (req,res) => {
    try{
        const user = await User.findOneAndUpdate({
            name: req.name,
            describtion: req.describtion
        })
        res.json(user)
    }catch(err){
        res.status(400).json(err.message);
    }
}