
/* 201128 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const indexPage = fs.readFileSync('./index.html', 'utf-8');
const server = http.createServer((req, res) => {

  let urlParts = url.parse(req.url, true);//第二trueでオブジェクトでかえす
  let path = __dirname + '/' + urlParts.pathname;
  //D:\RHM\web\github\hyorori.github.io\playground\201125_node//
  var stream = fs.createReadStream(path);
  // stream.pipe(res);//なにがなにやらっさっぱり //! ああ、画像ファイルとか表示するためのやつ！！！！全然伝わらんかったわ
  stream.on('data', (data) => {
    console.log(data);
    res.write(data);
    // res.write(path);//!dataのほかになにわたしてもむしされるっぽい
    // * http://localhost:1234/2010212_2.jpg
  });//さっきはres.on('data')だった

  stream.on('end', (data) => {
    res.end();
  });

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(indexPage);
  // res.end(urlParts.pathname);
});

server.listen(1234);

