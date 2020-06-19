let before_validate = () => {
  console.log("before_validate")
  if (add_date.value !== "" && add_item.value !== "" && add_time.value !== "") {
    console.log("全て入力されています")
    if(item_overlap_validate() === undefined){
      console.log("アイテム名に被りなし")
      l(negative_or_0_number_validate());
      if(negative_or_0_number_validate() === true){
        console.log("trueを返す")
        return true
      } else {
        after_validate_negative_number();
      }
    } else {
      after_validate_overlap();
    }
  } else {
    console.log("未入力有")
    after_validate();
  }
}

let item_overlap_validate = () => {
  let find_result = array.find((value) => {
    return value[0] === add_item.value; 
  })
  return find_result;
}

let negative_or_0_number_validate = () => {
  console.log("正の数か確認")
  let x = Math.sign(add_time.value);
  l(x);
  if (x === 1){
    return true;
  }
}

let after_validate = () => {
  if (add_item.value === "" || add_time.value === ""){
    validate_message_text.className = "validate-message";
  }
  if (add_date.value === "") {
    validate_message_calendar.className = "validate-message";
  }
};

let after_validate_overlap = () => {
  validate_message_text.className = "validate-message";
  validate_message_text.textContent = "既に登録されたitem名です"
};

let after_validate_negative_number = () => {
  validate_message_text.className = "validate-message";
  validate_message_text.textContent = "正の数を入力してください";
}

input_text.addEventListener('change', () => {
  if (add_item.value !== "" && add_time.value !== "" ) {
    validate_message_text.className = "display-none";
  }
})

add_date.addEventListener('change', () => {
  if (add_date.value !== "") {
    validate_message_calendar.className = "display-none";
  }
})