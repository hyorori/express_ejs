
/* 201128 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const indexPage = fs.readFileSync('./index.html', 'utf-8');
const server = http.createServer((req, res) => {
// console.log('indexPage',indexPage);
// console.log('req',req);

  if (req.method === 'GET') {
    // console.log(url.parse(req.url));
    let urlParts = url.parse(req.url, true);//第二trueでオブジェクトでかえす
    console.log('---GET---')
    console.log('nameは' + urlParts.query.name);
    console.log('ageは' + urlParts.query.age);

  } else {
    let body = '';
    req.on('data',(data)=>{
      body += data;
    });

    req.on('end', () => {

      let params = qs.parse(body);
      console.log('---POST---')
      console.log('nameは' + params.name);
      console.log('ageは' + params.age);
  

    });
  }

  res.writeHead(200,{'Content-Type':'text/html'});
  res.write(indexPage);
  res.end();
});

server.listen(1234);


/* 201126
const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // npm i ejs

const index = fs.readFileSync('./index.ejs', 'utf-8');
let getFromClient = (req, res) => {
  let content = ejs.render(index); //ejsのrenderメソッドにfsのreadFileSyncの戻り値をいれる
  res.end(content);

};
let server = http.createServer(getFromClient);

server.listen(1234);

console.log('サーバー起動');
*/


/*
// res.writeHead(200, { 'Content-Type': 'text/plain' });
fs.readFile('index.html', 'utf-8', (err, data) => {
  // * err  ... 通信成功でnull, ファイルnotfonodundなどでエラー文はいる
  // * data ... htmlの内容
  // res.writeHead(200, { 'Content-Type': 'text/html' });//htmlだよ！
  // res.write('World!');
  res.end(data);
});
*/
