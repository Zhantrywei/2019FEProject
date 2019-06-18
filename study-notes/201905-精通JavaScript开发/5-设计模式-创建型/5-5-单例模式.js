// 单例模式
var element = {
        allElements: [],
        get: function(id) {
            var elem = document.getElementById(id);
            this.allElements.push(elem);
            return elem;
        },
        create: function(type) {
            var elem = document.createElement(type);
            this.allElements.push(elem);
            return elem;
        },
        getAllElements: function() {
            return this.allElements;
        }
    },
    header = element.get("header"),
    input = element.create("input"),
    allElements = element.getAllElements();
console.log(allElements.length); // 2

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
        get: function(name) {
            return cookies[name] || "";
        },
        set: function(name, value) {
            cookies[name] = value;
            document.cookie = escape(name) + "=" + escape(value);
        }
    };
})();

// 设置命名空间
var myProject = {
    data: {
        ajax: {
            get: function(url, callback) {
                var xhr = new XMLHttpRequest(),
                    STATE_LOADED = 4,
                    STATUS_OK = 200;
                xhr.onreadystatechange = function() {
                    if (xhr.readyState !== STATE_LOADED) {
                        return;
                    }
                    if (xhr.status === STATUS_OK) {
                        callback(xhr.responseText);
                    }
                };
                xhr.open("GET", url);
                xhr.send();
            }
        }
    }
};

// 命名空间创建后,使用点号标记法可以增加命名空间
myProject.data.cookies = {
    get: function(name) {
        var output = "",
            escapedName = escpae(name),
            start = document.cookie.indexOf(escapedName + "="),
            end = document.cookie.indexOf(";", start);
        end = end === -1 ? document.cookie.length - 1 : end;
        if (start >= 0) {
            output = document.cookie.substring(
                start + escapedName.length + 1,
                end
            );
        }
        return unescape(output);
    },

    set: function(name, value) {
        document.cookie = escape(name) + "=" + escape(value);
    }
};


// 使用点标记法,通过命名空间调用执行方法
myProject.data.ajax.get("/user/12345",function(res){
  console.log("res: ",res);
})
myProject.data.cookies.set("company","AKQA")
console.log(myProject.data.cookies.get("company"))