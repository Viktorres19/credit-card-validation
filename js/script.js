const form = document.querySelector('.form'),
    cardNumberInput = document.querySelector('.card-number-input'),
    cardNumberBox = document.querySelector('.card-number-box'),
    cardHolderInput = document.querySelector('.card-holder-input'),
    cardHolderName = document.querySelector('.card-holder-name'),
    expMonth = document.querySelector('.exp-month'),
    monthInput = document.querySelector('.month-input'),
    yearInput = document.querySelector('.year-input'),
    expYear = document.querySelector('.exp-year'),
    cvvInput = document.querySelector('.cvv-input'),
    front = document.querySelector('.front'),
    back = document.querySelector('.back'),
    cvvBox = document.querySelector('.cvv-box'),
    currentMonth = new Date().getMonth(),
    currentYear = new Date().getFullYear();

cardNumberInput.oninput = () => cardNumberBox.innerText = cardNumberInput.value

cardHolderInput.oninput = () => cardHolderName.innerText = cardHolderInput.value

monthInput.oninput = () => expMonth.innerText = monthInput.value

yearInput.oninput = () => expYear.innerText = yearInput.value

cvvInput.onmouseenter = () => {
    front.style.transform = 'perspective(1000px) rotateY(-180deg)'
    back.style.transform = 'perspective(1000px) rotateY(0deg)'
}

cvvInput.onmouseleave = () => {
    front.style.transform = 'perspective(1000px) rotateY(0deg)'
    back.style.transform = 'perspective(1000px) rotateY(180deg)'
}

cvvInput.oninput = () => cvvBox.innerText = cvvInput.value


/* function checkCard (currentMonth, currentYear, monthInput, yearInput) {
    console.log(currentMonth)
    console.log(typeof currentMonth)
    console.log(currentYear)
    console.log(typeof currentYear)
    console.log(monthInput.value)
    console.log(typeof +monthInput.value)
    console.log(yearInput.value)
    console.log(typeof +yearInput.value)
} */

function checkMonth (currentMonth, monthInput) {
    console.log(currentMonth)
    console.log(monthInput.value)
}

function checkYear (currentYear, yearInput) {
    console.log(currentYear)
    console.log(yearInput.value)
}

function checkNumber (cardNumberInput) {
    console.log(cardNumberInput.value)
}

function checkCvv (cvvInput) {
    console.log(cvvInput.value)
}

form.onsubmit = function (e) {
    e.preventDefault()
    checkMonth (currentMonth, monthInput)
    checkYear (currentYear, yearInput)
    checkNumber (cardNumberInput)
    checkCvv (cvvInput)
}
