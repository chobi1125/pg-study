let firebase_db_latest = {id:0};
let connect_DB;
let pieArray = [];
let lineGraphArrayX = ['x'];
let lineGraphArrayY = ['学習時間'];


let databaseInitFC = () => {
  connect_DB = db.ref(`/users/${firebase.auth().currentUser.uid}`);
  // DB取得
  connect_DB.on('child_added', (data) => {
    firebase_db_latest = data.val();
    allArray.push(firebase_db_latest);
    chartAddData();
    lineChartAddData();
  });
  // DB更新が発生した際の処理(リロード)
  connect_DB.on('child_changed', function(data) {
    location.reload();
  });
  // DB削除が発生した際の処理(リロード)
  connect_DB.on('child_removed', function(data) {
    location.reload();
  });

};
// DB取得後、chartの作成
let chartAddData = () => {
  let addArray = [firebase_db_latest.item, Number(firebase_db_latest.time)]
  pieArray.push(addArray);
  mkChart();
};
// DB取得後、lineChartの作成
let lineChartAddData = () => {
  lineGraphArrayX.push(firebase_db_latest.date);
  lineGraphArrayY.push(firebase_db_latest.time);
  mkLineChart();
}
// 時間の計算
let minutesToHourTime = () => {
  let minutesToHour = Math.floor(Number(time_m.value)/60 * 100) /100;
  return Number(time_h.value) + minutesToHour;
}

// Firebaseへ追加処理
let addDataFB = () => {
  if (before_validate() === true){
    db.ref(`/users/${firebase.auth().currentUser.uid}/${firebase_db_latest.id + 1}`).set({
      id:firebase_db_latest.id + 1,
      date:add_date.value,
      item:add_item.value,
      time:minutesToHourTime(),
      timeH:time_h.value,
      timeM:time_m.value,
      diary:add_diary.value
    });
    add_item.value = "";
    add_time.value = "";
    add_date.value = "";
    add_diary.value = "";
  }
};
// Firebaseへ編集処理
let editDataFB = () => {
  console.log("edit!!")
  connect_DB_edit = calendar_result.id;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${connect_DB_edit}`).update({
    item:add_item.value,
    time_h:add_time.value,
    time_m:add_time.value,
    diary:add_diary.value
  });
};
// Firebaseへ削除処理
let removeDataFB = () => {
  console.log("remove")
  connect_DB_edit = calendar_result.id;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${connect_DB_edit}`).remove();
  // リロードするから不要。
  // add_date.value = "";
  // add_item.value = "";
  // add_time.value = "";
  // add_diary.value = "";
};