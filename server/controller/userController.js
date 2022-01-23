const User = require("./../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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