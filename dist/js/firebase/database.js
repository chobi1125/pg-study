let firebase_db_latest = {id:0};
let connect_DB;
let pieArray = [];
let lineGraphArrayX = ['x'];
let lineGraphArrayY = ['学習時間'];
let check_tag = [];
let tag_ttl_time = 0; // タグ毎の合計時間
let addArray = [];
let allArray = []; // 全てのデータ
let overlap_tag_array = []; // 重複するタグデータ
let ttlTime = 0; //合計学習時間

let databaseInitFC = () => {
  connect_DB = db.ref(`/users/${firebase.auth().currentUser.uid}`);
  // DB取得
  connect_DB.on('child_added', (data) => {
    firebase_db_latest = data.val();
    allArray.push(firebase_db_latest);
    chartAddData();
    lineChartAddData();
    ttlTimeFC();
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
// 全ての学習時間合計
let ttlTimeFC = () => {
  ttlTime = (ttlTime*100 +  firebase_db_latest.dailyTtlTime*100)/100;
  ttl_time_text.textContent = `トータル学習時間:${ttlTime}h`;
}

// DB取得後、pie chartの作成
let chartAddData = () => {
  // tag1のタグが生成されていなかった場合
  if (check_tag.indexOf(firebase_db_latest.tag ) === -1 ){
    check_tag.push(firebase_db_latest.tag);
    let addArray = [firebase_db_latest.tag, Number(firebase_db_latest.time)]
    pieArray.push(addArray);
  } else {
    allArray.filter((value) => {
      if (value.tag === firebase_db_latest.tag) {
        tag_ttl_time += value.time;
      }
      if (value.tag2 === firebase_db_latest.tag) {
        tag_ttl_time += value.time2;
      } 
      if (value.tag3 === firebase_db_latest.tag) {
        tag_ttl_time += value.time3;
      }
    })
    overlap_tag_array = [firebase_db_latest.tag, tag_ttl_time];
    let overlap_key = check_tag.indexOf(firebase_db_latest.tag)
    pieArray.fill(overlap_tag_array,overlap_key,overlap_key+1);
    tag_ttl_time = 0;
  }
  // tag2のタグが生成されていなかった場合
  if (check_tag.indexOf(firebase_db_latest.tag2 ) === -1 ){
    check_tag.push(firebase_db_latest.tag2);
    let addArray = [firebase_db_latest.tag2, Number(firebase_db_latest.time2)]
    pieArray.push(addArray);
  } else {
    allArray.filter((value) => {
      if (value.tag === firebase_db_latest.tag2) {
        tag_ttl_time += value.time;
      }
      if (value.tag2 === firebase_db_latest.tag2) {
        tag_ttl_time += value.time2;
      } 
      if (value.tag3 === firebase_db_latest.tag2) {
        tag_ttl_time += value.time3;
      }
    })
    overlap_tag_array = [firebase_db_latest.tag2, tag_ttl_time];
    let overlap_key = check_tag.indexOf(firebase_db_latest.tag2)
    pieArray.fill(overlap_tag_array,overlap_key,overlap_key+1);
    tag_ttl_time = 0;
  }
  // tag3のタグが生成されていなかった場合
  if (check_tag.indexOf(firebase_db_latest.tag3 ) === -1 ){
    check_tag.push(firebase_db_latest.tag3);
    let addArray = [firebase_db_latest.tag3, Number(firebase_db_latest.time3)]
    pieArray.push(addArray);
  } else {
    allArray.filter((value) => {
      if (value.tag === firebase_db_latest.tag3) {
        tag_ttl_time += value.time;
      }
      if (value.tag2 === firebase_db_latest.tag3) {
        tag_ttl_time += value.time2;
      } 
      if (value.tag3 === firebase_db_latest.tag3) {
        tag_ttl_time += value.time3;
      }
    })
    overlap_tag_array = [firebase_db_latest.tag3, tag_ttl_time];
    let overlap_key = check_tag.indexOf(firebase_db_latest.tag3)
    pieArray.fill(overlap_tag_array,overlap_key,overlap_key+1);
    tag_ttl_time = 0;
  }
  mkChart();
};

// DB取得後、lineChartの作成
let lineChartAddData = () => {
  lineGraphArrayX.push(firebase_db_latest.date);
  lineGraphArrayY.push(firebase_db_latest.dailyTtlTime);
  mkLineChart();
}
// 時間の計算
let minutesToHourTime = (h,m) => {
  let minutesToHour = Math.floor(Number(m)/60 * 100) /100;
  return Number(h) + minutesToHour;
}

// Firebaseへ追加処理
let addDataFB = () => {
  if (before_validate() === true){
    db.ref(`/users/${firebase.auth().currentUser.uid}/${firebase_db_latest.id + 1}`).set({
      id:firebase_db_latest.id + 1,
      date:add_date.value,
      tag:add_tag.value,
      tag2:add_tag2.value,
      tag3:add_tag3.value,
      time:minutesToHourTime(time_h.value,time_m.value),
      timeH:time_h.value,
      timeM:time_m.value,
      time2:minutesToHourTime(time_h2.value,time_m2.value),
      timeH2:time_h2.value,
      timeM2:time_m2.value,
      time3:minutesToHourTime(time_h3.value,time_m3.value),
      timeH3:time_h3.value,
      timeM3:time_m3.value,
      diary:add_diary.value,
      dailyTtlTime:(minutesToHourTime(time_h.value,time_m.value)*100+minutesToHourTime(time_h2.value,time_m2.value)*100+minutesToHourTime(time_h3.value,time_m3.value)*100)/100
    });
    add_tag.value = "";
    timeH.value = "";
    timeM.value = "";
    add_tag2.value = "";
    timeH2.value = "";
    timeM2.value = "";
    add_tag3.value = "";
    timeH3.value = "";
    timeM3.value = "";
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
    tag2:add_tag2.value,
    tag3:add_tag3.value,
    time:minutesToHourTime(time_h.value,time_m.value),
    timeH:time_h.value,
    timeM:time_m.value,
    time2:minutesToHourTime(time_h2.value,time_m2.value),
    timeH2:time_h2.value,
    timeM2:time_m2.value,
    time3:minutesToHourTime(time_h3.value,time_m3.value),
    timeH3:time_h3.value,
    timeM3:time_m3.value,
    diary:add_diary.value,
    dailyTtlTime:(minutesToHourTime(time_h.value,time_m.value)*100+minutesToHourTime(time_h2.value,time_m2.value)*100+minutesToHourTime(time_h3.value,time_m3.value)*100)/100
  });
};
// Firebaseへ削除処理
let removeDataFB = () => {
  console.log("remove")
  connect_DB_edit = calendar_result.id;
  db.ref(`/users/${firebase.auth().currentUser.uid}/${connect_DB_edit}`).remove();
};