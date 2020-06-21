let lineGraphArray = []
let line_graph_check_tag = []
let lineGraphArrayX = ['x'];
let lineGraphArrayY = ['学習時間'];

// DB取得後、lineChartの作成
let lineChartAddData = () => {
  lineGraphArrayX.push(firebase_db_latest.date);
  lineGraphArrayY.push(firebase_db_latest.dailyTtlTime);
  mkLineChart();
}

// 未実装。折れ線グラフのタグごとの学習時間。
// let mklineGraphArray = () => {
//   // check_tag.map((value) => {
//   //   let addArray = [value];
//     // tag1のタグが生成されていなかった場合
//     if (line_graph_check_tag.indexOf(firebase_db_latest.tag ) === -1 ){
//       line_graph_check_tag.push(firebase_db_latest.tag);
//       let addArray = [firebase_db_latest.tag, Number(firebase_db_latest.time)]
//       lineGraphArray.push(addArray)
//     }
//     lineGraphArray.push(addArray);
//   // })
// }

let mkChart = () => {
  c3.generate({
    bindto: '#chart',
    data: {
      columns: pieArray,
      type: 'pie',
      order: null
    }
  });
}

let mkLineChart = () => {
  c3.generate({
    bindto: '#chart2',
    data: {
      x: 'x', // colums配列から先頭がxのモノを引用してx軸を生成する
      columns: [
        lineGraphArrayX,
        lineGraphArrayY
      ]
  },
    axis: {
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y-%m-%d'
            }
        }
    }
  });
}