const url = require("url")
const timeUtil = require("../util/timeUtil");
const respUtil = require("../util/respUtil");
const commentDao = require("../dao/commentDao");
const cap = require("svg-captcha");


const path = new Map();


function addComment(req,resp){
    const params = url.parse(req.url,true).query;
    let {blogid,parent,parent_name,userName,comments,email} = params;
    commentDao.addComment(blogid,parent,parent_name,userName,comments,email,timeUtil.getNow(),timeUtil.getNow(),function(error,result){
        if(!error){
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","评论成功",null));
            resp.end();
        }else{
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","评论成功"))
            resp.end();

        }
    });

}
path.set('/addComment',addComment);

function getSecurityCode(req,resp){
    const img = cap.create({fontSize:50,width:100,height:34});
    resp.writeHead(200);
    resp.write(respUtil.writeResult("success","验证码已经生成",img));
    resp.end();
}
path.set('/getSecurityCode',getSecurityCode);



function getNewComments(req,resp){
    commentDao.getNewComments(5,function (result) {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",result));
        resp.end()
    })
}
path.set("/getNewComments",getNewComments);


function queryCommentsByBlogId(req,resp){
    let bid = url.parse(req.url,true).query.id;
    commentDao.queryCommentsByBlogId(bid,function (result) {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","成功",result));
        resp.end()
    })
}
path.set("/queryCommentsByBlogId",queryCommentsByBlogId);





module.exports.path = path;