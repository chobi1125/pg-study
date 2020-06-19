// Firebaseへの追加
let addFB = () => {
  delayID = Number(lastID) +1 ;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${delayID}`).set({
    id:delayID,
    todo:addTodo.value
  });
  addTodo.value = "";
}
// リスト一覧生成&追加生成
let listFC = () => {
  console.log("listFC")
  // 削除時の場合
  if (message === "削除" || message === "更新") {
    console.log(message);
  // 最初の一覧取得※objの場合
  } else if(Array.isArray(allDB) === false && lastID === 0){
    let objDB =Object.keys(allDB);
    l("mkobjElem1")
    mkObjElem(objDB); 
  // // 最初の一覧取得※arrayの場合
  } else if(allDB != [] && lastID === 0){
    console.log("mkArrElem");
    mkArrElem(); 
  // 追加時 not 削除時
  } else if ( lastID +1 === delayID){
    console.log("mkAddElem");
    mkAddElem();
  // データが空の場合
  } else if (allDB === []) {
    console.log("DB empty");
  // obj状態でデータ追加時データが追加されるように。
  } else if(allDB[delayID].id !== undefined){
    mkAddElem();
  } else {
    console.log("DB updated");
  }
}

let mkObjElem = (obj) => {
  obj.map((value) => {
    lastID = (value);
    let div = el('div');
    div.id = allDB[value].id;
    result.appendChild(div);
    let input = el('input');
    input.value = allDB[value].todo;
    div.appendChild(input);
    let delBtn = el('button');
    delBtn.textContent = "削除";
    delBtn.onclick = "click()";
    div.appendChild(delBtn);
    let editBtn = el('button');
    editBtn.textContent = "更新";
    div.appendChild(editBtn);
  });
}

let mkArrElem = () => {
  allDB.map((value) => {
    lastID = (value.id);
    let div = el('div');
    div.id = value.id;
    result.appendChild(div);
    let input = el('input');
    input.value = value.todo;
    div.appendChild(input);
    let delBtn = el('button');
    delBtn.textContent = "削除";
    delBtn.onclick = "click()";
    div.appendChild(delBtn);
    let editBtn = el('button');
    editBtn.textContent = "更新";
    div.appendChild(editBtn);
  });
}

let mkAddElem = () => {
  lastID = allDB[delayID].id;
  let div = el('div');
  div.id = allDB[delayID].id;
  result.appendChild(div);
  let input = el('input');
  input.value = allDB[delayID].todo;
  div.appendChild(input);
  let delBtn = el('button');
  delBtn.textContent = "削除";
  delBtn.onclick = "click()";
  div.appendChild(delBtn);
  let editBtn = el('button');
  editBtn.textContent = "更新";
  div.appendChild(editBtn);;
}

// 更新・削除機能
result.addEventListener('click', (event) => {
  let eventElem = event.target;
  let parentElem = eventElem.parentNode;
  l(eventElem)
  l(parentElem.id)
  let input = parentElem.querySelector("input");
  l(input.value);
  if (eventElem.textContent === "削除") {
    l("削除");
    delID = Number(parentElem.id);
    parentElem.remove();
    message = "削除";
    db.ref(`/users/${firebase.auth().currentUser.uid}/${delID}`).remove();
  }
  else if (eventElem.textContent === "更新"){
    l("更新");
    message = "更新"
    input.value = input.value;
    db.ref(`/users/${firebase.auth().currentUser.uid}/${parentElem.id}`).update({
      todo: input.value
    })
  }
});