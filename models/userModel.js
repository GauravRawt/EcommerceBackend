const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    name  : {
        type : String,
        required : true
    },
    userId  : {
        type : String,
        required : true,
        unique : true
    },
    password  : {
        type : String,
        required : true
    },
    email  : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    userType  : {
        type : String,
        required : true,
        default : "CUSTOMER",
        enum : ["CUSTOMER","ADMIN"]
    }

},{timestamps : true})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel