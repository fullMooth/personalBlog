let fs = require("fs");

var globalConfig = {};

var confs = fs.readFileSync("./server.conf");

let confArr = confs.toString().split("\r\n");

console.log(confArr);
for(let i = 0;i < confArr.length;i ++){
    globalConfig[confArr[i].split("=")[0].trim()] = confArr[i].split("=")[1].trim();
}
console.log(globalConfig)

module.exports = globalConfig;