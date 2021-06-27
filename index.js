const Parser = require("rss-parser");
const parser = new Parser();
const express = require("express");

const app = express();

app.listen(3000, () => console.log("server on"));

const feeds = [];

(async () => {
  let feed = await parser.parseURL("http://g1.globo.com/dynamo/rss2.xml");
  feed.items.forEach(item => {
    feeds.push(item.title);
    console.log({Title: item.title, Link: item.link});
  });
  async function loop(rss) {
    feed = await parser.parseURL("http://g1.globo.com/dynamo/rss2.xml");
    if (!feeds.includes(rss[rss.length - 1].title)) {
      feeds.push(rss[rss.length - 1].title);
      console.log({Title: feeds[feeds.length - 1], Link: feed.items[feed.items.length - 1].link});
    }
  }
  setInterval(() => {
    loop(feed.items);
  }, 10000);
})();
