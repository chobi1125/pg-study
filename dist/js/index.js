let addText = document.getElementById("addText");
let time = document.getElementById("time");

let array = [
  ['JavaScript', 10],
  ['React', 30],
  // ['Vue.js', 60],
  // ['Ruby', 40],
  // ['PHP', 50],
]

let add = () => {
  let addArray = [addText.value, Number(time.value)];
  console.log(addArray);
  array.push(addArray);
  mkChart()
}


let mkChart = () => {
  let chart = c3.generate({
    data: {
      columns: array,
      type: 'pie',
      order: null
    }
  });
}

mkChart();