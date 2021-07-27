let blogDao = require("../dao/blogDao");
let url = require("url")
let timeUtil = require("../util/timeUtil");
let respUtil = require("../util/respUtil");
let tagsDao = require("../dao/tagsDao");
let tagBlogMappingDao = require("../dao/tagBlogMapingDao");

let path = new Map();

/**
 * 通过page查询博客
 * @param request
 * @param response
 */
function queryBlogByPage(request,response) {
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt((params.page - 1)),parseInt(params.pageSize),function (result) {
        //处理图片的形成的字符
        for(let i = 0;i < result.length;i ++){
            //去掉img
            result[i].content = result[i].content.replace(/<img[\w\W]*"/,"");
            //去掉标签
            result[i].content = result[i].content.replace(/<[\w\W]{1-5}>/g,"");
            result[i].content = result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询时间",result));
        response.end();

    })
}
path.set("/queryBlogByPage",queryBlogByPage);

/**
 * 通过标签id查询博客
 * @param {*} request 
 * @param {*} response 
 */
function queryBlogsByTagId(request,response){
    
}




function editBlog(request,response) {
    let params = url.parse(request.url,true).query;
    //去掉空格，并用英文逗号替换中文逗号
    let tags = params.tags.replace(/" "/g,"").replace("，",",");
    request.on("data",function(data){
        blogDao.insertBlog(params.title,data.toString(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function (result) {
            console.log(params.title);
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();


            //？？？？
            let blogId = result.insertId;
            let tagList = tags.split(",");
            for (let i = 0;i < tagList.length;i ++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })
    })
}
path.set("/editBlog",editBlog);


/**
 * 插入标签到标签表
 * @param tags
 * @param blogId
 */
function insertTags(tags,blogId){
    tagsDao.insertTags(tags,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        insertTagBlogMapping(result.insertId,blogId);
    })
}

/**
 * 查看数据库中是否存在该标签
 * @param tag
 * @param blogId
 */
function queryTag(tag,blogId){
    tagsDao.queryTags(tag,function (result) {
        //如果不存在该标签，则插入（插入标签后再创建映射）
        if(result == null || result.length == 0){
            insertTags(tag,blogId);
        }else{
        //存在则添加一个标签和博客的映射
            tagBlogMappingDao.insertTagMapping(result[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){

            });

        }
    })
}

function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {
        console.log("heheda");
})
}


function getPageCount(req,resp){
    blogDao.getPageCount(function (result) {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",result));
        resp.end();
    });
}
path.set("/getPageCount",getPageCount);



function getBlogById(request,response){
    let params = url.parse(request.url,true).query;
    let id = parseInt(params.id);
    console.log("cotorller:",params);
    blogDao.getBlogById(id,function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
    blogDao.addViews(id,function(result){
        console.log("web-addviews:",result);
    })
}
path.set("/getBlogById",getBlogById);


function getAllBlog(req,resp){
    blogDao.getAllBlog(function (result) {
            resp.writeHead(200);
            resp.write(respUtil.writeResult("success","查询成功",result));
            resp.end();
    })
}
path.set("/getAllBlog",getAllBlog);


function getHotBlog(req,resp){
    blogDao.getHotBlog(function (result) {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",result));
        resp.end();
    })
}
path.set('/getHotBlog',getAllBlog);



function getTags(req,resp){
    tagsDao.getTags(function (result) {
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","查询成功",result));
        resp.end();
    })
}
path.set("/getTags",getTags);

function search(req,resp){
    const keywords = url.parse(req.url,true).query.keywords;
    blogDao.search(keywords,function(result){
        resp.writeHead(200);
        resp.write(respUtil.writeResult("success","成功",result));
        resp.end();
    })
}
path.set("/search",search);



module.exports.path = path;
/**
 * 这部分的思路是：
 * 1.插入一篇文章，文章包含了标签，标题
 * 2.插入文章以后，先查看标签表里边有没有这个标签，
 *      如果有，直接把这个标签和这篇文章做映射
 *      如果没有，先插入这个标签，然后与文章做映射
 */

