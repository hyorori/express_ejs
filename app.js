let express = require("express");
let app = express();

/* ルーティング
 */

app.set("views", __dirname + "/views"); // !なにこれ __dirname進研ゼミでやったな
app.set("view engine", "ejs");
// * 解説を聞いて | あ、フォルダ指定するんか

app.get("/", (req, res) => {
  res.render("test", { message: "<strong>強調表示!!!</strong>" });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello.html", (req, res) => {
  res.send("👻👻👻");
});
app.listen(2000, () => {});
