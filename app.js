const portNo = 3333;

//=============================================================//
// # 最小記述 express
(() => {
  const express = require(`express`);
  const app = express();
  const sampleJson = require(`./sampleJson.json`);

  // app.set(`views`, __dirname);
  app.set(`view engine`, `ejs`); //"ejs" pkgのinstall必要。
  app.get(`/`, (req, res) => {
    // console.log("req,res", req, res);
    // res.send(`hello!!`);
    // res.send(sampleJson);
    // res.render(`views/testEjs`); // viewsルート指定が__dirnameの場合
    res.render(`testEjs`);
  });
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
