let express = require("express");
let globalConfig = require('./config');
let loader = require("./loader");

let app = new express();

app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get("/editEveryDay"));

app.get("/queryEveryDay",loader.get("/queryEveryDay"));
app.post("/editBlog",loader.get("/editBlog"));

app.listen(globalConfig["port"],function () {
    console.log("服务器已启动！");
})

