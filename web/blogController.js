let blogDao = require("../dao/blogDao");
let timeUtil = require("../util/timeUtil");
let respUtil = require("../util/respUtil");

function insertBlog(request,response) {
    let params = url.parse(request.url,true).query;
    let tags = params.tags.replace(/" "/g,"").replace("，",",");
    request.on("data",function(data){
        blogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}