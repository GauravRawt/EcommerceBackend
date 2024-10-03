const express = require("express")
const { signup, login } = require("../controller/userController")
const {verifySignupBody, verifyLoginBody} = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/signup",verifySignupBody,signup)
router.post("/login",verifyLoginBody,login)

module.exports = router