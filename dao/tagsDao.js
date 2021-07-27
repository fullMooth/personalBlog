let dbutil = require("./dbutil");

function queryTags(tag,success) {
    let querysql = "select * from tags where tag = ?;";
    let params = [tag];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querysql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    })
    connection.end();
}


function insertTags(tag,ctime,utime,success) {
    let insertSql = "insert into tags (tag,ctime,utime) values (?,?,?);";
    let params = [tag,ctime,utime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function getTags(success){
    let querySql = "select * from tags limit 6";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log("getTags:",error);
        }
    })
    connection.end();
}



module.exports = {
    queryTags,
    insertTags,
    getTags,
}