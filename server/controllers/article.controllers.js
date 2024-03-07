const Article = require('../models/Articles');

class ArticleController {
    async getArticles(req, res) {
        try {
            const { sort } = req.query;
         
            switch (sort) {
                case 'title':
                    await Article.find()
                        .sort({ title: 1 })
                        .then(article => {
                            res.status(200).json(article);
                        });
                    break;
                case 'pubDate':
                    await Article.find()
                        .sort({ pubDate: 1 })
                        .then(article => {
                            res.status(200).json(article);
                        });
                    break;
                case 'author':
                    await Article.find()
                        .sort({ author: 1 })
                        .then(article => {
                            res.status(200).json(article);
                        });
                    break;
                default:
                    await Article.find()
                        .sort({ pubDate: -1 })
                        .then(article => {
                            res.status(200).json(article);
                        });
                    break;
            }
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
    async createArticles(req, res) {
        try {
            const article = new Article(req.body);
            article.save().then(result => {
                res.status(200).json(result);
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    async updateArticles(req, res) {
        try {
            await Article.findByIdAndUpdate(req.params.id, req.body).then(
                article => {
                    res.status(200).json(article);
                },
            );
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    async deleteArticles(req, res) {
        try {
            await Article.findByIdAndDelete(req.params.id).then(article => {
                res.status(200).json(article);
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}

module.exports = new ArticleController();
