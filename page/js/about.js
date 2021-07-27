const showComments = new Vue({
    el:"#blog-comments",
    data:{
        comments:[],
    },
    created(){
        axios({
            url:"/getNewComments",
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
