/* 
  効率化
 */

let $ = (e) => document.getElementById(e);
let l = (e) => console.log(e);
let el = (e) => document.createElement(e);

/* 
  さくっと検証用
 */

let result = $("result");
// let addBtn = $("addBtn");

/* 
  その他便利な関数
 */

// エンターキーで追加
let enter = () => {
  addTodo.onkeypress = (e) => {
    const key = e.keyCode || e.charCode || 0;
    // 13はEnterキーのキーコード
    if (key == 13) {
      // addFB(); // ここに関数
    }
  };
};