var http = {
    makeRequest: function(type, url, callback, data) {
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
        xhr.open(type.toUpperCase(), url);
        xhr.send(data);
    }
};

http.makeRequest("get", "/user/12345", function(res) {
    console.log(res);
});

http.makeRequest(
    "post",
    "/user/12345",
    function(res) {
        console.log(res);
    },
    "company=AKQA&name=DEN%20Odell"
);

var myProject = {
    data: {
        ajax: (function() {
            function createRequestObj(callback) {
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

                return xhr;
            }
            return {
                get: function(url, callback) {
                    var requestObj = createRequestObj(callback);
                    requestObj.open("GET", url);
                    requestObj.send();
                },
                post: function(url, data, callback) {
                    var requestObj = createRequestObj(callback);
                    requestObj.open("POST", url);
                    requestObj.send(data);
                }
            };
        })()
    }
};

myProject.data.ajax.get("/user/12345", function(res) {
    console.log("TCL: res", res);
});
myProject.data.ajax.post(
    "/user/12345",
    "company=AKQA&name=DEN%20Odell",
    function(res) {
        console.log("TCL: res", res);
    }
);

// 创建一个适配器来映射新老接口
function httpToAjaxAdapter(type, url, callback, data) {
    if (type.toLowerCase() === "get") myProject.data.ajax.get(url, callback);
    else if (type.toLowerCase() === "post")
        myProject.data.ajax.post(url, data, callback);
}


http.makeRequest = httpToAjaxAdapter;
http.makeRequest("get", "/user/12345", function(res) {
    console.log(res);
});

http.makeRequest(
    "post",
    "/user/12345",
    function(res) {
        console.log(res);
    },
    "company=AKQA&name=DEN%20Odell"
);