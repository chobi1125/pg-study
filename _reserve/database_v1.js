/*

child_addに絞る前

*/

let firebase_db = [];
let firebase_latest_id = 0;
let message;

// チャート生成(配列、オブジェクトで条件分岐)
let mkListFC = () => {
  console.log(firebase_db)
  if(message === "child_added"){
    mkSingleObjElem(firebase_db);
  } else if (Array.isArray(firebase_db) === true){
    mkArrElem();
  } else if (Array.isArray(firebase_db) === false){
    let objDB =Object.keys(firebase_db);
    mkObjElem(objDB);
  }
};

let mkArrElem = () => {
  firebase_db.map((value) => {
    let addArray = [value.item, Number(value.time)]
    console.log(addArray);
    array.push(addArray);
    firebase_latest_id = value.id;
    mkChart();
  });
}

let mkObjElem = (obj) => {
  // valueはobjの個数
  console.log(obj)
  obj.map((value) => {
    console.log(value)
    let addArray = [firebase_db[value].item, Number(firebase_db[value].time)]
    console.log(addArray);
    array.push(addArray);
    firebase_latest_id = firebase_db[value].id;
    mkChart();
  });
}
// child_addedの場合
let mkSingleObjElem = (obj) => {
  // valueはobjの個数
  console.log(obj)
  let addArray = [firebase_db.item, Number(firebase_db.time)]
  console.log(addArray);
  array.push(addArray);
  firebase_latest_id = firebase_db.id;
  mkChart();
}

let databaseInitFC = () => {
  console.log("database取得処理");
  let want_get_DB = db.ref(`/users/${firebase.auth().currentUser.uid}`);
    // want_get_DB.once('value').then((snap) => {
    //   firebase_db = snap.val()
    //   if (firebase_db !== null ){
    //     mkListFC();
    //   } 
    //   // else {
    //   //   firebase_db = []; // 空だとnullになる。
    //   // }
    // });

  // DB取得
  want_get_DB.on('child_added', (data) => {
    console.log('child_added※1つずつ取得して繰り返す');
    // console.log(data.key); // キー名
    // console.log(data.val()); // キーの中身。オブジェクト形式
    message = "child_added"
    firebase_db = data.val();
    mkListFC();

    // addElem(postElement, data.key, data.val().text, data.val().author);
  });
  // DB追加時に反応
  want_get_DB.on('child_changed', function(data) {
    console.log('child_changed');
    console.log(data);
    console.log(data.key);
    console.log(data.val());
    // setCommentValues(postElement, data.key, data.val().text, data.val().author);
  });
}

// Firebaseへの追加
let addFB = () => {
  let firebase_added_id = firebase_latest_id + 1;
  firebase_latest_id++;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${firebase_added_id}`).set({
    id:firebase_added_id,
    item:addItem.value,
    time:addTime.value
  });
}

// let mkObjElem = (obj) => {
//   obj.map((value) => {
//     lastID = (value);
//     let div = el('div');
//     div.id = firebase_db[value].id;
//     result.appendChild(div);
//     let input = el('input');
//     input.value = firebase_db[value].todo;
//     div.appendChild(input);
//     let delBtn = el('button');
//     delBtn.textContent = "削除";
//     delBtn.onclick = "click()";
//     div.appendChild(delBtn);
//     let editBtn = el('button');
//     editBtn.textContent = "更新";
//     div.appendChild(editBtn);
//   });
// }



// let mkAddElem = () => {
//   lastID = firebase_db[delayID].id;
//   let div = el('div');
//   div.id = firebase_db[delayID].id;
//   result.appendChild(div);
//   let input = el('input');
//   input.value = firebase_db[delayID].todo;
//   div.appendChild(input);
//   let delBtn = el('button');
//   delBtn.textContent = "削除";
//   delBtn.onclick = "click()";
//   div.appendChild(delBtn);
//   let editBtn = el('button');
//   editBtn.textContent = "更新";
//   div.appendChild(editBtn);;
// }

// // 更新・削除機能
// result.addEventListener('click', (event) => {
//   let eventElem = event.target;
//   let parentElem = eventElem.parentNode;
//   l(eventElem)
//   l(parentElem.id)
//   let input = parentElem.querySelector("input");
//   l(input.value);
//   if (eventElem.textContent === "削除") {
//     l("削除");
//     delID = Number(parentElem.id);
//     parentElem.remove();
//     message = "削除";
//     db.ref(`/users/${firebase.auth().currentUser.uid}/${delID}`).remove();
//   }
//   else if (eventElem.textContent === "更新"){
//     l("更新");
//     message = "更新"
//     input.value = input.value;
//     db.ref(`/users/${firebase.auth().currentUser.uid}/${parentElem.id}`).update({
//       todo: input.value
//     })
//   }
// });