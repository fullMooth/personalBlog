
let everyDay = new Vue({
    el:"#every-day-statement",
    data:{
        content:"我是everyday"
    },
    computed:{
        getContent(){
            return this.content;
        }
    },
    created(){
        //求情ajax
        axios({
            url:"/queryEveryDay",
            method:"get",
        }).then(function (result) {
            everyDay.content = result.data.data[0].content;
            // console.log(result)
            // console.log(result.data.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
})

let articleList = new Vue({
    el:"#article-list",
    data:{
        page:1,
        pageSize:5,//页容量
        count:100,
        pageNumList:"",
        articleList:[
            // {
            //     title:"vue.js有什么用，是用来做什么的（整理）",
            //     content:"顾名思义，单页应用一般指的就是一个页面就是应用，当然也可以是一个子应用，比如说知乎的一个页面就可以视为一个子应用。单页应用程序中一般交互处理非常多，而且页面中的内容需要根据用户的操作动态变化。",
            //     date:"2019-1-1",
            //     views:"101",
            //     tags:"test1 test2",
            //     link:"",
            //     id:"1"
            // },
        ]
    },
    computed:{
        getPage:function(){
            return function (page,pageSize) {
                //获取文章
                axios({
                    method:"get",
                    //数据库查数是从0开始，所以page需要-1
                    url:"/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize,

                }).then(function (resp) {
                    console.log(resp);
                    let result = resp.data.data;
                    let list = [];
                    for (let i = 0;i < result.length;i ++){
                        let temp = {};
                        temp.title = result[i].title;
                        temp.content = result[i].content;
                        temp.date = formatDate(result[i].ctime);
                        temp.views = result[i].views;
                        temp.tags = result[i].tags;
                        temp.id = result[i].id;
                        temp.link = "./blogdetail.html?id=" + result[i].id;
                        list.push(temp);
                    }
                    articleList.articleList = list;
                    this.page = page;
                }).catch(function (resp) {
                    console.log("请求错误！！！");
                })
                //获取文章的总数
                axios({
                    url:"/getPageCount",
                    method:"get"
                }).then((result)=>{
                    // console.log('result.data.data:',result.data.data[0].count);
                    this.count = result.data.data[0].count;
                    this.generatePageTool;
                }).catch((error) =>{
                    console.log("getPageCounterror");
                })
                //articleList.generatePageTool();//这里最报出一个很经典的错误，说在这个钩子函数里articlelist没有初始化

            }
        },
        /**
         * 分页组件
         */
        generatePageTool:function () {
            let nowPage = this.page;//当前页
            let pageSize = this.pageSize;//页容量
            let totalCount = this.count;//总记录数
            let result = [];
            result.push({text:"<<",page:1});
            if(nowPage > 2){
                result.push({text:nowPage - 2,page:nowPage -2});
            }
            if(nowPage > 1){
                result.push({text:nowPage -1,page:nowPage -1});
            }
            result.push({text:nowPage,page:nowPage});
            if(nowPage + 1 < (totalCount + pageSize -1)/pageSize){
                result.push({text:nowPage + 1,page:nowPage + 1});
            }
            if(nowPage + 2 < (totalCount + pageSize - 1)/pageSize){
                result.push({text:nowPage + 2,page:nowPage + 2});
            }
            result.push({text:">>",page:parseInt((totalCount + pageSize - 1)/pageSize)})
            this.pageNumList = result;
            console.log("pageList:",result);
            return result;
        }
    },
    created(){
        this.getPage(this.page,this.pageSize);
    },
    methods:{
      toPage(){
          console.log("click")
          return function (page) {
              console.log(page);
              this.getPage(page)
          }
      }
    }
})




//格式化日期
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

