
const map = new Vue({
    el:"#blog-map",
    data:{
        newestBlog:"最新文章",
        bloglist:[],
    },
    created(){
        axios({
            url:"/getAllBlog",
            method:"get",
        }).then((resp)=>{
            // console.log("resp:",resp);
            const resplist = resp.data.data;
            for(let item of resplist){
                item.links = "/blogdetail.html?id=" + item.id;
            }
            this.bloglist = resplist;
        }).catch((error) =>{
            console.log("getAllBlog:",error);
        })
    }
})