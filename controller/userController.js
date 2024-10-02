const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const signup = async (req,res)=>{
    const body = req.body;
    const user_obj = {
        name : body.name,
        userId : body.userId,
        userType : body.userType,
        email : body.email,
        password : bcrypt.hashSync(body.password,8)
    }
    try{
        const user_Created = await userModel.create(user_obj)
        res.status(201).send(user_Created)
    }catch(error){
        console.log("Error while creating data", error)
        res.status(500)
    }
}   

module.exports = {signup}