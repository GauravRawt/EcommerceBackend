const express = require("express")
const createNewCategory = require("../controller/categoryController")
const { verifyToken,isAdmin } = require("../middleware/authMiddleware")
const categoryRouter = express.Router()
 
categoryRouter.post("/createcategory",verifyToken,isAdmin,createNewCategory)

module.exports = categoryRouter