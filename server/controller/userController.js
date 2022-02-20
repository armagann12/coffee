const User = require("./../model/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.getAllUsers = async (req, res) =>  {
    try{
        const users =await User.find()
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message: err.message})
      }
  };

exports.getUser = async (req, res) =>  {
    try{
        const user= await User.findById(req.params.id)
        res.json(user);
    }catch(err){
        res.status(500).json({err})
    }
};

exports.updateUser = async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            name: req.name,
            describtion: req.describtion
        })
        
        res.json("Updated")
    }catch(err){
        res.status(400).json(err.message);
    }
}


exports.deleteUser = async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: "Deleted"
          });
    }catch(err){
        res.status(400).json(err.message);
    }
}
