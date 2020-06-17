let date = new Date();
let d:object = date;
console.log(d); // 2020-06-12T01:17:27.076Z 数型で取得してるぽい
let d1:string = date.toLocaleTimeString();
console.log(d1); // 10:15:50
let d2:string = date.toTimeString();
console.log(d2); // 10:15:50 GMT+0900 (GMT+09:00)
let d3:string = date.toDateString();
console.log(d3); // Fri Jun 12 2020
console.log(d3); // Fri Jun 12 2020
console.log(d3); // Fri Jun 12 2020
console.log(d3); // Fri Jun 12 2020