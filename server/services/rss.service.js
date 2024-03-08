const schedule = require('node-schedule');

const RSSParser = require('rss-parser');
require('dotenv').config();
const Article = require('../models/Articles'); // Убедитесь, что указали правильный путь к файлу модели
const feedUrl = 'http://www.reddit.com/r/news/.rss';
const parseAndSave = async url => {
    const parser = new RSSParser();
    const feed = await parser.parseURL(url);
    console.log(feed.title);
    for (const item of feed.items) {
        const exists = await Article.findOne({ id: item.id });
        if (!exists) {
            const articleData = {
                title: item.title,
                link: item.link,
                pubDate: item.pubDate,
                author: item.author,
                content: item.content,
                id: item.id,
            };

            const article = new Article(articleData);
            await article.save();
        } else {
            console.log(`Article already exists: ${item.title}`);
        }
    }
};

module.exports.rssUrlParser = async () => {
    try {

      schedule.scheduleJob('*/5 * * * *', function () {
        parseAndSave(feedUrl).catch(err => console.error(err));
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
    }
  };