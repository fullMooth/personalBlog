(function (root) {
    root.formatDate = function(time){
        const date = new Date(time*1000);
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDay();
        let months = month < 10 ? '0' + month : month,
            days = day < 10 ? '0' + day : day;
        return `${year}-${months}-${days}`;

    }
})(window);