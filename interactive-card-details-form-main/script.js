const form = document.getElementsByClassName("form")[0];
const thankYouDisplay = document.getElementsByClassName(
  "thank-you-container"
)[0];
const NUM_INPUT_MAX_SIZE = 16;

const inputs = document.querySelectorAll("input");

const subObj = {};
inputs.forEach((input) => {
  input.addEventListener("input", (event) => {
    let errs = "";

    const type = event.target.name;
    const value = event.target.value.trim();
    const { valid, data, err } = processInput[type](value);

    let displayValue;
    if (value == "") {
      displayValue = inputDefault[type];
      errs = "Cant be Blank";
    } else {
      displayValue = data;
      errs = err;
    }
    const displayDiv = document.getElementsByClassName(type + "-display");
    displayDiv[0].innerHTML = displayValue;

    const errMsgDisplay =
      event.target.parentElement.getElementsByClassName("err-msg");

    if (valid) {
      event.target.classList.remove("invalid");
      errMsgDisplay[0].classList.remove("show-message");

      //save the valid data in an object
      subObj[type] = data;
      validInputs[type] = true;
    } else {
      event.target.classList.add("invalid");
      errMsgDisplay[0].classList.add("show-message");
      errMsgDisplay[0].innerHTML = errs;

      subObj[type] = "INVALID";
      validInputs[type] = false;
    }
  });
});
const inputDefault = {};
const validInputs = {};

inputs.forEach((input) => {
  inputDefault[input.name] = document.getElementsByClassName(
    input.name + "-display"
  )[0].innerHTML;
  validInputs[input.name] = false;
});
//this object is used to treat every entry properly in a single location in code and format the display when needed
//its very important paying attention to div classes and ids patterns
const processInput = {
  "cardholder-name": (value) => {
    return {
      valid: testRegEx(/^([a-z]{2,})\s([a-z]{2,})$/i, value),
      data: value,
      err: "Wrong format, letters only , two names required",
    };
  },
  "card-number": (value) => {
    return {
      valid: testRegEx(/^((\s)*(\d{4})(\s)*){4}$/, value),
      data: treatNumberFormat(value),
      err: "Wrong format, numbers only",
    };
  },
  "exp-date-month": (value) => {
    const intValue = parseInt(value, 10);
    const displayValue = value.slice(0, 2);

    return {
      valid: testRegEx(/^(\d){2}$/, value) && inRange(intValue, 1, 12),
      data: displayValue,
      err: "Wrong format, numbers only",
    };
  },
  "exp-date-year": (value) => {
    const intValue = parseInt(value, 10);
    const displayValue = value.slice(0, 2);

    return {
      valid: testRegEx(/^(\d){2}$/, value) && inRange(intValue, 0, 99),
      data: displayValue,
      err: "Wrong format, numbers only",
    };
  },
  cvc: (value) => {
    const displayValue = value.slice(0, 3);
    return {
      valid: testRegEx(/^(\d){3}$/, value),
      data: displayValue,
      err: "Wrong format, numbers only",
    };
  },
};

function testRegEx(regEx, value) {
  return regEx.test(value);
}
function inRange(value, lowLimit, highLimit) {
  return value >= lowLimit && value <= highLimit;
}
function treatNumberFormat(message) {
  message = message.replace(/\s/g, "");
  let treated = message;
  for (let i = 0; i < NUM_INPUT_MAX_SIZE - message.length && i >= 0; i++) {
    treated = treated.concat("x");
  }
  treated = treated.slice(0, 16);
  let substr = [
    treated.slice(0, 4),
    treated.slice(4, 8),
    treated.slice(8, 12),
    treated.slice(12, 16),
  ];
  treated = substr.join(" ");

  return treated;
}
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(validInputs);

  let valid = true;
  for (const key in validInputs) {
    if (!validInputs[key]) {
      valid = false;
    }
  }

  if (valid) {
    form.classList.toggle("display-none");
    thankYouDisplay.classList.toggle("display-none");
    console.log(subObj);
  }
});
const continueBtn = document.getElementById("continue-btn");

continueBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.classList.toggle("display-none");
  thankYouDisplay.classList.toggle("display-none");
});
