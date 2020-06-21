let calendar_result;

add_date.addEventListener('change',() => {
  calendar_result = allArray.find((value) => {
    return value.date === addDate.value; 
  })
  if(calendar_result != undefined){
    add_tag.value = calendar_result.tag;
    time_h.value = calendar_result.timeH;
    time_m.value = calendar_result.timeM;
    add_tag2.value =  calendar_result.tag2 === undefined ? "" : calendar_result.tag2;
    time_h2.value = calendar_result.timeH2 === "0" ? "0" : calendar_result.timeH2;
    time_m2.value = calendar_result.timeM2 === "0" ? "0" : calendar_result.timeM2;
    add_tag3.value = calendar_result.tag3 === undefined ? "" : calendar_result.tag3;
    time_h3.value = calendar_result.timeH3 === "0" ? "0" : calendar_result.timeH3;
    time_m3.value = calendar_result.timeM3 === "0" ? "0" : calendar_result.timeM3;
    add_diary.value = calendar_result.diary;
    add_btn.className = "display-none";
    edit_remove_btn.className = "display-block";
    daily_time.textContent = calendar_result.dailyTtlTime === "" ? "" : `合計学習時間:${calendar_result.dailyTtlTime}h`;
  } else {
    add_tag.value = "";
    time_h.value = "0";
    time_m.value = "0";
    add_tag2.value = "";
    time_h2.value = "0";
    time_m2.value = "0";
    add_tag3.value = "";
    time_h3.value = "0";
    time_m3.value = "0";
    add_diary.value = "";
    add_btn.className = "display-block";
    edit_remove_btn.className = "display-none";
    daily_time.textContent = "";
  }
})