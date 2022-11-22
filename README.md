# ejs 勉強用

https://kikuchance.com/2020/09/15/node-js-ejs/

サンプル通りにしても「このサイトは安全に接続できません」となって表示されなかった。

node サーバー起動してるかどうかもよくわかってない。  
そもそも node で起動したサーバーに localhost からアクセスすんのどうすんのだったっけ？

```js
// 追記： 単純に https 接続してしまってただけっぽい…。
// こうした凡ミスに気づけなかったのも、起こりうる不具合のパターンに対する知識が不足しているせいだ。
// （もしサーバー起動済みであることが確信できていれば、原因特定は早かったはず）
```

# 2022-11-17 Thu 最小記述テスト

```js
// app.js
const http = require("http");
var server = http.createServer((request, response) => {});
server.listen(3333);
```

http://localhost:3333/

- ブラウザのロードがいつまでも終わらずアクセスできない。  
   ※ node の実行をコマンドプロンプトから中止すると即座に ↓ のメッセージが表示された。
- 3333 以外のポート指定だと以下メッセなので、
  どうやらサーバーは起動してるけどページは表示されない状態らしい。  
   `このサイトにアクセスできません | localhost で接続が拒否されました。`

※ちなみに https では以下メッセージがでてアクセスできず。  
 `このサイトは安全に接続できません | localhost から無効な応答が送信されました。`

そこで`server`変数に以下を追記したらブラウザでもきちんとページが表示された。

```js
var server = http.createServer((request, response) => {
  response.end(`Hello World!`);
});
```

![](/.docs/images/001.png)

`http.createServer()`の第一引数にわたすコールバックの中で、レスポンス内容を指定してやる必要があるみたい。  
`resoponse.end()`メソッドで指定された内容が html に出力される。  
サーバーからの返却内容をなんも指定していないのだから、なんも表示されなくて当然なんだよなあ。

今日はここまで　 2022-11-17 Thu 20:56

---

# 2022-11-18 Fri ルーティング

https://kikuchance.com/2020/09/21/node-js-routing/

過去に node 学習で ejs 使ってルーティングしたことあるのを思いだした。

---

# node サーバーを自動で再起動

いちいちコマンドうって起動しなおすのめんどくせえなと思ってたら、以下のような方法を発見

```
npx nodemon app.js
```

---

# ejs プロジェクト

express + ejs がスタンダードかつ手っ取り早そう  
http はインストール不要かつ http 通信周りの知識付けたい場合は恐らくよさそう

`npm i -D ejs express`  
両 pkg インストールしたうえで以下が最小構成

# bs

https://chusotsu-program.com/nodemon-browsersync/

```
npx browser-sync init
```

- node サーバーを proxy に指定
- browser-sync は既存機能と被らない port で立ち上げる

bs + node サーバー、起動と更新に恐ろしく時間かかるのは気のせいか？
