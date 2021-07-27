//这个组件的作用是生成时间

function getNow(){
    return parseInt(Date.now() / 1000);
}

function formatDate(time){
    const date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day = date.getDate();
    day = day < 10 ? "0" + day : day;

    let hours = date.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let mimutes = date.getMinutes();
    let minutes = mimutes < 10 ? "0" + mimutes : mimutes;
    let format = `${year}年${month}月${day}日 ${hours}:${minutes}`;
    return format;
}
// console.log(formatDate(1600077591*1000));
module.exports = {
    getNow,
    formatDate
}