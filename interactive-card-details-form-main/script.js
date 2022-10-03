const form = document.getElementById("form");
const NUM_INPUT_MAX_SIZE = 16;

const inputs = document.querySelectorAll('input');
inputs.forEach((input)=>{
  input.addEventListener('input' , (event) =>{
    
    const type = event.target.name;
    const value = event.target.value.trim();
    const {valid , data} = processInput[type](value);
    const displayValue = value == "" ? inputDefault[type] : data;
    const displayDiv = document.getElementsByClassName(type + '-display');
    console.log(displayDiv);
    displayDiv[0].innerHTML = displayValue;

    if(valid){
      console.log('valid')
    }else{

    }

  })
})
const inputDefault = {}
inputs.forEach((input)=>{

  inputDefault[input.name] = document.getElementsByClassName(input.name + '-display')[0].innerHTML;
})

//this object is used to treat every entry properly in a single location in code and format the display when needed
//its very important paying attention to div classes and ids patterns
const processInput = {
  'cardholder-name' : (value) =>{
    return {valid : testRegEx(/^([a-z]{2,})\s([a-z]{2,})$/i , value) , data : value }
  },
  'card-number' : (value)=>{
    return {valid : testRegEx(/^((\s)*(\d{4})(\s)*){4}$/ , value) , data : treatNumberFormat(value)}
  },
  'exp-date-month' : (value)=>{
    const intValue = parseInt(value , 10);
    const displayValue = value.slice(0 , 2);

    return {valid : testRegEx(/^(\d){2}$/ , value) && inRange(intValue , 1 , 12), data : displayValue}
  },
  'exp-date-year' : (value)=>{
    const intValue = parseInt(value , 10);
    const displayValue = value.slice(0 , 2);

    return {valid : testRegEx(/^(\d){2}$/ , value) && inRange(intValue , 0 , 99), data : displayValue}
  },
  'cvc' : (value)=>{
    const displayValue = value.slice(0,3);
    return {valid : testRegEx(/^(\d){3}$/ , value) , data : displayValue}
  }
};


function testRegEx(regEx , value){
  return regEx.test(value);
}
function inRange(value , lowLimit , highLimit){
  console.log(value , (value <= lowLimit && value >=highLimit) );
  return(value >= lowLimit && value <= highLimit);
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