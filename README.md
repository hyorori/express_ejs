# ejs 勉強用

## pkg

```
npm init -y
npm i -D ejs express browser-sync npm-run-all

npm ls --depth=0

221118@1.0.0 D:\RHM\web\nodejs\221118
├── browser-sync@2.27.10
├── ejs@3.1.8
├── express@4.18.2
└── npm-run-all@4.1.5
```

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

# browser-sync

初期化

`npx browser-sync init`

```
Config file created bs-config.js
To use it, in the same directory run: browser-sync start --config bs-config.js
```

説明の通り、`browser-sync start --config bs-config.js` で設定ファイルを参照して bs が起動
以下のようにコマンドにオプション与えることでも指定可能

```json
"scripts": {
  "start:bs": "browser-sync start --proxy http://localhost:3333 --port 3003 --files='./**/*'",
}
```

💬 `--files='./**/*'`の指定で小一時間迷った。これがないと変更を監視してくれない。

- [browser sync のオプション](https://browsersync.io/docs/command-line)

https://chusotsu-program.com/nodemon-browsersync/
https://knym.net/nodemon-browsersync/

---

# POST リクエスト受け取る 2022-11-29 Tue

## 受け取る

```js
app.use(express.urlencoded({ extended: true }));
// * 上記がないとreq.bodyはundefinedになる
app.post(`/uketoru`, (req, res) => {
  console.log(`POSTリクエスト`, req.url, req.body);
});
```

## 保存する

- `fs.writeFile()` を用いる
- `fs`は`fileSystemの略`

---

# 推奨拡張の保存

- 拡張機能ページで `>add`
  - 保存先はワークスペース or `.vscode`配下 いずれかを選択可能。後者は複数人での共有に便利。
  - 💬 拡張機能ページ限定のコマンドがあるの知らなかった おもろい

ejs と VSCode のデフォルトフォーマッタ設定（属性改行）が相性悪かったので泣く泣く拡張を導入
ワークスペースのみの指定にした。

```json
// (共通) settings.json
{
  "emmet.includeLanguages": {
    "ejs": "html"
  }
}
```

```json
// extensions.json
{
  "recommendations": [
    "digitalbrainstem.javascript-ejs-support",
    "j69.ejs-beautify"
  ]
}
```

💬 本当はこんなんいれたくないよ～～…
ejs ってオワコンじゃないよね…？今後もちゃんとアップデートされるか心配

---

# ejs ループ

php と同じ感じで

```ejs
  <% [...Array(3)].map((v,i) => { %>
  <input type="radio"/>
  <%= i+1 %>
  <% }) %>
```

---

# json のデータを変更・削除

json ファイルを`const json = require(【パス】)`で読み込み、`splice(),push(),pop()`などで変更可能。
サーバー再起動するまでは、json データに行われた破壊的な変更が保持される。

💬 これも面白いね。ゲームとかにはよさそうな。

---

# ejs 公式

https://ejs.co/

---

# MysSql 連携

- 基本コマンド https://qiita.com/knife0125/items/bb095a85d1a5d3c8f706
- データ型 https://www.javadrive.jp/mysql/type/

忘れてたら思い出すの大変だろうなと思ってた mysql コマンド、覚えてるもんだね意外と
`mysql -u root -p`
のあとにパスワード。でもどうやってユーザー登録したかとかもう覚えてねーや…。

```sql

create database dev_express_ejs
use dev_express_ejs

-- オートインクリメント
create table items (id int auto_increment,name varchar(10),index(id));

show tables

insert into items values (null,'user1');

-- nameカラムにだけ追加
insert into items (name) values ('test1');

select * from `items`;

drop table items; --削除
```

## 複数行 inset

```
insert into items values
(0,'name1'),
(0,'name1'),
(0,'name1');
```

## 日本語データ登録

[MySQL 5.7 文字コードを UTF8 に！日本語が登録できない！](https://server-recipe.com/1867/)

```sql
show variables like 'character%'; -- 確認用コマンド

-- 1. 🍕 以下を再定義してあげる必要あり
-- | character_set_database   | latin1 |
-- | character_set_server     | latin1 |

set character_set_database = utf8;
set character_set_server = utf8;

-- 2. 🍕 テーブルの文字コードも変更
alter table items convert to character set utf8;
alter table items convert to character set utf8mb4;

show create table items \G; --テーブル情報表示コマンド
```

[テーブルを作成したときのコマンドを表示する (SHOW CREATE TABLE)](https://maku77.github.io/sql/show-create-table.html)

💬 でもこれだと俺の大好きな絵文字 🍣 が使えないのよ

## xampp mysql デフォルト文字コードを変更

https://qiita.com/knowledge87sun/items/6f57b26eadcf3ca79d8c

xampp の mysql 設定ファイル、多分以下
`C:\xampp\mysql\bin\my.ini`

- `[mysqld]`の末尾に `character_set_server=utf8mb4`

- `[client], [mysqldump], [mysql]` 三か所それぞれの末尾に `default-character-set=utf8mb4`

💬 どの記述が何に効果あるのかいまいちわかってない

```sql
set character_set_database = utf8mb4;
```

■ DB の文字コード確認用コード集

```
SELECT SCHEMA_NAME,DEFAULT_CHARACTER_SET_NAME,DEFAULT_COLLATION_NAME
    FROM INFORMATION_SCHEMA.SCHEMATA
    WHERE SCHEMA_NAME = 'dev_express_ejs';

SELECT TABLE_NAME,TABLE_COLLATION
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_SCHEMA='dev_express_ejs';
```

ウェブ上のデータベース使うにはまだまだ知識たりんよ
[Express+PostgreSQL+Sequelize を Docker で構築してみる【前編】](https://qiita.com/rockguitar67/items/b644a63b3e39cc1fcaea)

---

# MySql オートインクリメント

```sql
create table items (id int auto_increment, name varchar(10),index(id))

desc items;
```

オートインクリメント指定をしたカラムに `0` または `null` を格納すると、自動で「カラムの最大値 + 1」が割り当てられる

https://www.javadrive.jp/mysql/table/index7.html

> AUTO_INCREMENT が設定されたカラムには任意の値を格納できますが、 NULL または 0 を格納すると現在カラムに格納されている最大の値に 1 を加算した値を自動で格納します。

💬 `index(id)`の部分がないと error  
オートインクリメント設定するためには、その項目に別途指定がいるっぽい

## ■ オートインクリメントの数値初期化

```sql
delete from items; -- 全消し
alter table items auto_increment = 1; -- 全消し後のみ有効

truncate table items;  -- もしくはtruncate
```

[TRUNCATE と DELETE の違い](http://tech.aainc.co.jp/archives/)4772
