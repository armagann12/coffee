const mongoose = require("mongoose")

const shopSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    describtion:{
        type:String,
    },
    shopImages:{
        type: [String]
    },
    menuImage:{
        type: String
    }
})

const Shop = mongoose.model("Shop", shopSchema)

module.exports = Shop