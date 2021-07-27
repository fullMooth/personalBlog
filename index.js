let express = require("express");
let globalConfig = require('./config');
let loader = require("./loader");
const cors = require('cors')


let app = new express();
app.use(cors())

app.use(express.static("./page/"));

//about EveryDay
app.post("/editEveryDay",loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));

//deal with blog
app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBlogByPage",loader.get("/queryBlogByPage"));
app.get("/getPageCount",loader.get("/getPageCount"));
app.get("/getBlogById",loader.get("/getBlogById"));
app.get("/getAllBlog",loader.get("/getAllBlog"));
app.get('/getHotBlog',loader.get('/getHotBlog'));


//deal with comments
app.get("/addComment",loader.get("/addComment"));
//生成验证码的请求
app.get("/getSecurityCode",loader.get('/getSecurityCode'));
app.get("/getNewComments",loader.get('/getNewComments'));
app.get("/queryCommentsByBlogId",loader.get("/queryCommentsByBlogId"));

//deal with tags
app.get("/getTags",loader.get("/getTags"));

//about search
app.get("/search",loader.get("/search"));



app.listen(globalConfig["port"],function () {
    console.log("服务器已启动！");
})


