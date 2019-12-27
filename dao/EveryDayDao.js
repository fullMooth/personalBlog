let dbutil = require("./dbutil");

function insertEveryDay(content,ctime,success){
    let sql = "insert into every_day(content,ctime) values(?,?)";
    let params = [content,ctime];

    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params,function(error,result){
        if(error == null){
            success(result)
        }else{
            console.log(error);
        }
    })
    connection.end();
}


function queryEveryDay(success){
    //倒序排列取前一个
    let sql = "select * from every_day order by id desc limit 1";
    let params = [];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params,function (error,result) {
        if(error == null){
            console.log(result);
            success(result)
        }else{
            console.log(error)
        }
    })
    connection.end();
}

module.exports = {
    insertEveryDay,
    queryEveryDay
}