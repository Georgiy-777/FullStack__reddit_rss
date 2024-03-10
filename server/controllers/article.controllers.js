/* The ArticleController class handles CRUD operations for articles, including getting, creating,
updating, and deleting articles. */
const Article = require('../models/Articles');

class ArticleController {
    /**
     * The function `getArticles` asynchronously retrieves articles based on a specified sorting parameter
     * and sends the results as a JSON response, handling potential errors with a generic message.
     */
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
    /**
     * The function `createArticles` asynchronously creates a new article using the data from the request
     * body and saves it to the database, then returns the result in JSON format or an error message if
     * something goes wrong.
     */
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

    /**
     * The function `updateArticles` asynchronously updates an article in a database using the
     * `Article.findByIdAndUpdate` method and handles errors with a 500 status code.

    */
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

    /**
     * The function `deleteArticles` asynchronously deletes an article by its ID and sends a JSON response
     * with the deleted article or an error message.
     */
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
