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