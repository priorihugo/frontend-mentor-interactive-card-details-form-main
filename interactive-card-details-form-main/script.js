const cardNameInput = document.getElementById("cardholder-name");
const cardNameDisplay = document.getElementsByClassName("cardholder-name-display");

let cardNumberInput = document.getElementById("card-number");
let cardNumberDisplay = document.getElementsByClassName("card-number-display");

const cardExpireMonthInput = document.getElementById("exp-date-month");
const cardExpireYearInput = document.getElementById("exp-date-year");
const cardExpireDisplay = document.getElementsByClassName("exp-date-display");

const cardCVCInput = document.getElementById("cvc");
const cardCVCDisplay = document.getElementsByClassName("cvc-display");

const form = document.getElementById("form");

const NUM_INPUT_MAX_SIZE = 16;

cardNumberInput.addEventListener("input", (e) => {

  let value = getValue(e);
  let display = treatNumberFormat(e.target.value);

  const numberRE = /((\s)*(\d{4})(\s)*){4}/;
  cardNumberDisplay[0].innerHTML = display;

  if (value.match(numberRE) && value.length == NUM_INPUT_MAX_SIZE) {
    console.log("match");
  } else {
    console.log("doesnt match");
  }
});
function getValue(e) {
  return e.target.value.trim();
}
function treatNumberFormat(message) {
  message.replace(/\s/g, "");
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
