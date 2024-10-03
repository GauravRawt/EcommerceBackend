const express = require("express")
const { default: mongoose, mongo } = require("mongoose")
const { PORT } = require("./configs/server.configs")
const { DB_URL } = require("./configs/db_configs")
const userModel = require("./models/userModel")
const bcrypt = require("bcryptjs")
const router = require("./route/userRoute")
const categoryRouter  = require("./route/categoryRoutes")

const app = express()

//connection of mongodb
mongoose.connect(DB_URL)
const db =mongoose.connection
db.on("error",()=>{
    console.log("Error connecting to mongodb");
})
db.once("open",()=>{
    console.log("Connected to MongoDB");
    init()
    
})

//
async function init(){
   try {
     let user = await userModel.findOne({userId : "123"})
     if(user){
         console.log("Admin is Already Present");
         return 
     }
 
   } catch (error) {
    console.log("Error While creating data");
    
   }
    try{
        user = await userModel.create({
            name : "Gaurav",
            userId : "123",
            password : bcrypt.hashSync("Welcome1",8),
            email : "dnnladnja@gmai.com",
            userType : "ADMIN"
            
        })
        console.log("Admin Created ",user);
    }catch(err){
        console.log("Error Wile creating an Admin",err);
    }
}

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//starting server
app.use("/api/v1/ecom",router)
app.use("/api/v1/ecom/category",categoryRouter)
app.listen(PORT,()=>{
    console.log("Server Started at port ", PORT )
})