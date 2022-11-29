const portNo = 3333;

const fs = require(`fs`);
const express = require(`express`);
const app = express();
const MYPATH = {
  INDEX: `${__dirname}/index.html`,
  DB: `${__dirname}/data.txt`,
  ITEMS: `${__dirname}/activities.json`,
};
//=============================================================//
// # 最小記述 express
(() => {
  const activities = require(MYPATH.ITEMS);

  // app.set(`views`, __dirname);
  app.set(`view engine`, `ejs`); //"ejs" pkgのinstall必要。
  app.use(express.urlencoded({ extended: true }));

  // # ルーティング
  app.get(`/`, (req, res) => {
    // console.log("req,res", req, res);
    // res.send(`hello!!`);
    // res.send(sampleJson);
    // res.render(`views/testEjs`); // viewsルート指定が__dirnameの場合
    res.render(`testEjs`, { activities });
    // res.sendFile(MYPATH.INDEX);
  });

  // 😀 受け取る
  app.post(`/uketoru`, (req, res) => {
    // * 第三引数までないと怒られる
    fs.writeFile(MYPATH.DB, req.body.activity, (err) => {
      console.log("err", err);
      res.send(`投稿完了`);
    });
    console.log(`POSTリクエスト`, req.url, req.body);
  });

  // 😀 更新
  app.post(`/update`, (req, res) => {
    console.log(`POSTリクエスト`, req.url, req.body);
    console.log({ activities });
    activities[0].icon = req.body.updatedActivity;

    res.send(activities);
  });

  // 😀 削除
  app.post(`/delete`, (req, res) => {
    console.log(`POSTリクエスト`, req.url, req.body);
    if (isNaN(req.body.number)) return;
    activities.splice(req.body.number, 1);
    console.log({ activities });
    // res.send(activities);
    res.redirect(`/`);
  });

  // 😀 追加
  app.post(`/add`, (req, res) => {
    console.log(`POSTリクエスト`, req.url, req.body);
    activities.push({ icon: req.body.added });
    console.log({ activities });
    res.redirect(`/`);
  });

  // # 監視
  app.listen(portNo, () => console.log("start"));
})();
//=============================================================//
// # 最小記述
(() => {
  return;
  const http = require("http");
  var server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`Hello!!`);
    res.end();
  });
  const portNo = 3333;

  server.listen(portNo);
  console.log(`Server start! : ${portNo}`);
})();

//=============================================================//
(() => {
  return;
  const http = require("http");
  const fs = require("fs");
  const ejs = require("ejs");

  const portNo = 3333;
  const index = fs.readFileSync("./index.ejs", "utf8");

  var server = http.createServer(getFromClient);
  server.listen(portNo);
  console.log(`Server start! : ${portNo}`);

  function getFromClient(req, res) {
    var content = ejs.render(index);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(content);
    res.end();
  }
})();
