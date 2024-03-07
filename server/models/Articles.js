const { model, Schema } = require('mongoose');

const ArticleSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pubDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})
module.exports = model('Article', ArticleSchema)