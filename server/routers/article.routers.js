require("dotenv").config();
const Router = require('express')
const router = new Router()
const articleController = require("../controllers/article.controllers");


router.post('/article',articleController.createArticles )
router.get('/article',articleController.getArticles )
router.put('/article/:id',articleController.updateArticles )
router.delete('/article/:id',articleController.deleteArticles)


module.exports = router