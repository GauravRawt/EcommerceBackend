const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt =require("jsonwebtoken");
const { SECRET_KEY } = require("../configs/db_configs");

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

const login =async (req,res) =>{
    try {
        body = req.body
        user  = await userModel.findOne({userId : body.userId})
        if(user == null){
            return res.status(400).send({
                message : "User ID not found"
            })
        }
        const pass = bcrypt.compareSync(body.password,user.password)
        if(!pass){
            return res.status(401).send({
                message : " Password is not valid"
            })
        }

        const token = jwt.sign(body,SECRET_KEY,{expiresIn : 120})

        res.status(200).send({
            name : user.name,
            userId : user.userId,
            userType : user.userType,
            email : user.email,
            token : token
        })


    } catch (error) {
        console.log("Error found : " ,error)
    }
}




module.exports = {signup,login}