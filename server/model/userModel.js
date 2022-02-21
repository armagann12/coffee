const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    //password shouldnt be visible in database
    name:{
        type:String,
        required: true
    },
    decribtion:{
        type:String
    },
    image:String,
    email:{
        type:String, 
        required:true,
        index: {
            unique:true
        }
    },
    password:{
        type: String,
        required: true,
        select: false
        //password managment uygula
    },
    role:{
        type: String,
        enum: ["user", "owner", "admin"],   
        default: "user"
        //user + owner + admin
    },
    token:{
        type: String
    },
    shop:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }]
})

const User = mongoose.model("User", userSchema)

module.exports = User