const Parser = require("rss-parser");
const parser = new Parser();
const express = require("express");
const { table } = require("table");

const app = express();

app.listen(3000, () => console.log("server on"));

const feeds = [];

(async () => {
  let feed = await parser.parseURL("http://g1.globo.com/dynamo/rss2.xml");
  feed.items.forEach((item) => {
    feeds.push(item.title);

    let data = [[item.title]];
    console.log(table(data));
  });
  async function loop(rss) {
    feed = await parser.parseURL("http://g1.globo.com/dynamo/rss2.xml");
    if (!feeds.includes(rss[rss.length - 1].title)) {
      feeds.push(rss[rss.length - 1].title);

      data = [[feeds[feeds.length - 1]]];
      console.log(table(data));
    }
  }
  setInterval(() => {
    loop(feed.items);
  }, 10000);
})();
