// 使用自执行函数的单例模式
// cookie 为 cname=cvalue;  expires=(UTC|GMT); path=/; cname1=cvalue...
// 所以第9行需要用trim()来去掉字符串首尾的空格字符 相当于正则/^\s+|\s+$/gm
// document.cookie返回的是带;分隔的字符串,没有expires和path
// document.cookie = "a=a" 默认添加到/js,expire为N/A
// escape(str): 字符串编码 - 除了ASCII中字母数字和*@-_+./其他都转换为16进制的转义序列 ~ unescape(str) ES3反对用这个,应用decodeURI(),decodeURIComponent()
var cookie = (function() {
    var allCookies = document.cookie.split(";"),
        cookies = {},
        cookie;
    allCookies.forEach(cookiesItem => {
        cookie = cookiesItem.trim().split("=");
        cookies[unescape(cookie[0])] = unescape(cookie[1]);
    });
    return {
        get: function(name){
            return cookies[name] || "";
        },
        set: function(name, value){
            cookies[name] = value;
            document.cookie = escape(name) + "=" + escape(value);
        }
    }
})();
