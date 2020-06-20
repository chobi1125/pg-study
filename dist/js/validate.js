let before_validate = () => {
  if (add_date.value !== "") {
    return true
  } else {
    after_validate();
  }
}

let after_validate = () => {
  if (add_date.value === "") {
    validate_message_calendar.className = "validate-message";
  }
};

add_date.addEventListener('change', () => {
  if (add_date.value !== "") {
    validate_message_calendar.className = "display-none";
  }
})