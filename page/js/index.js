
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
            console.log(result)
            console.log(result.data.data[0]);
        }).catch(function(error){
            console.log(error);
        })
    }
})

let articleList = new Vue({
    el:"#article-list",
    data:{
        articleList:[
            {
                title:"vue.js有什么用，是用来做什么的（整理）",
                content:"顾名思义，单页应用一般指的就是一个页面就是应用，当然也可以是一个子应用，比如说知乎的一个页面就可以视为一个子应用。单页应用程序中一般交互处理非常多，而且页面中的内容需要根据用户的操作动态变化。",
                date:"2019-1-1",
                views:"101",
                tags:"test1 test2",
                link:"",
                id:"1"
            },
            {
                title:"vue.js有什么用，是用来做什么的（整理）",
                content:"顾名思义，单页应用一般指的就是一个页面就是应用，当然也可以是一个子应用，比如说知乎的一个页面就可以视为一个子应用。单页应用程序中一般交互处理非常多，而且页面中的内容需要根据用户的操作动态变化。",
                date:"2019-1-1",
                views:"101",
                tags:"test1 test2",
                link:"",
                id:"1"
            },
            {
                title:"vue.js有什么用，是用来做什么的（整理）",
                content:"顾名思义，单页应用一般指的就是一个页面就是应用，当然也可以是一个子应用，比如说知乎的一个页面就可以视为一个子应用。单页应用程序中一般交互处理非常多，而且页面中的内容需要根据用户的操作动态变化。",
                date:"2019-1-1",
                views:"101",
                tags:"test1 test2",
                link:"",
                id:"1"
            },

        ]
    },
    computed:{

    },
    created(){

    }
})

let randomTags = new Vue({
    el:'#random-tags',
    data:{
        tags:["adfasa","dsdfadf","adafdfa","dfasdfa","adfasa","dsdfadf","adafdfa","dfasdfa"]
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
        created (){

        }
    }
})

// 最近热门
let newHot = new Vue({
    el:"#new-hot",
    data:{
        newHots:[
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},
            {title:"这些都是随机的标签",link:"http://www.baidu.com"},

        ]
    },
});

//最新评论
let newComments = new Vue({
    el:"#new-comment",
    data:{
        newComments:[
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},
            {name:"这是用户名",date:"2019-2-1",content:"这里是一大串的评论"},

            ]
    }
})