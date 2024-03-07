require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { rssUrlParser } = require('./services/rss.service'); 
const AuthRouters = require('./routers/auth.routers');
const ArticleRouters = require('./routers/article.routers');
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json());
app.use(cors());
app.use('/api', AuthRouters);
app.use('/api', ArticleRouters);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
        rssUrlParser();
    } catch (error) {
        console.log(error);
    }
};
startServer();
