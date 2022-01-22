const mongoose = require("mongoose")

const userSchema = new.mongoose.Schema({

    //password shouldnt be visible in database
    name:{
        type:String,
        required: true,
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
    },
    userRole:{
        type: String,
        enum: ["user", "owner", "admin"],   
        default: "user"
        //user + owner + admin
    },
    token:{
        type: String
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User