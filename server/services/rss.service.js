/* This code snippet is a Node.js script that fetches RSS feed data from a specified URL (in this case,
'http://www.reddit.com/r/news/.rss'), parses the feed using the 'rss-parser' library, and saves the
articles to a MongoDB database using Mongoose. */
const schedule = require('node-schedule');
const RSSParser = require('rss-parser');
require('dotenv').config();
const Article = require('../models/Articles'); 

const feedUrl = process.env.RSS_FEED_URL;

/**
 * The function `parseAndSave` parses an RSS feed from a given URL, checks if each item already exists
 * in the database, and saves new articles if they do not already exist.
 */
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

/* This code snippet exports a function named `rssUrlParser` as part of a Node.js module. When this
function is called, it sets up a scheduled job using `node-schedule` to run the `parseAndSave`
function every 5 minutes. */
module.exports.rssUrlParser = async () => {
    try {

      schedule.scheduleJob('*/5 * * * *', function () {
        parseAndSave(feedUrl).catch(err => console.error(err));
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
    }
  };