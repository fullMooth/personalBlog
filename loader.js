//加载静态资源的
//读取web文件夹下的文件
//然后把web下提供的所有接口都映射到pathMap中，请求来了直接来这里找
//把web文件夹下每个文件对应的Map保存到集合controllerSet里
let fs = require("fs");
let globalConfig = require("./config");

let controllerSet = [];
let pathMap = new Map();

let files = fs.readdirSync("./" + globalConfig["web_path"]);
// console.log("files:",files);

let filesLen = files.length;
for(let i = 0;i < filesLen;i ++){

    let temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    // console.log("temp:",temp)
    if(temp.path){
        for(let [key,value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                new Error("url 异常，url为：" + key);
            }
        }
        controllerSet.push(temp);
    }
}
module.exports = pathMap;