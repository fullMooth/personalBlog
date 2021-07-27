/*
* config.js的作用是读取server.conf文件
* */
let fs = require("fs");

var globalConfig = {};

var confs = fs.readFileSync("./server.conf");

let confArr = confs.toString().split("\r\n");

for(let i = 0;i < confArr.length;i ++){
    globalConfig[confArr[i].split("=")[0].trim()] = confArr[i].split("=")[1].trim();
}

module.exports = globalConfig;



/*
const fs = require("fs");

const globalConfig = {}
const confings = fs.readFileSync("./server.conf","utf-8");

console.log(confings);
const configArr = confings.split("\r\n");
console.log(configArr)

let len = configArr.length;
for(let i = 0;i < len;i ++){
    globalConfig[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();

}
console.log(globalConfig);

module.exports=globalConfig;
*/
