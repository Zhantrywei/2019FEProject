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

// 初始化代码在单例模式下创建执行
// 自执行函数的单例

var cookie = (function() {
  var allCookies = document.cookie.split(";"),
    cookies = {},
    cookiesIndex = 0,
    cookiesLength = allCookies.length,
		cookie;
		for(;cookiesIndex<cookiesLength;cookiesIndex++){
			cookie = allCookies[cookiesIndex].split("=")
			cookies[unescape(cookie[0])] = unescape(cookie[1])
		}
})();
