let dbutil = require("./dbutil");


function insertTagMapping(tagId,blogId,ctime,utime,success){
    let insertSql = "insert into tag_blog_mapping (tag_id,blog_id,ctime,utime) values(?,?,?,?);";
    params = [tagId,blogId,ctime,utime];
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



module.exports = {
    insertTagMapping,
}