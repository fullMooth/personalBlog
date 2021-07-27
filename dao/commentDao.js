const dbutil = require("./dbutil");

function addComment(blogid,parent,parentName,userName,comments,email,ctime,utime,success) {
    let params = [blogid,parent,parentName,userName,comments,email,ctime,utime];
    let insertSql = "insert into comments (blog_id,parent,parent_name,user_name,comments,email,ctime,utime) values (?,?,?,?,?,?,?,?)"
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(!error){
            success(result);
        }else{
            console.log("dao:addComment");
        }
    })
    connection.end()
}

function getNewComments(size,success){
    let querySql = "select * from comments order by id desc limit ?";
    let params = [size];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log("getComments:",error);
        }
    })
    connection.end();
}

function queryCommentsByBlogId(blogId,success){
    let sql = "select * from comments where blog_id=? limit 5";
    let params = [blogId];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log("qCommBbid",error);
        }
    })
    connection.end();
}


module.exports = {
    addComment,
    getNewComments,
    queryCommentsByBlogId,
}