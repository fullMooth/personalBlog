/*
* 首先明白这个文件要干什么
* 要处理每日一句相关的请求
* 把所有的接口名字与处理方法做一个映射
* */
let everyDayDao = require("../dao/EveryDayDao");
let timeUtil = require("../util/timeUtil");
let respUtil = require("../util/respUtil");
let path = new Map();

function editEveryDay(request,response){
    request.on("data",function (data) {
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        });
        // console.log(data.toString().trim());
    })
}

path.set("/editEveryDay",editEveryDay);

function queryEveryDay(request,response){
    everyDayDao.queryEveryDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","添加成功",result));
        response.end();
    })
}

path.set("/queryEveryDay",queryEveryDay)

module.exports.path = path;