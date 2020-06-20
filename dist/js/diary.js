let calendar_result;

add_date.addEventListener('change',() => {
  calendar_result = allArray.find((value) => {
    return value.date === addDate.value; 
  })
  if(calendar_result != undefined){
    add_tag.value = calendar_result.tag;
    time_h.value = calendar_result.timeH;
    time_m.value = calendar_result.timeM;
    add_diary.value = calendar_result.diary;
    add_btn.className = "display-none";
    edit_remove_btn.className = "display-block";
  } else {
    add_tag.value = "";
    time_h.value = "0";
    time_m.value = "0";
    add_diary.value = "";
    add_btn.className = "display-block";
    edit_remove_btn.className = "display-none";
  }
})