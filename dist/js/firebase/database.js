let firebase_db = {};
let firebase_latest_id = 0;
let connect_DB;

let databaseInitFC = () => {
  connect_DB = db.ref(`/users/${firebase.auth().currentUser.uid}`);
  // DB取得
  connect_DB.on('child_added', (data) => {
    console.log('child_added');
    firebase_db = data.val();
    chartAddData();
  });
  connect_DB.on('child_changed', function(data) {
    console.log('child_changed');
    serverEditedData(data.val());
  });
  connect_DB.on('child_removed', function(data) {
    console.log('child_removed');
    serverRemovedData(data.val());
  });
};
// DB取得後、chartの作成
let chartAddData = () => {
  let addArray = [firebase_db.item, Number(firebase_db.time)]
  console.log(addArray);
  array.push(addArray);
  firebase_latest_id = firebase_db.id;
  mkChart();
};
// DB更新後
let serverEditedData = (data) => {
  let editArray = [data.item, data.time];
  array[data.id - 1] = editArray;
  console.log(array);
  mkChart();
};
// DB削除後
let serverRemovedData = (data) => {
  console.log(data);
  array.splice(data.id -1,1);
  mkChart();
};
// Firebaseへの追加
let addDataFB = () => {
  let firebase_added_id = firebase_latest_id + 1;
  firebase_latest_id++;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${firebase_added_id}`).set({
    id:firebase_added_id,
    date:add_date.value,
    item:addItem.value,
    time:addTime.value
  });
  addItem.value = "";
  addTime.value = "";
};