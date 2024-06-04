let isMonth = true;
let isCardNumber = true;
let isName = true;
let isYear = true;
let isValid = true;

//button
const button = document.querySelector(".btn");

// input details
const cardName = document.getElementById('name');
const cardNumber = document.getElementById('card-number');
const cardMonth = document.getElementById('expire-month');
const cardYear = document.getElementById('expire-year');
const cardCvc = document.getElementById('cvc');

// display details
const displayNumber = document.getElementById('displayNumber');
const displayName = document.getElementById('displayName');
const displayExpireMonth = document.getElementById('displayExpireMonth');
const displayExpireYear = document.getElementById('displayExpireYear');
const displayCvc = document.getElementById('displayCvc');

//errors message
const nameError = document.getElementById('nameError');
const numberError = document.getElementById('numberError');
const expireError = document.getElementById('expireError');
const cvcError = document.getElementById('cvcError');
const input = document.querySelectorAll("input");

//form
const form = document.querySelector(".form-section");
const thanks = document.querySelector(".thank-you");

//synchronization with input
function showName(){
    displayName.innerText = cardName.value;
    if(cardName.value.length===0){
        displayName.innerText = "Jane Appleseed";
    }
}

function showCardNumber(){
    if (cardNumber.value.length === 4)
        displayNumber.innerText = cardNumber.value += " ";
    if (cardNumber.value.length === 9)
        displayNumber.innerText = cardNumber.value += " ";
    if (cardNumber.value.length === 14)
        displayNumber.innerText = cardNumber.value += " ";
    displayNumber.innerText = cardNumber.value;

    if(cardNumber.value.length===0){
        displayNumber.innerText = "0000 0000 0000 0000";
    }
}

function showExpireMonth(){
    displayExpireMonth.innerText = cardMonth.value;
    if(cardMonth.value.length===0){
        displayExpireMonth.innerText = "00";
    }
}

function showExpireYear(){
    displayExpireYear.innerText = "/"+cardYear.value;
    if(cardYear.value.length===0){
        displayExpireYear.innerText = "/"+"00";
    }
}

function showCVC(){
    displayCvc.innerText = cardCvc.value;
    if(cardCvc.value.length===0){
        displayCvc.innerText = "000";
    }
}

//validation function
function checkEmptyInputField(inputField,errorField){
    if(inputField.value===""){
        errorField.style.display = "block";
        inputField.style.outline = "thin solid hsl(0, 100%, 66%)";
        errorField.innerText = "Can't be blank"; 
        return true;
    }
    return false;
}

function characterValidation(inputField,errorField,event){
    errorField.style.display = "block";
    if(event.key>=0 && event.key<=9){
        isValid = true;
        inputField.style.outline = "thin solid hsl(278, 94%, 30%)";
        errorField.style.display = "none";
    }
    else{
        isValid = false;
        inputField.style.outline = "thin solid hsl(0, 100%, 66%)";
        errorField.innerHTML = "Wrong format, numbers only";
    }

    if(isValid==false && event.which!=8){
        event.preventDefault();
    }

    if(event.which==8){
        isValid = true;
        inputField.style.outline = "thin solid hsl(278, 94%, 30%)";
        errorField.style.display = "none";
    }
}

//card validation
cardName.addEventListener("keyup",(e)=>{
    nameError.style.display = "block";
    cardName.style.outline = "thin solid hsl(0, 100%, 66%)";
    if(cardName.value.length<8){
        isName = false;
        nameError.innerHTML = "Cardholder name must be atleast 8 characters";
    }
    else{
        isName = true;
        cardName.style.outline = "thin solid hsl(278, 94%, 30%)";
        nameError.style.display = "none";
    }
});

cardNumber.addEventListener("keydown",(e)=>{
    characterValidation(cardNumber,numberError,e);
    let val = cardNumber.value;
    if(e.which===8 && val.charAt(val.length-1)===' '){
        cardNumber.value = cardNumber.value.substring(0,val.length-1);
        displayNumber.innerText = cardNumber.value;
    }
});

cardMonth.addEventListener("keydown",(e)=>{
    characterValidation(cardMonth,expireError,e);
});

cardYear.addEventListener("keydown",(e)=>{
    characterValidation(cardYear,expireError,e);
});

cardCvc.addEventListener("keydown",(e)=>{
    characterValidation(cardCvc,cvcError,e);
});

button.addEventListener("click",(e)=>{
    e.preventDefault();
    checkEmptyInputField(cardName,nameError);
    checkEmptyInputField(cardMonth,expireError);
    checkEmptyInputField(cardYear,expireError);
    checkEmptyInputField(cardCvc,cvcError);

    //name validation
    if(cardName.value.match("^[A-Za-z]+ [A-Za-z]+ *$")){
        isName = true;
        cardName.style.outline = "thin solid hsl(278, 94%, 30%)";
        nameError.style.display = "none";
    }
    else{
        isName = false;
        nameError.style.display = "block";
        nameError.innerHTML = "Invalid format";
        cardName.style.outline = "thin solid hsl(0, 100%, 66%)";
    }

    //number validation
    if(cardNumber.value.length<19){
        isCardNumber = false;
        numberError.style.display = "block";
        numberError.innerHTML = "Invalid card";
        cardNumber.style.outline = "thin solid hsl(0, 100%, 66%)";
    }
    else{
        isCardNumber = true;
    }

    //month validation
    if(cardMonth.value<1 || cardMonth.value>12){
        isMonth = false;
        expireError.style.display = "block";
        expireError.innerHTML = "Invalid value";
        cardMonth.style.outline = "thin solid hsl(0, 100%, 66%)";
    }
    else{
        isMonth = true;
    }

    //year validation
    let currYear = new Date().getFullYear();
    if(cardYear.value<currYear%100){
        isYear = false;
        expireError.style.display = "block";
        expireError.innerHTML = "The card is expired";
        cardYear.style.outline = "thin solid hsl(0, 100%, 66%)";
    }
    else{
        isYear = true;
    }

    if(cardName.value && cardNumber.value && cardMonth.value 
        && cardYear.value && cardCvc.value && isCardNumber
        && isName && isMonth && isYear){
        form.style.display = "none";
        thanks.style.display = "block";
    }
});