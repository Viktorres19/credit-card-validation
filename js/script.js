const cardNumberInput = document.querySelector('.card-number-input'),
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
    cvvBox = document.querySelector('.cvv-box');

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