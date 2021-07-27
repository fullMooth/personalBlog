
const search = new Vue({
    el:"#search",
    data:{
        keywords:"",
    },
    methods:{
        handleSearch(){
            if(!this.keywords){
                alert('请输入搜索内容');
                return;
            }
            axios({
                url:"/search?keywords=" + this.keywords,
                method:"get"
            }).then((resp)=>{
                console.log(resp);
            }).catch((error)=>{
                console.log("serach",error);
            })
        }
    }
})