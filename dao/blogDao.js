let dbutil = require("./dbutil");

function insertBlog(title,content,tags,views,ctime,utime,success) {
    let insertSql = "insert into blog (title,content,views,tags,ctime,utime) values (?,?,?,?,?,?)";
    let params = [title,content,views,tags,ctime,utime];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null){
            // console.log(result);
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function queryBlogByPage(page,pageSize,success){
    let sql = "select * from blog order by id desc limit ?,?";
    //注意这个地方的第一个参数
    let params = [page * pageSize,pageSize];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
}

function getPageCount(success){
    let sql = "select count(1) as count from blog";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log('ERROR');
        }
    })
    connection.end();
}

function getBlogById(id,success){
    let sql = "select * from blog where id=?;"
    let params = id;
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,params,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function getAllBlog(success){
    let sql = "select * from blog;";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log("dao.getAllBLog",error);
        }
    })
    connection.end();
}

function getHotBlog(success){
    let sql = "select * from blog order by views asc limit 6";
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(sql,function(error,result){
        if(!error){
            success(result);
        }else{
            console.log("hotDao:",error);
        }
    })
    connection.end();

}

function addViews(blogId,success){
    let viewSql = "update blog set views = views+1 where id = ?";
    const params = [blogId];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(viewSql,params,function (error,result) {
        if(!error){
            success(result);
        }else{
            console.log("addViews:",error);
        }
    })
    connection.end()
}

function search(keywords,success){
    let searchSql = "select * from blog where title like concat('%',?,'%')";
    const params = [keywords];
    const connection = dbutil.createConnection();
    connection.connect();
    connection.query(searchSql,params,function(error,result){

        if(!error){
            success(result);
        }else{
            console.log("search:",error);
        }
    })
    connection.end();
}


module.exports = {
    insertBlog,
    queryBlogByPage,
    getPageCount,
    getBlogById,
    getAllBlog,
    getHotBlog,
    addViews,
    search
}