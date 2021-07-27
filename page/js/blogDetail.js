const blogDetail = new Vue({
    el:"#blog-detail",
    data:{
        title:"",
        tags:"",
        content:"",
        views:"",
        ctime:"",
    },
    methods:{

    },
    created(){

        let bId = blogId();
        axios({
            url:"/getBlogById?id=" + bId,
            method:"get",
        }).then((resp) =>{
            const data = resp.data.data[0];
            this.title = data.title;
            this.tags = data.tags;
            this.content = data.content;
            this.views = data.views;
            this.ctime = data.ctime;
        }).catch((error) =>{
            console.log("getBlog failed");
        })

    },
    computed:{

    }
})

const commentPanel = new Vue({
    el:"#comment-panel",
    data:{
        replyid:-1,
        replyName:0,
        codeContent:"",
        codeText:"",
        inputCode:"",
    },
    methods:{
        postComment(){

            let userName = document.getElementById("u-name").value;
            let email = document.getElementById("email").value;
            let content = document.getElementById("c-content").value;
            let bId = blogId();
            if(this.inputCode !== this.codeText) {
                alert("验证码不正确");
                return;
            }
            if(!userName || !email || !content){
                alert("请输入内容！")
                return;
            }else{
                alert(this.replyName);
                alert("评论成功");
            }
            axios({
                url:"/addComment?blogid=" + bId +"&parent="+this.replyid+ "&parent_name=" + this.replyName + "&userName=" + userName + "&comments=" + content +"&email="+ email,
                method:"get"
            }).then((resp)=>{
                console.log(resp);
            }).catch((error)=>{
                console.log("addComment error",error)
            });
        },
        updateCode(){
            axios({
                url:'/getSecurityCode',
                method:"get"
            }).then((resp)=>{
                this.codeContent = resp.data.data.data;
                this.codeText = resp.data.data.text;
            }).catch((error)=>{
                console.log("getCode:error:",error);
            })
        },

    },
    created() {
        //请求验证
        axios({
            url:'/getSecurityCode',
            method:"get"
        }).then((resp)=>{
            this.codeContent = resp.data.data.data;
            this.codeText = resp.data.data.text;
        }).catch((error)=>{
            console.log("getCode:error:",error);
        })

    }

})

const showComments = new Vue({
    el:"#blog-comments",
    data:{
        replyid:-1,
        replyName:0,
        comments: [
            {id:3,name:"zhnag",content:"你好啊",date:2018,options:""}
        ]
    },
    methods:{
        reply(parentID,parentName){
            console.log(parentName)
            commentPanel.replyid = parentID;
            commentPanel.replyName = parentName;
            location.href = "#comment-panel";
        }
    },
    created(){
        let bId = blogId();
        axios({
            url:"/queryCommentsByBlogId?id="+bId,
            method:"get",
        }).then((resp) =>{
            console.log("commentsByBid",resp);
            let data = resp.data.data;
            this.comments = comFilter(data);
        }).catch((error)=>{
            console.log("commentsByid:",error);
        })
    }
})




/**
 * 获取id参数
 * @returns {number}
 */
function blogId(){
    const params = location.search.indexOf("?") > -1 ? location.search.split("?")[1] : "";
    console.log("params:",params);
    if(!params) return;
    let blogId = -1;
    if(params.split("=")[0] == "id"){
        try{
            blogId = params.split("=")[1];
            console.log("blogId:",blogId)
        }catch (e) {
            console.log(e);
        }
    }
    return blogId;
}

function comFilter(data){
    let arr = [];
    for(let key of data){
        let temp = {};
        if(key.parent > -1){
            temp.options = "@回复" + key.parent_name;
        }
        temp.name = key.user_name;
        temp.id = key.id;
        temp.date = formatDate(key.ctime);
        temp.content = key.comments;
        arr.push(temp);
    }
    return arr;
}


function formatDate(time){
    const date = new Date(time*1000);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;

    let hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let mimutes = date.getMinutes();
    let minutes = mimutes < 10 ? "0" + mimutes : mimutes;
    let format = `${year}-${month}-${day} ${hours}:${minutes}`;
    return format;
}
