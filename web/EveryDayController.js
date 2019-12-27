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
        console.log(data.toString().trim());
    })
}

path.set("/editEveryDay",editEveryDay);

function queryEveryDay(request,response){
    everyDayDao.queryEveryDay(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success,","添加成功",result));
        response.end();
    })
}

path.set("/queryEveryDay",queryEveryDay)

module.exports.path = path;