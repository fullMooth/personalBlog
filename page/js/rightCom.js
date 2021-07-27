/*处理随机标签云，最近热门，最新评论*/
function addLinks(arr,baseUrl){
    for(let elem of arr){
        elem.links = baseUrl + elem.id;
    }
    return arr;
}

function formatDate(time){
    const date = new Date(time*1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    let months = month < 10 ? '0' + month : month;
    let days = day < 10 ? "0" + day : day;
    return `${year}-${months}-${days}`;
}

const lastestHot = new Vue({
    el:"#new-hot",
    data:{
        title:"最近热门",
        hotList:[],
    },
    created(){
        axios({
            url:'/getHotBlog',
            method:"get",
        }).then((resp)=>{
            // console.log("hot:",resp);
            let baseUrl = "/blogdetail.html?id=";
            this.hotList = addLinks(resp.data.data,baseUrl)
        }).catch((error)=>{
            console.log("getHot:",error);
        })
    },
    method:{

    }
})

const newComment = new Vue({
    el:"#new-comment",
    data:{
        commentList:[],
    },
    method:{

    },
    created() {
        axios({
            url:"/getNewComments",
            method:"get",
        }).then((resp)=>{
            // console.log("commnets",resp);
            for(let comment of resp.data.data){
                let temp = {};
                temp.name = comment.user_name || "无名英雄";
                temp.date = formatDate(comment.ctime);
                temp.content = comment.comments || "说好话不留名";
                this.commentList.push(temp);
            }
        }).catch((error) =>{
            console.log("getComments:",error);
        })
    }
})

//随机标签处理
let randomTags = new Vue({
    el:'#random-tags',
    data:{
        tags:[],
    },
    created (){
        axios({
            url:"/getTags",
            method:"get",
        }).then((resp) =>{
            console.log("getTags:",resp);
            let baseUrl = "";
            this.tags = addLinks(resp.data.data,baseUrl);
        }).catch((error)=>{
            console.log("getTags:",error);
        })
    },
    computed:{
        randomColor (){
            return function () {
                let red = Math.floor(Math.random()*255),
                    green = Math.floor(Math.random()*255),
                    blue = Math.floor(Math.random()*255);
                // console.log(red,green,blue)
                // return "rgb(" + red + "," + green + "," + blue + ")";
                return `rgb(${red},${green},${blue})`;
            }
        },
        randomSize() {
            let size = (Math.random()*8) + 12 + 'px';
            console.log(size)
            return size;
        },
    }
})



