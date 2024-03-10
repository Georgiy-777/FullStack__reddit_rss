/* This code snippet is setting up a route for handling a POST request to the '/login' endpoint. Here
is a breakdown of what each line is doing: */
require("dotenv").config();
const Router = require('express')
const router = new Router()
const authController = require("../controllers/auth.controllers");


router.post('/login', authController.login)


module.exports = router