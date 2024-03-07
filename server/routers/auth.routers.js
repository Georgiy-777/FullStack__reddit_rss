require("dotenv").config();
const Router = require('express')
const router = new Router()
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware');


router.post('/login', async (req, res) => {
    try {
        const {nickname, password} = req.body
        const user = await Admin.findOne({nickname})
        if (!user ) {
            return res.status(404).json({message: 'Admin not found', status: 404,})
        }
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message: 'Incorrect password ', status: 400,})
       
        }
        const token = jwt.sign({id: user.nickname}, process.env.SECRET_KEY, {expiresIn: '1h'}) 
        return res.json({
            token,
            status: 200,
            message: 'Admin authorized',
            user: { 
                nickname: user.nickname 
            }
        })
    }catch (error) {
        console.log(error)
    }
})


router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const {nickname, password} = req.body
            const user = await Admin.findOne({nickname})
            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    nickname: user.nickname,
                 
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

module.exports = router