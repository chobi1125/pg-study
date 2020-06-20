let firebase_db_latest = {id:0};
let connect_DB;
let pieArray = [];
let lineGraphArrayX = ['x'];
let lineGraphArrayY = ['学習時間'];
let check_tag = [];
let ttl_time = 0;
let addArray = [];
let allArray = []; // 全てのデータ
let overlap_tag_array = []; // 重複するタグデータ

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
  // タグが生成されていなかった場合
  if (check_tag.indexOf(firebase_db_latest.tag) === -1){
    check_tag.push(firebase_db_latest.tag);
    let addArray = [firebase_db_latest.tag, Number(firebase_db_latest.time)]
    pieArray.push(addArray);
  } else {
    // タグが既にあった場合,allArrayから1つずつ配列をピックアップしてフィルタ
    allArray.filter((value) => {
      // 被ったタグの合計時間を出力
      if (value.tag === firebase_db_latest.tag) {
        ttl_time += value.time;
      }
    })
    // 被ったタグの配列を作成
    overlap_tag_array = [firebase_db_latest.tag, ttl_time];
    console.log(overlap_tag_array);
    // 開始位置を特定。
    let overlap_key = check_tag.indexOf(firebase_db_latest.tag)
    console.log(overlap_key);
    // 配列の要素の上書き(新しい要素,開始位置,上書き個数)
    pieArray.fill(overlap_tag_array,overlap_key,overlap_key+1);
    ttl_time = 0;
  }
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
      tag:add_tag.value,
      time:minutesToHourTime(),
      timeH:time_h.value,
      timeM:time_m.value,
      diary:add_diary.value
    });
    add_tag.value = "";
    timeH.value = "";
    timeM.value = "";
    add_date.value = "";
    add_diary.value = "";
  }
};
// Firebaseへ編集処理
let editDataFB = () => {
  console.log("edit!!")
  connect_DB_edit = calendar_result.id;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${connect_DB_edit}`).update({
    tag:add_tag.value,
    time:minutesToHourTime(),
    timeH:time_h.value,
    timeM:time_m.value,
    diary:add_diary.value
  });
};
// Firebaseへ削除処理
let removeDataFB = () => {
  console.log("remove")
  connect_DB_edit = calendar_result.id;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${connect_DB_edit}`).remove();
};