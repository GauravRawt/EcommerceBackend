const categoryModel = require("../models/categoryModel");
const { create } = require("../models/userModel");

const createNewCategory = async (req,res) =>{
    body = req.body
    const cat_data = {
        name : body.name,
        description : body.description
    }

   try {
     const category = await categoryModel.create(cat_data);
     return res.status(201).send(category)
   } catch (error) {
        console.log("Error while creating category",error)
        res.status(500).send({
            message: "Error while creating category"
        })
   }
}

module.exports = createNewCategory