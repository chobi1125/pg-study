let before_validate = () => {
  console.log("before_validate")
  if (add_date.value !== "" && add_item.value !== "" && add_time.value !== "") {
    if(item_overlap_validate() === undefined){
      l(negative_or_0_number_validate());
      if(negative_or_0_number_validate() === true){
        return true
      } else {
        after_validate_negative_number();
      }
    } else {
      after_validate_overlap();
    }
  } else {
    after_validate();
  }
}

let item_overlap_validate = () => {
  let find_result = pieArray.find((value) => {
    return value[0] === add_item.value; 
  })
  return find_result;
}

let negative_or_0_number_validate = () => {
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
  validate_message_text.textContent = "正の数(※半角)を入力してください";
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