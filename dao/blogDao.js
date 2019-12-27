let dbutil = require("./dbutil");

function insertBlog(blog,content,views,tags,ctime,utime,success) {
    let insertSql = "insert into blog (blog,content,views,tags,ctime,utime) values (?,?,?,?,?,?)";
    let params = [blog,content,views,tags,ctime,utime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null){
            console.log(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}


module.exports = {
    insertBlog,
}