const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const { SECRET_KEY } = require("../configs/db_configs")

const verifySignupBody =async (req,res,next)=>{
    try {
        body = req.body
        if(!body.name){
            res.status(500).send({
                Message: "Name Was not found"
            })
            return
        }
        if(!body.email){
            res.status(500).send({
                Message: "Email Was not found"
            })
            return
        }
        if(!body.userId){
            res.status(500).send({
                Message: "userID Was not found"
            })
            return
        }

        const user = await userModel.findOne({userId : body.userId})
        if (user){
            return res.status(500).send({
                message : "UserID already found"
            })
        }

        const email = await userModel.findOne({email : body.email})
        if (email){
            return res.status(500).send({
                message : "Email already found"
            })
        }

        next()
    } catch (error) {
        console.log("Error ehile Signup",error);
        res.status(500).send({
            message : "Error while validating",
            error : error
        })
    }
}

const verifyLoginBody =(req,res,next)=>{
    body = req.body
    if(body.userId == null){
        return res.status(400).send({
            message : "UserID not Entered"
        })
    }

    if(body.password == null){
        return res.status(400).send({
            message : "Password not Entered"
        })
    }
    next()
}

const verifyToken = (req,res,next) =>{
    tokencheck= req.headers['authorization']
    token = tokencheck.split(" ")[1]
    if(!token){
        res.status(403).send({
            message : "NO token Found"
        })
    }
    jwt.verify(token,SECRET_KEY,async (err,decode)=>{
        if(err){
            return res.status(401).send({
                message : "Unauthorized",
                err : err
            })
        }
        const user = await userModel.findOne({userId : decode.userId})
        if(!user){
            return res.status(401).send({
                message: "User Not present"
            })
        }
        next()
    })

    
}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    }
    else{
        return res.json({
            message : "only ADMIN users are allowd"
        })
    }
}

module.exports ={ verifySignupBody , verifyLoginBody , verifyToken,isAdmin}


