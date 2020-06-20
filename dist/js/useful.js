/* 
  効率化
 */

let $ = (e) => document.getElementById(e);
let l = (e) => console.log(e);
let el = (e) => document.createElement(e);

/* 
  さくっと検証用
 */
/* 
  その他便利な関数
 */

// エンターキーで追加
let enter = () => {
  inputText.onkeypress = (e) => {
    const key = e.keyCode || e.charCode || 0;
    // 13はEnterキーのキーコード
    if (key == 13) {
      addDataFB(); // ここに関数
    }
  };
};