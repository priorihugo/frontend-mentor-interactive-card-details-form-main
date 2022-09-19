const MainContainer = document.querySelector('.main-container');
const ThanksContainer = document.querySelector('.thank-you-container');
const buttons = document.querySelectorAll('.rate-btn');
const submitButton = document.getElementById('submit');
const rateSpan = document.getElementById('rated')

let rateValue = 5;
let selectedBtn = null;

submitButton.addEventListener('click' , ()=>{
    ThanksContainer.classList.toggle('hidden');
    MainContainer.classList.toggle('hidden');
    rateSpan.innerHTML = rateValue;
})
buttons.forEach(btn => {

    btn.addEventListener('click' , ()=>{
        selectedBtn?.classList.remove('selected');
        btn.classList.toggle('selected');
        rateValue = btn.innerHTML;
        selectedBtn = btn;
    })
    
});