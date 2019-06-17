// 数组的sort的回顾，并列举这次的实战应用
// 1. 回顾：红皮书5.2.5重排序方法：reverse()和sort()
/* 
    1.1 sort默认会调用每个arrItem的toString()方法得到字符串进行比较
    1.2 sort接受一个比较函数，默认接收两个参数，分别为两两接受比较的arrItem
    1.3 function(itemA,itemB) 如果想让itemA排在itemB的前边，就返回-1，或者返回负数；如果想让itemA排在itemB后边的，就返回1，或者正数
    1.4 sort后会改变数组
    1.5 具体根据需求去实现排序方法
*/
// 2. 简化实战demo：需求是一个列表数据需要按照时间新的日期在前边
var dateArr = [
    { date: "20190615", id: 0 },
    { date: "20190619", id: 1 },
    { date: "20190610", id: 2 },
    { date: "20190715", id: 3 },
    { date: "20180715", id: 4 },
    { date: "20200715", id: 5 }
];
dateArr.sort(function(dateItem0, dateItem1) {
    console.log(dateItem0, dateItem1);
    if (dateItem0.date > dateItem1.date) return -1;
    else return 1;
});

console.table(dateArr)
/* 
    实现后的dateArr

    | column0 | column1    | column2 |
    | ------- | ---------- | ------- |
    | (index) | date       | id      |
    | 0       | "20200715" | 5       |
    | 1       | "20190715" | 3       |
    | 2       | "20190619" | 1       |
    | 3       | "20190615" | 0       |
    | 4       | "20190610" | 2       |
    | 5       | "20180715" | 4       |

*/